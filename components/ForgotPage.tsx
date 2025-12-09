import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPage() {
    const [email, setEmail] = useState("");

    const [forgotPassword] = useForgotPasswordMutation();
    const navigate = useNavigate();
    const handleReset = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please fill in all fields.");
            return;
        }
        const data = { email };
        try {
            const res = await forgotPassword(data);
            console.log(res);
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
                localStorage.setItem("token", res?.data?.data?.attributes?.tokens?.access?.token);
                localStorage.setItem("user", JSON.stringify(res?.data?.data?.attributes?.user));
                navigate("/verify-otp?email=" + email);
                // window.location.href = "/";
            }
            else {
                toast.error(res?.error?.data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center  px-4">
            <form action="" onSubmit={handleReset} className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-2xl font-bold text-center mb-6 color-primary">
                    Forgot Password
                </h1>

                {/* Email Input */}
                <label className="block mb-2 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your email"
                />

                {/* Send Reset Button */}
                <button
                    onClick={handleReset}
                    className="w-full bg-color-primary text-white py-2 rounded  transition"
                >
                    Send Reset Link
                </button>

                {/* Back to Login */}
                <p className="text-center mt-4 text-gray-600">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="color-primary font-semibold hover:underline"
                    >
                        Back to Login
                    </Link>
                </p>

            </form>
        </div>
    );
}
