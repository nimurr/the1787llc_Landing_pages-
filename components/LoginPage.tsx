import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'recharts';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!agree) {
            alert("You must agree to the terms.");
            return;
        }

        // Perform login logic here
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center px-4">
            <div className="w-full z-10 max-w-lg bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-4xl font-bold text-center color-primary mb-10 font-sans">Login</h1>

                {/* Email */}
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
                    <div>
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
                    <Link to="/forgot" className="color-primary font-semibold hover:underline ml-auto" >Forgot Password</Link>
                </div>


                {/* Login Button */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-color-primary text-white py-2 rounded  transition">
                    Login Now
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-4">
                    Not registered?{" "}
                    <a href="/register" className="color-primary font-semibold hover:underline">
                        Create an account
                    </a>
                </p>

            </div>
        </div>
    );
}
