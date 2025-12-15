import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-black bg-opacity-70 rounded-3xl p-10 flex flex-col items-center text-center shadow-xl animate-fadeIn">
        {/* Checkmark */}
        <div className="text-green-400 mb-6">
          <FaCheckCircle className="text-9xl animate-bounce" />
        </div>

        {/* Success Text */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-300 mb-8">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="bg-green-400 hover:bg-green-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          Go Back Home
        </Link>

        {/* Optional decorative confetti */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="confetti"></div>
        </div>
      </div>
    </div>
  );
}
