import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-600 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-black bg-opacity-70 rounded-3xl p-10 flex flex-col items-center text-center shadow-xl animate-fadeIn">
        {/* Failed Icon */}
        <div className="text-red-500 mb-6">
          <FaExclamationTriangle className="text-9xl animate-pulse" />
        </div>

        {/* Failed Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-300 mb-8">
          Something went wrong with your payment. Please try again or contact support if the problem persists.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
