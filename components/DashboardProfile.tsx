import { useGetAllHistoryQuery } from "@/redux/features/history/history";
import { useState } from "react";
import moment from "moment";
import React from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashboardProfile() {
  const [selectedData, setSelectedData] = useState(null);

  const { data: historyFullData, isLoading } = useGetAllHistoryQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
      </div>
    );
  }

  if (!historyFullData?.data) {
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

      <div>
        <h1 className="text-3xl font-bold">Analysis Report</h1>
        <p className="text-gray-400">Risk & Fundability Overview</p>
      </div>

      {!selectedData ? (
        // ======= SHOW ALL ITEMS LIST =======
        <div className="bg-[#1c1e2d] shadow-[0_0_10px_#34d399] text-white p-6 rounded-lg flex flex-col gap-4">
          {historyFullData?.data?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => setSelectedData(item?.analysisData[0])}
              className="bg-zinc-900 flex hover:shadow-[0_0_10px_#34d399] cursor-pointer items-start justify-between gap-10 rounded-xl p-5 shadow"
            >
              <div>
                <p className="font-bold ">
                  Title: {item?.analysisData[0]?.auStrategy?.slice(0, 80)}...
                </p>
                <p>Risk Grade: {item?.analysisData[0]?.riskGrade}</p>
              </div>
              <p className="text-gray-400 block">
                Date: {moment(item?.createdAt).format("DD-MMM-YYYY HH:mm A")}
              </p>
            </div>
          ))}
          {
            historyFullData?.data?.length === 0 && (
              <p className="text-red-400 text-xl text-center">No analysis data available.</p>
            )
          }
        </div>
      ) : (
        // ======= SHOW SELECTED DETAIL =======
        <div className="relative">
          {/* Close button */}
          <button
            onClick={() => setSelectedData(null)}
            className="absolute -top-12 right-0 p-2 m-2 bg-red-600 rounded-full hover:bg-red-500"
          >
            <FaTimes />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
              <p className="text-gray-400 text-sm">Risk Grade</p>
              <p className="text-3xl font-bold mt-2">{selectedData.riskGrade}</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
              <p className="text-gray-400 text-sm">Score</p>
              <p className="text-3xl font-bold mt-2">
                {selectedData.fundabilityScore?.numeric}
              </p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
              <p className="text-gray-400 text-sm">Tier</p>
              <p className="text-3xl font-bold mt-2">
                {selectedData.fundabilityScore?.tierLabel}
              </p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-5 text-center shadow">
              <p className="text-gray-400 text-sm">Utilization</p>
              <p className="text-3xl font-bold mt-2">
                {(selectedData.extractedCreditData?.utilization * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow mt-6">
            <h2 className="text-lg font-semibold mb-3">Executive Summary</h2>
            <p className="text-gray-300">{selectedData.executiveSummary}</p>
          </div>

          {/* Strategies */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-3">AU Strategy</h2>
              <p className="text-gray-300">{selectedData.auStrategy}</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-3">Cleanup Strategy</h2>
              <p className="text-gray-300">{selectedData.cleanUpStrategy}</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-3">Credit Builder</h2>
              <p className="text-gray-300">{selectedData.creditBuilderStrategy}</p>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-zinc-900 rounded-xl p-6 shadow">
              <h2 className="text-lg font-semibold mb-3">Strengths</h2>
              <ul className="space-y-2 text-gray-300">
                {selectedData.strengths?.map((item, idx) => (
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
                {selectedData.weaknesses?.map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-white">•</span>
                    <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow mt-6">
            <h2 className="text-lg font-semibold mb-3">Top Recommendations</h2>
            <ul className="space-y-2 text-gray-300">
              {selectedData.recommendations?.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-white">•</span>
                  <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estimated Funding Capacity */}
          <div className="bg-zinc-900 rounded-xl p-6 shadow mt-6">
            <h2 className="text-lg font-semibold mb-3">Estimated Funding Capacity</h2>
            <p className="text-gray-300">{selectedData.estimatedFundingCapacity}</p>
          </div>
        </div>
      )}
    </div>
  );
}
