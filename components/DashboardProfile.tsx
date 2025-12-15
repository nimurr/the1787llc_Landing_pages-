import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
    const demoData = [
        {
            auStrategy:
                "Seek an authorized user (AU) tradeline from an individual with an established, aged account (5+ years) with perfect payment history and under 10% utilization.",

            cleanUpStrategy:
                "Investigate the 2023/09 arrears capitalization event. Dispute inaccuracies if found and aggressively reduce credit card utilization.",

            creditBuilderStrategy:
                "Reduce utilization below 10%, maintain perfect payment history for 12–24 months, avoid new inquiries, and consider a secured credit builder loan.",

            estimatedFundingCapacity:
                "€0 – €5,000 (subprime terms likely due to high utilization and derogatory history).",

            executiveSummary:
                "High-risk credit profile due to arrears capitalization and 57.57% utilization. Manual review required. High-limit funding unlikely.",

            extractedCreditData: {
                ageOfHistory: "4y 4m",
                inquiries: 2,
                negativeItems: 1,
                utilization: 0.5757
            },

            fundabilityScore: {
                numeric: 35,
                tierLabel: "Restricted"
            },

            recommendations: [
                "Pay down credit card below 10% utilization",
                "Maintain on-time payments for 6–12 months",
                "Avoid new credit applications",
                "Consider an aged AU tradeline"
            ],

            riskGrade: "F",

            strengths: [
                "4+ years credit history",
                "Diverse credit mix",
                "No recent missed payments"
            ],

            weaknesses: [
                "Arrears capitalization",
                "High utilization",
                "High total debt"
            ]
        }
    ];

    const data = demoData[0];

    return (
        <div className="min-h-screen container mx-auto  text-white p-6 space-y-8">
            {/* Header */}
            <Link clssName="" href="/">
                <span style={{ color: "white" , display: "flex" , alignItems: "center" , gap: "10px" }} clssName=" underline text-2xl flex items-center"><FaArrowLeft /> Back To Home</span>
            </Link>
            <div>
                <h1 className="text-3xl font-bold">Last Credit Report</h1>
                <p className="text-gray-400">Risk & Fundability Overview</p>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard title="Risk Grade" value={data.riskGrade} />
                <MetricCard title="Score" value={data.fundabilityScore.numeric} />
                <MetricCard title="Tier" value={data.fundabilityScore.tierLabel} />
                <MetricCard
                    title="Utilization"
                    value={`${(data.extractedCreditData.utilization * 100).toFixed(1)}%`}
                />
            </div>

            {/* Credit Snapshot */}
            <Card title="Credit Snapshot">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Stat label="History Age" value={data.extractedCreditData.ageOfHistory} />
                    <Stat label="Inquiries" value={data.extractedCreditData.inquiries} />
                    <Stat label="Negative Items" value={data.extractedCreditData.negativeItems} />
                </div>
            </Card>

            {/* Summary */}
            <Card title="Executive Summary">
                <p className="text-gray-300">{data.executiveSummary}</p>
            </Card>

            {/* Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="AU Strategy">
                    <p className="text-gray-300">{data.auStrategy}</p>
                </Card>

                <Card title="Cleanup Strategy">
                    <p className="text-gray-300">{data.cleanUpStrategy}</p>
                </Card>

                <Card title="Credit Builder">
                    <p className="text-gray-300">{data.creditBuilderStrategy}</p>
                </Card>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ListCard title="Strengths" items={data.strengths} />
                <ListCard title="Weaknesses" items={data.weaknesses} />
            </div>

            {/* Recommendations */}
            <ListCard title="Top Recommendations" items={data.recommendations} />

            {/* Funding */}
            <Card title="Estimated Funding Capacity">
                <p className="text-gray-300">{data.estimatedFundingCapacity}</p>
            </Card>
        </div>
    );
}

/* ---------- UI Components ---------- */

function MetricCard({ title, value }) {
    return (
        <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-zinc-900 rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-3">{title}</h2>
            {children}
        </div>
    );
}

function ListCard({ title, items }) {
    return (
        <div className="bg-zinc-900 rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-3">{title}</h2>
            <ul className="space-y-2 text-gray-300">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="text-white">•</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="bg-zinc-800 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    );
}
