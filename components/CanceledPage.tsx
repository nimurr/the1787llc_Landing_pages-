import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CanceledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 to-pink-600 flex items-center justify-center p-6">
      <div className="bg-black bg-opacity-70 rounded-3xl p-10 flex flex-col items-center text-center shadow-xl animate-fadeIn">
        {/* Cancel Icon */}
        <div className="text-red-500 mb-6">
          <FaTimesCircle className="text-9xl animate-pulse" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Canceled
        </h1>
        <p className="text-gray-300 mb-8">
          Your payment was not completed. No charges have been made. You can try again or return home.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
