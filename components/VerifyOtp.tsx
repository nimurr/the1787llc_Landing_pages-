import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const navigate = useNavigate();

    const handleChange = (value: string, index: number) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input automatically
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        // Backspace moves to previous input
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

            // Focus last field
            inputRefs.current[newOtp.length - 1].focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join("");
        if (code.length < 6) {
            alert("Please enter the 6-digit OTP.");
            return;
        }
        alert("OTP Verified: " + code);
        navigate("/reset?email=" + new URLSearchParams(window.location.search).get("email"));

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-grid-pattern px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">

                <h1 className="text-2xl font-bold mb-6 color-primary">Verify OTP</h1>
                <p className="text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>

                {/* OTP Input Boxes */}
                <div className="flex text-gray-600 justify-between gap-2 mb-6" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el!)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 text-center border rounded-md text-xl focus:outline-blue-600"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className="w-full bg-color-primary text-white py-2 rounded transition"
                >
                    Verify OTP
                </button>

                <p className="text-gray-600 mt-4">
                    Didn't get the code?{" "}
                    <button className="color-primary hover:underline">Resend</button>
                </p>

            </div>
        </div>
    );
}
