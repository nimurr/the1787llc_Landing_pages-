
import React, { useState } from 'react';
import { AppView, AnalysisResponseSchema } from '../types';
import AnalysisReport from './AnalysisReport';
import DisputeGenerator from './DisputeGenerator';
import VoiceAgent from './VoiceAgent';
import ResourcesView from './ResourcesView';
import CFPBGuide from './CFPBGuide';
import FTCGuide from './FTCGuide';
import BusinessBlueprint from './BusinessBlueprint';
import { analyzeCreditReport } from '../services/geminiService';
import { Link } from 'react-router-dom';

const RevolveLogo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    {/* Outer Hexagon Ring */}
    <path
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
      stroke="url(#logoGradient)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Inner Geometric 'R' */}
    <path
      d="M35 35 V65 M35 45 H55 C62 45 65 35 55 35 H35 M45 45 L65 65"
      stroke="white"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Tech Accent Dot */}
    <circle cx="80" cy="80" r="4" fill="#10b981" className="animate-pulse" />
  </svg>
);

const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisData, setAnalysisData] = useState<AnalysisResponseSchema | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 200);

    try {
      const filePromises = Array.from(fileList).map((file: File) => {
        return new Promise<{ base64: string; mimeType: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              const base64 = (reader.result as string).split(',')[1];
              resolve({ base64, mimeType: file.type });
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const files = await Promise.all(filePromises);
      const data = await analyzeCreditReport(files);


      console.log(data , files)

      clearInterval(progressInterval);
      setUploadProgress(100);

      await new Promise(resolve => setTimeout(resolve, 600));

      setAnalysisData(data);
      setCurrentView(AppView.ANALYSIS);
    } catch (err) {
      console.error(err);
      alert("Error analyzing files. Please ensure you are using valid PDF, Image or Text files.");
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const NavItem = ({ view, label, disabled = false }: { view: AppView, label: string, disabled?: boolean }) => (
    <button
      onClick={() => {
        if (!disabled) {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }
      }}
      disabled={disabled}
      className={`px-4 py-2 rounded text-sm font-medium transition-all duration-300 ${currentView === view
        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
        : disabled
          ? 'text-slate-700 cursor-not-allowed'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen text-slate-200 selection:bg-emerald-500/30 pb-20">

      {/* 1. TOP NAVIGATION BAR (Fixed) */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 px-4 md:px-8 flex items-center justify-between shadow-lg">
        <div >
          <Link className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView(AppView.DASHBOARD)} to="/">
            <RevolveLogo className="h-9 w-9 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
            <span className="text-xl font-bold tracking-tight text-white font-serif">RevolV</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto">
          <NavItem view={AppView.DASHBOARD} label="Dashboard" />
          <NavItem view={AppView.ANALYSIS} label="AI Underwriter" disabled={!analysisData} />
          <NavItem view={AppView.LETTERS} label="Disputes" disabled={!analysisData} />
          <NavItem view={AppView.BUSINESS_BLUEPRINT} label="Blueprint" />
          <NavItem view={AppView.VOICE_AGENT} label="Voice Coach" />
          <NavItem view={AppView.CFPB_GUIDE} label="CFPB Guide" />
          <NavItem view={AppView.FTC_GUIDE} label="FTC Guide" />
          <NavItem view={AppView.RESOURCES} label="Resources" />
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 p-2 hover:bg-white/5 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Operational
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0b0c15]/95 backdrop-blur-xl pt-20 px-6 animate-in slide-in-from-top-10 duration-200 overflow-y-auto">
          <div className="flex flex-col gap-4 pb-20">
            <button onClick={() => { setCurrentView(AppView.DASHBOARD); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">Dashboard</button>
            <button disabled={!analysisData} onClick={() => { setCurrentView(AppView.ANALYSIS); setIsMobileMenuOpen(false); }} className={`text-left py-4 text-xl font-bold border-b border-white/5 ${!analysisData ? 'text-slate-600' : 'text-white'}`}>AI Underwriter {analysisData ? '✓' : '🔒'}</button>
            <button disabled={!analysisData} onClick={() => { setCurrentView(AppView.LETTERS); setIsMobileMenuOpen(false); }} className={`text-left py-4 text-xl font-bold border-b border-white/5 ${!analysisData ? 'text-slate-600' : 'text-white'}`}>Disputes {analysisData ? '✓' : '🔒'}</button>
            <button onClick={() => { setCurrentView(AppView.BUSINESS_BLUEPRINT); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">Blueprint</button>
            <button onClick={() => { setCurrentView(AppView.VOICE_AGENT); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">Voice Coach</button>
            <button onClick={() => { setCurrentView(AppView.CFPB_GUIDE); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">CFPB Guide</button>
            <button onClick={() => { setCurrentView(AppView.FTC_GUIDE); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">FTC Guide</button>
            <button onClick={() => { setCurrentView(AppView.RESOURCES); setIsMobileMenuOpen(false); }} className="text-left py-4 text-xl font-bold text-white border-b border-white/5">Resources</button>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        {currentView === AppView.DASHBOARD ? (
          <div className="animate-fade-in space-y-8">

            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg">
                  Funding <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Gold</span> Standard.
                </h1>
                <p className="text-slate-400 max-w-xl text-lg font-light leading-relaxed">
                  Advanced underwriting diagnostics for precision capital acquisition.
                  Identify gaps. Calculate capacity. Execute strategy.
                </p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Analysis Cycle</p>
                <p className="text-xl font-mono text-white">{new Date().toLocaleDateString()}</p>
              </div>
            </header>

            {/* DASHBOARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* CARD 1: AI UNDERWRITER UPLOAD (Main Action) */}
              <div className="md:col-span-8 relative group cursor-default">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                <div className="relative h-full glass-panel rounded-lg p-8 flex flex-col justify-between overflow-hidden">
                  {/* Background Tech Visual */}
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 text-emerald-500 transform rotate-12 translate-x-10 -translate-y-10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider rounded">Step 01</span>
                      <h2 className="text-2xl font-bold text-white font-serif">AI Underwriter Engine</h2>
                    </div>

                    <p className="text-slate-300 max-w-lg mb-6 leading-relaxed">
                      Begin by uploading your raw credit report. Our AI extracts deep Metro 2 compliance metrics, calculates your Fundability Score, and determines your instant Risk Grading.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6 max-w-sm">
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 rounded border border-white/5">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span>PDF Reports</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 p-2 rounded border border-white/5">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span>Images (JPG/PNG)</span>
                      </div>
                    </div>

                    <label className="cursor-pointer inline-block w-full">
                      {isUploading ? (
                        <div className="w-full bg-slate-900/80 rounded border border-white/10 p-4 shadow-inner">
                          <div className="flex justify-between text-xs font-mono text-emerald-400 mb-2">
                            <span className="animate-pulse">PROCESSING DATA STREAM...</span>
                            <span>{Math.round(uploadProgress)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 transition-all duration-300 relative" style={{ width: `${uploadProgress}%` }}>
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="group/btn flex items-center justify-center w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400">
                          <span className="flex items-center gap-3 text-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4" /></svg>
                            INITIATE ANALYSIS
                          </span>
                        </div>
                      )}
                      <input type="file" className="hidden" multiple accept="application/pdf,image/*,text/plain" onChange={handleFileUpload} disabled={isUploading} />
                    </label>
                  </div>
                </div>
              </div>

              {/* CARD 2: RISK GRADE MONITOR */}
              <div className="md:col-span-4 glass-panel rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 pointer-events-none"></div>
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 z-10">Live Risk Monitor</h3>

                {analysisData ? (
                  <div className="animate-in zoom-in duration-500 z-10">
                    <div className={`text-7xl font-serif font-bold ${analysisData.riskGrade?.startsWith('A') ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {analysisData.riskGrade}
                    </div>
                    <p className="text-sm text-slate-400 mt-2">Current Grade</p>
                  </div>
                ) : (
                  // Active Empty State
                  <div className="relative w-full h-full flex flex-col items-center justify-center opacity-40">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-700/50 flex items-center justify-center mb-2">
                      <span className="text-4xl font-serif text-slate-600">--</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded animate-pulse">SYSTEM STANDBY</span>
                  </div>
                )}
              </div>

              {/* CARD 3: FUNDABILITY GAUGE */}
              <div className="md:col-span-4 glass-panel rounded-lg p-6 relative overflow-hidden flex flex-col">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Fundability Index</h3>
                {analysisData ? (
                  <>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-5xl font-bold text-white font-serif">{analysisData.fundabilityScore?.numeric}</span>
                      <span className="text-sm text-slate-500 mb-1">/ 100</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                        style={{ width: `${analysisData.fundabilityScore?.numeric}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-300 font-light mt-auto">
                      {analysisData.fundabilityScore?.summary}
                    </p>
                  </>
                ) : (
                  // Active Empty State
                  <div className="flex-1 flex flex-col justify-center opacity-40">
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-5xl font-bold text-slate-600 font-serif">00</span>
                      <span className="text-sm text-slate-700 mb-1">/ 100</span>
                    </div>
                    <div className="w-full bg-slate-800/50 h-2 rounded-full overflow-hidden"></div>
                    <p className="text-xs text-slate-600 mt-4 font-mono">WAITING FOR DATA STREAM...</p>
                  </div>
                )}
              </div>

              {/* CARD 4: BREACH RADAR */}
              <div
                className={`md:col-span-4 glass-panel rounded-lg p-6 relative overflow-hidden ${analysisData ? 'cursor-pointer hover:bg-white/5 transition' : ''}`}
                onClick={() => { if (analysisData) setCurrentView(AppView.LETTERS); }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">Breach Radar</h3>
                  {analysisData && <span className="text-[10px] text-emerald-400 font-mono border border-emerald-500/30 px-1 rounded bg-emerald-500/10">INTERACTIVE</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${analysisData ? (analysisData.breachAnalysis?.isEquifaxVictimLikely ? 'bg-red-500 animate-pulse' : 'bg-emerald-500') : 'bg-slate-700'}`}></span>
                      <span className={`text-sm ${analysisData ? 'text-white' : 'text-slate-500'}`}>Equifax Node</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${analysisData ? (analysisData.breachAnalysis?.isExperianVictimLikely ? 'bg-red-500 animate-pulse' : 'bg-emerald-500') : 'bg-slate-700'}`}></span>
                      <span className={`text-sm ${analysisData ? 'text-white' : 'text-slate-500'}`}>Experian Node</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${analysisData ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                      <span className={`text-sm ${analysisData ? 'text-white' : 'text-slate-500'}`}>TransUnion Node</span>
                    </div>
                  </div>

                  {/* Radar Visual */}
                  <div className="relative w-20 h-20 opacity-60">
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full"></div>
                    <div className="absolute inset-4 border border-emerald-500/20 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500/0 to-emerald-500 origin-left animate-[spin_3s_linear_infinite]"></div>
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#10b981]"></div>
                  </div>
                </div>
              </div>

              {/* CARD 5: BUSINESS BLUEPRINT CTA */}
              <div className="md:col-span-4 glass-panel rounded-lg p-6 hover:bg-white/5 transition cursor-pointer group flex flex-col justify-between border-t border-blue-500/20" onClick={() => setCurrentView(AppView.BUSINESS_BLUEPRINT)}>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition font-serif">Business Blueprint</h3>
                    <div className="bg-slate-800 p-1.5 rounded-full text-slate-400 group-hover:text-white group-hover:bg-blue-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">Structure your entity for high-limit funding approvals.</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">LLC</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">EIN</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">DUNS</span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="animate-fade-in min-h-[600px]">
            {currentView === AppView.ANALYSIS && analysisData && (
              <AnalysisReport data={analysisData} onNavigateToDisputes={() => setCurrentView(AppView.LETTERS)} />
            )}
            {currentView === AppView.LETTERS && (
              <DisputeGenerator analysisData={analysisData} onViewGuide={() => setCurrentView(AppView.CFPB_GUIDE)} onViewFTCGuide={() => setCurrentView(AppView.FTC_GUIDE)} />
            )}
            {currentView === AppView.BUSINESS_BLUEPRINT && <BusinessBlueprint />}
            {currentView === AppView.VOICE_AGENT && (
              <VoiceAgent analysisData={analysisData} />
            )}
            {currentView === AppView.CFPB_GUIDE && <CFPBGuide onViewFTCGuide={() => setCurrentView(AppView.FTC_GUIDE)} />}
            {currentView === AppView.FTC_GUIDE && <FTCGuide />}
            {currentView === AppView.RESOURCES && <ResourcesView />}
          </div>
        )}
      </main>

    </div>
  );
};

export default Dashboard;
