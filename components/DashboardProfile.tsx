import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
    const analysisData = localStorage.getItem("analysisData");
    const data = analysisData ? JSON.parse(analysisData) : null;

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <h1 className="text-2xl font-bold text-red-500">
                    No analysis data available
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen container mx-auto text-white p-6 space-y-8 ">
            {/* Back */}
            <Link
                to="/"
                className="flex items-center gap-3 text-white underline text-lg"
            >
                <FaArrowLeft /> Back To Home
            </Link>

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Last Analysis Report</h1>
                <p className="text-gray-400">Risk & Fundability Overview</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
                    <p className="text-gray-400 text-sm">Risk Grade</p>
                    <p className="text-3xl font-bold mt-2">{data.riskGrade}</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
                    <p className="text-gray-400 text-sm">Score</p>
                    <p className="text-3xl font-bold mt-2">{data.fundabilityScore?.numeric}</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
                    <p className="text-gray-400 text-sm">Tier</p>
                    <p className="text-3xl font-bold mt-2">{data.fundabilityScore?.tierLabel}</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
                    <p className="text-gray-400 text-sm">Utilization</p>
                    <p className="text-3xl font-bold mt-2">
                        {(data.extractedCreditData?.utilization * 100).toFixed(1)}%
                    </p>
                </div>
            </div>



            {/* Credit Snapshot */}
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold mb-3">Credit Snapshot</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-800 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">History Age</p>
                        <p className="text-lg font-semibold">{data.extractedCreditData?.ageOfHistory}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Inquiries</p>
                        <p className="text-lg font-semibold">{data.extractedCreditData?.inquiries}</p>
                    </div>
                </div>
            </div>

            {/* Executive Summary */}
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold mb-3">Executive Summary</h2>
                <p className="text-gray-300">{data.executiveSummary}</p>
            </div>

            {/* Strategies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-zinc-900 rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold mb-3">AU Strategy</h2>
                    <p className="text-gray-300">{data.auStrategy}</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold mb-3">Cleanup Strategy</h2>
                    <p className="text-gray-300">{data.cleanUpStrategy}</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold mb-3">Credit Builder</h2>
                    <p className="text-gray-300">{data.creditBuilderStrategy}</p>
                </div>
            </div>

            {/* Strengths / Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold mb-3">Strengths</h2>
                    <ul className="space-y-2 text-gray-300">
                        {data.strengths?.map((item, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="text-white">•</span>
                                <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-zinc-900 rounded-xl p-6 shadow">
                    <h2 className="text-lg font-semibold mb-3">Weaknesses</h2>
                    <ul className="space-y-2 text-gray-300">
                        {data.weaknesses?.map((item, idx) => (
                            <li key={idx} className="flex gap-2">
                                <span className="text-white">•</span>
                                <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold mb-3">Top Recommendations</h2>
                <ul className="space-y-2 text-gray-300">
                    {data.recommendations?.map((item, idx) => (
                        <li key={idx} className="flex gap-2">
                            <span className="text-white">•</span>
                            <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Estimated Funding Capacity */}
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
                <h2 className="text-lg font-semibold mb-3">Estimated Funding Capacity</h2>
                <p className="text-gray-300">{data.estimatedFundingCapacity}</p>
            </div>
        </div>
    );
}
