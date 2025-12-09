import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleReset = () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }
        navigate("/verify-otp?email=" + email);

        // Your password reset logic here
        alert("A reset link has been sent to your email!");
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center  px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Send Reset Link
                </button>

                {/* Back to Login */}
                <p className="text-center mt-4 text-gray-600">
                    Remember your password?{" "}
                    <a
                        href="/"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Back to Login
                    </a>
                </p>

            </div>
        </div>
    );
}
