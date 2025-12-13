
import React from 'react';
import { AnalysisResponseSchema } from '../types';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props {
  data: AnalysisResponseSchema;
  onNavigateToDisputes?: () => void;
}

const AnalysisReport: React.FC<Props> = ({ data, onNavigateToDisputes }) => {
  const hasBreachRisk = data.breachAnalysis && (data.breachAnalysis.isEquifaxVictimLikely || data.breachAnalysis.isExperianVictimLikely || (data.breachAnalysis.identifiedBreaches && data.breachAnalysis.identifiedBreaches.length > 0));

  // Determine Grade Color
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]';
    if (grade.startsWith('B')) return 'text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]';
    if (grade.startsWith('C')) return 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]';
    return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]';
  };

  const gradeColor = getGradeColor(data.riskGrade || 'C');

  // Gauge Data for Fundability
  const fundabilityValue = data.fundabilityScore?.numeric || 0;
  const gaugeData = [
    { name: 'Score', value: fundabilityValue },
    { name: 'Remaining', value: 100 - fundabilityValue },
  ];

  return (
    <div className="space-y-10 font-sans pb-12 animate-in fade-in duration-500">

      {/* Executive Summary Section */}
      <div className="glass-panel rounded-xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 shadow-[0_0_20px_#10b981]"></div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Executive Analysis
        </h3>
        <p className="text-xl md:text-3xl font-serif text-white leading-relaxed tracking-tight">
          {data.executiveSummary || "The analysis indicates a profile with potential, but key factors like utilization or negative items are suppressing the fundability score. Immediate corrective action is recommended."}
        </p>
      </div>

      {/* BREACH ALERT BANNER */}
      {hasBreachRisk && (
        <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition"></div>
          <div className="bg-red-500/20 p-4 rounded-full text-red-500 shrink-0 animate-pulse relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 relative z-10">
            <h3 className="text-xl font-bold text-white mb-1 font-serif">Identity Threat Detected</h3>
            <p className="text-slate-300 text-sm mb-4">
              Analysis indicates likely victimization in major data breaches. Negative items may be fraudulent.
            </p>
            <button onClick={onNavigateToDisputes} className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded text-sm font-bold transition shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              Initiate Breach Dispute
            </button>
          </div>
        </div>
      )}

      {/* METRICS GRID - Updated to 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Risk Grade Card */}
        <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-help transition-all duration-500 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-2 right-2 text-slate-600 group-hover:text-slate-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 relative z-10">AI Risk Grade</h3>
          <div className={`text-9xl font-serif font-black ${gradeColor} mb-2 tracking-tighter relative z-10 scale-100 group-hover:scale-110 transition-transform duration-500`}>
            {data.riskGrade || 'C'}
          </div>
          <p className="text-slate-500 text-xs font-medium relative z-10">Underwriting Classification</p>
        </div>

        {/* Fundability Score Card */}
        <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center relative hover:scale-[1.02] transition-transform duration-500">
          <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">Fundability Score</h3>
          <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill={fundabilityValue > 70 ? "#10b981" : fundabilityValue > 50 ? "#f59e0b" : "#ef4444"} />
                  <Cell fill="#1e293b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <span className="text-4xl font-bold text-white font-serif">{fundabilityValue}</span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>
          <p className={`text-xs font-bold px-3 py-1 rounded-full border ${fundabilityValue > 70 ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-slate-800 border-slate-700 text-slate-400"}`}>
            {data.fundabilityScore?.tierLabel || "Calculating..."}
          </p>
        </div>

        {/* Funding Capacity Card (Personal/General) */}
        <div className="glass-panel rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
          <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-6">Est. Personal Funding</h3>
          <div className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">
            {data.estimatedFundingCapacity || "$0"}
          </div>
          <p className="text-slate-500 text-xs">Based on current profile</p>
        </div>

        {/* Startup Funding Capacity Card (Client as Guarantor) */}
        <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-xl border border-indigo-500/30 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500 group">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-all duration-700"></div>

          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-indigo-400 font-bold uppercase tracking-widest text-xs">Startup Funding (PG)</h3>
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-1.5 py-0.5 rounded border border-indigo-500/30 font-bold" title="Client as Personal Guarantor">PG</span>
          </div>

          <div className="text-3xl font-serif font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
            {data.startupFundingCapacity || "$0"}
          </div>
          <p className="text-indigo-300/60 text-xs">With Client as Guarantor</p>
        </div>

      </div>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 border border-emerald-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Underwriter Strengths</h3>
          </div>
          <ul className="space-y-4">
            {data.strengths && data.strengths.length > 0 ? (
              data.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-emerald-500 font-bold mt-0.5">›</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic text-sm">No significant strengths identified yet.</li>
            )}
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500/20 p-2 rounded-lg text-red-400 border border-red-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white font-serif">Risk Factors</h3>
          </div>
          <ul className="space-y-4">
            {data.weaknesses && data.weaknesses.length > 0 ? (
              data.weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                  <span className="text-red-500 font-bold mt-0.5">›</span>
                  {item}
                </li>
              ))
            ) : (
              <li className="text-slate-500 italic text-sm">No major weaknesses identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Strategic Roadmap - Visual Timeline */}
      <div className="relative">
        <h3 className="text-2xl font-bold text-white mb-8 font-serif flex items-center gap-3">
          <span className="w-1 h-8 bg-emerald-500 rounded-full"></span>
          Strategic Roadmap
        </h3>

        {/* Hidden on mobile, visible on LG screens: Connecting Line */}
        <div className="hidden lg:block absolute top-[6.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/50 via-slate-700 to-slate-700 z-0"></div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10`}>
          {/* Phase 01 */}
          <div className="glass-panel rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-emerald-500">
            <div className="bg-black/30 w-10 h-10 rounded-full flex items-center justify-center text-emerald-400 font-bold mb-4 border border-emerald-500/30">01</div>
            <h4 className="text-white font-bold text-lg mb-2 font-serif">Clean Up</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{data.cleanUpStrategy}</p>
          </div>

          {/* Phase 02 */}
          <div className="glass-panel rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-slate-700 hover:border-t-emerald-400">
            <div className="bg-black/30 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 font-bold mb-4 border border-slate-700">02</div>
            <h4 className="text-white font-bold text-lg mb-2 font-serif">Stabilization</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{data.auStrategy}</p>
          </div>

          {/* Phase 03 */}
          <div className="glass-panel rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-slate-700 hover:border-t-emerald-400">
            <div className="bg-black/30 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 font-bold mb-4 border border-slate-700">03</div>
            <h4 className="text-white font-bold text-lg mb-2 font-serif">Building</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{data.creditBuilderStrategy || "Maintain low utilization."}</p>
          </div>

          {/* Phase 04 */}
          <div className="glass-panel rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 border-t-4 border-t-slate-700 hover:border-t-emerald-400">
            <div className="bg-black/30 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 font-bold mb-4 border border-slate-700">04</div>
            <h4 className="text-white font-bold text-lg mb-2 font-serif">Acquisition</h4>
            <ul className="space-y-2 mt-2">
              {data.sequencing.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
                  <span className="text-emerald-500 font-bold">›</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Negative Items Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#0f1016] shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-black/20">
          <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
            Negative Items Detected
          </h3>
          <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded text-xs font-bold font-mono">
            {data.extractedCreditData.negativeItems.length} ITEMS
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-slate-400 text-sm">
            <thead className="bg-black/40 text-slate-500 uppercase font-bold text-xs tracking-wider">
              <tr>
                <th className="p-4">Creditor</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.extractedCreditData.negativeItems.length > 0 ? (
                data.extractedCreditData.negativeItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white">{item.creditor}</td>
                    <td className="p-4">{item.type}</td>
                    <td className="p-4">
                      <span className="text-red-400 text-xs border border-red-400/30 px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-mono text-slate-200">
                      ${item.amount?.toLocaleString() || '0'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-slate-600 italic">
                    No negative items detected. Your profile is clean.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
