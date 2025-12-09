import React, { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleReset = () => {
    if (!newPassword || !confirm) {
      alert("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    // Your reset logic here
    alert("Password has been reset successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid-pattern px-4">
      <div className="w-full max-w-md bg-white shadow-lg text-gray-600 rounded-xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Reset Password
        </h1>

        {/* New Password */}
        <label className="block mb-2 font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter new password"
        />

        {/* Confirm Password */}
        <label className="block mb-2 font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          placeholder="Re-enter new password"
        />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Reset Password
        </button>

      </div>
    </div>
  );
}
