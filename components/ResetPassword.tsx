import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [resetPass] = useResetPasswordMutation();

    const handleReset = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirm) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (newPassword !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }

        const data = {
            password: newPassword,
            email: new URLSearchParams(window.location.search).get("email"),
        };

        try {
            const res = await resetPass(data);
            console.log(res);
            if (res?.data?.code === 200) {
                toast.success(res?.data?.message);
                navigate("/login");
            } else {
                toast.error(res?.error?.data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error(error?.message || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-grid-pattern px-4">
            <form onSubmit={handleReset} className="w-full max-w-md bg-white shadow-lg text-gray-600 rounded-xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6 color-primary">
                    Reset Password
                </h1>

                {/* New Password */}
                <label className="block mb-2 font-medium text-gray-700">New Password</label>
                <div className="relative mb-4">
                    <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border rounded pr-10"
                        placeholder="Enter new password"
                    />
                    <div
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </div>
                </div>

                {/* Confirm Password */}
                <label className="block mb-2 font-medium text-gray-700">Confirm Password</label>
                <div className="relative mb-6">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="w-full p-2 border rounded pr-10"
                        placeholder="Re-enter new password"
                    />
                    <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                        {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    type="submit"
                    className="w-full bg-color-primary text-white py-2 rounded transition"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
}
