import { useLoginMutation } from '@/redux/features/auth/authApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // eye icons

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // toggle state

    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (!agree) {
            toast.error("You must agree to the terms.");
            return;
        }
        const data = { email, password };
        try {
            const res = await login(data);
            console.log(res);
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
                localStorage.setItem("token", res?.data?.data?.attributes?.tokens?.access?.token);
                localStorage.setItem("user", JSON.stringify(res?.data?.data?.attributes?.user));
                // navigate("/");
                window.location.href = "/";
            }
            else {
                toast.error(res?.error?.data?.message);
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center px-4">
            <form onSubmit={handleLogin} className="w-full text-gray-600 z-10 max-w-lg bg-white shadow-lg rounded-xl p-6">

                <h1 className="text-4xl font-bold text-center color-primary mb-10 font-sans">Login</h1>

                {/* Email */}
                <label className="mb-2 block font-medium text-black">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your email"
                />

                {/* Password */}
                <label className="mb-2 block text-black font-medium">Password</label>
                <div className="relative mb-5">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded pr-10"
                        placeholder="Enter your password"
                    />
                    {/* Toggle Icon */}
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </div>
                </div>

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
                    <Link to="/forgot" className="color-primary font-semibold hover:underline ml-auto">
                        Forgot Password
                    </Link>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-color-primary text-white py-2 rounded transition"
                >
                    Login Now
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-600 mt-4">
                    Not registered?{" "}
                    <Link to="/register" className="color-primary font-semibold hover:underline">
                        Create an account
                    </Link>
                </p>

            </form>
        </div>
    );
}
