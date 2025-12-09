


import React, { useState } from 'react';
import { Label } from 'recharts';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const handleLogin = () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!agree) {
            alert("You must agree to the terms.");
            return;
        }

    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center px-4">
            <div className="w-full text-gray-600 max-w-lg bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-3xl font-bold text-center text-blue-800 mb-10 font-sans">Register</h1>

                {/* Email */}
                <label className=" mb-2 block font-medium text-black">Name</label>
                <input
                    type="email"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your Name"
                />

                <label className=" mb-2 block font-medium text-black">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your email"
                />

                {/* Password */}
                <label className="mb-2 block text-black font-medium">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded "
                    placeholder="Enter your password"
                />

                {/* Agree Checkbox */}
                <div className="flex items-center my-5">
                    <input
                        type="checkbox"
                        checked={agree}
                        id="agree"
                        onChange={() => setAgree(!agree)}
                        className="mr-2"
                    />

                    <label htmlFor="agree" className="cursor-pointer text-gray-500">
                        I agree to the Terms & Conditions
                    </label>
                </div>


                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Login Now
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/" className="text-blue-600 font-semibold hover:underline">
                        Please Login
                    </a>
                </p>

            </div>
        </div>
    );
}
