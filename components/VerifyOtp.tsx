import { useForgotPasswordMutation, useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import React, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const navigate = useNavigate();

    const [verifyEmail] = useVerifyEmailMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    const mode = new URLSearchParams(window.location.search).get("mode");

    // -----------------------
    // TIMER STATES
    // -----------------------
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 sec)

    // Convert seconds → mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // -----------------------
    // TIMER LOGIC
    // -----------------------
    useEffect(() => {
        const savedTime = localStorage.getItem("otp_timer");
        const savedTimestamp = localStorage.getItem("otp_timestamp");

        if (savedTime && savedTimestamp) {
            const now = Date.now();
            const diff = Math.floor((now - Number(savedTimestamp)) / 1000);
            const newTime = Number(savedTime) - diff;
            setTimeLeft(newTime > 0 ? newTime : 0);
        } else {
            localStorage.setItem("otp_timer", "300");
            localStorage.setItem("otp_timestamp", Date.now().toString());
            setTimeLeft(300);
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                localStorage.setItem("otp_timer", (prev - 1).toString());
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // -----------------------
    // OTP INPUT HANDLERS
    // -----------------------
    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasteData = e.clipboardData.getData("text").slice(0, 6);

        if (/^\d{1,6}$/.test(pasteData)) {
            const newOtp = pasteData.split("");
            while (newOtp.length < 6) newOtp.push("");
            setOtp(newOtp);

            inputRefs.current[newOtp.length - 1].focus();
        }
    };

    // -----------------------
    // VERIFY OTP
    // -----------------------
    const handleVerify = async () => {
        if (timeLeft <= 0) {
            toast.error("OTP expired. Please resend.");
            return;
        }

        const code = otp.join("");
        if (code.length < 6) {
            toast.error("Please enter the 6-digit OTP.");
            return;
        }

        const data = {
            code,
            email: new URLSearchParams(window.location.search).get("email"),
        };

        try {
            const res = await verifyEmail(data);

            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);

                if (mode === "register") {
                    navigate("/login");
                } else {
                    navigate("/reset?email=" + data.email);
                }
            } else {
                toast.error(res?.error?.data?.message || "Invalid OTP");
            }

        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        }
    };

    // -----------------------
    // RESEND OTP (RESET TIMER)
    // -----------------------
    const handleReset = async (e) => {
        e.preventDefault();
        const email = new URLSearchParams(window.location.search).get("email");

        if (!email) {
            toast.error("Email missing.");
            return;
        }

        try {
            const res = await forgotPassword({ email });

            if (res?.data?.code === 200) {
                toast.success("OTP sent again!");

                // Reset timer
                localStorage.setItem("otp_timer", "300");
                localStorage.setItem("otp_timestamp", Date.now().toString());
                setTimeLeft(300);

                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0].focus();
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong.");
            }

        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        }
    };

    // -----------------------
    // UI
    // -----------------------
    return (
        <div className="min-h-screen flex items-center justify-center bg-grid-pattern px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">

                <h1 className="text-4xl font-bold mb-6 color-primary">Verify OTP</h1>
                <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>

                <div className="flex text-gray-600 justify-between gap-2 mb-6" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el!)}
                            type="text"
                            maxLength={1}
                            placeholder="-"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 h-14 text-center border rounded-md text-xl focus:outline-blue-600"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    className="w-full bg-color-primary text-white py-2 rounded transition"
                >
                    Verify OTP
                </button>

                {/* Countdown timer */}
                <p className="my-4 color-primary font-semibold">
                    Time Left: {formatTime(timeLeft)}
                </p>

                <p className="text-gray-600 flex justify-center items-center gap-3 mt-4">
                    Didn't get the code?{" "}
                    <button onClick={handleReset} disabled={timeLeft === 0 ? false : true}
                        className={`underline ${timeLeft === 0 ? "text-blue-600" : "text-gray-400 cursor-not-allowed"}`}>
                        Resend
                    </button>
                </p>

            </div>
        </div>
    );
}
