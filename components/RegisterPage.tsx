import { useRegisterMutation } from '@/redux/features/auth/authApi';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    // State for all required registration fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // toggle for password
    const navigate = useNavigate();

    const [register] = useRegisterMutation();

    const handleRegister = async (e) => {
        e.preventDefault(); // prevent page reload

        // Validate required fields
        if (!firstName || !lastName || !email || !role || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!agree) {
            toast.error("You must agree to the terms.");
            return;
        }

        const data = { firstName, lastName, email, role, password };

        try {
            const res = await register(data);
            console.log(res)
            if (res?.data?.code === 201) {
                toast.success(res.data.message || "Registration successful!");
                navigate("/verify-otp?mode=register&email=" + email);
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong.");
            }
        } catch (err) {
            toast.error(err?.message || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen bg-grid-pattern flex items-center justify-center px-4">
            <form
                onSubmit={handleRegister} // handle submit
                className="w-full text-gray-600 max-w-lg bg-white shadow-lg rounded-xl p-6"
            >

                <h1 className="text-3xl font-bold text-center color-primary mb-10 font-sans">Register</h1>

                {/* First Name */}
                <label className="mb-2 block font-medium text-black">First Name</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your first name"
                />

                {/* Last Name */}
                <label className="mb-2 block font-medium text-black">Last Name</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your last name"
                />

                {/* Email */}
                <label className="mb-2 block font-medium text-black">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                    placeholder="Enter your email"
                />

                {/* Role */}
                {/* <label className="mb-2 block font-medium text-black">Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border rounded mb-5"
                >
                    <option value="user">User</option>
                </select> */}

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
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </div>
                </div>

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

                {/* Register Button */}
                <button
                    type="submit" // submit button
                    className="w-full bg-color-primary text-white py-2 rounded transition"
                >
                    Register Now
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="color-primary font-semibold hover:underline">
                        Please Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
