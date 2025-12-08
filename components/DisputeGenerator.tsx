
import React, { useState, useEffect } from 'react';
import { DISPUTE_TEMPLATES } from '../constants';
import { AnalysisResponseSchema, GeneratedLetter, BreachAnalysis } from '../types';
import { generateDisputeContent, assessDataBreachImpact } from '../services/geminiService';

interface Props {
  analysisData: AnalysisResponseSchema | null;
  onViewGuide?: () => void;
  onViewFTCGuide?: () => void;
}

const RESTRICTED_TEMPLATES = [
  'identity_theft_block',
  'data_breach',
  'equifax_breach',
  'experian_breach',
  'tmobile_breach',
  'att_breach',
  'medical_debt_hipaa'
];

const DisputeGenerator: React.FC<Props> = ({ analysisData, onViewGuide, onViewFTCGuide }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('personal_info_cleanup');
  const [generatedLetters, setGeneratedLetters] = useState<GeneratedLetter[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [breachAnalysis, setBreachAnalysis] = useState<BreachAnalysis | null>(null);
  const [isCheckingBreach, setIsCheckingBreach] = useState(false);

  // Client Identity State
  const [clientInfo, setClientInfo] = useState({
    fullName: '',
    address: '',
    dob: '',
    ssnLast4: ''
  });

  // Certification State
  const [hasCertified, setHasCertified] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const handleGenerateClick = () => {
    if (RESTRICTED_TEMPLATES.includes(selectedTemplate) && !hasCertified) {
      setPendingAction(() => () => executeGenerate(selectedTemplate));
      setShowCertModal(true);
    } else {
      executeGenerate(selectedTemplate);
    }
  };

  const handleLoadBreachTemplate = () => {
    if (!breachAnalysis) return;
    let target = 'data_breach';
    if (breachAnalysis.isEquifaxVictimLikely) target = 'equifax_breach';
    else if (breachAnalysis.isExperianVictimLikely) target = 'experian_breach';
    
    const breaches = breachAnalysis.identifiedBreaches?.join(' ').toLowerCase() || '';
    if (breaches.includes('t-mobile') || breaches.includes('tmobile')) target = 'tmobile_breach';
    if (breaches.includes('at&t')) target = 'att_breach';

    setSelectedTemplate(target);
  };

  const executeGenerate = async (templateId: string) => {
    if (!analysisData) {
        alert("No analysis data found. Please upload a report first.");
        return;
    }

    if (!clientInfo.fullName || !clientInfo.address) {
       const confirm = window.confirm("You haven't filled out the Client Identity details. Continue with placeholders?");
       if (!confirm) return;
    }
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setStatusMessage("INITIALIZING SECURE PROTOCOL...");

    const messages = [
      "EXTRACTING DATA POINTS...",
      "INTEGRATING IDENTITY PROFILE...",
      "VERIFYING METRO 2 COMPLIANCE...",
      "DRAFTING LEGAL ARGUMENTS...",
      "FINALIZING DOCUMENT..."
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) return prev;
        if (prev % 15 === 0 && msgIndex < messages.length) {
            setStatusMessage(messages[msgIndex]);
            msgIndex++;
        }
        return prev + Math.floor(Math.random() * 5) + 2;
      });
    }, 150);

    try {
      const template = DISPUTE_TEMPLATES.find(t => t.id === templateId);
      if (!template) throw new Error("Template not found");

      let contextData = { 
        ...analysisData.extractedCreditData,
        personalInfo: clientInfo 
      };

      if (RESTRICTED_TEMPLATES.includes(templateId) && breachAnalysis) {
          (contextData as any).breachContext = breachAnalysis;
      }

      const content = await generateDisputeContent(template.content, contextData);
      
      clearInterval(interval);
      setGenerationProgress(100);
      setStatusMessage("COMPLETE");

      await new Promise(r => setTimeout(r, 600));

      const newLetter: GeneratedLetter = {
        id: Date.now().toString(),
        templateName: template.name,
        content: content,
        generatedAt: new Date().toLocaleString()
      };

      setGeneratedLetters([newLetter, ...generatedLetters]);
    } catch (err) {
      console.error("Failed to generate letter", err);
      const msg = err instanceof Error ? err.message : "Unknown error";
      alert(`Failed to generate letter. System responded: ${msg}`);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
      clearInterval(interval);
      setStatusMessage("");
    }
  };

  const handleScanClick = () => {
    executeScan();
  };

  const executeScan = async () => {
    if (!analysisData) return;
    setIsCheckingBreach(true);
    try {
      // Simulate scan delay for effect
      await new Promise(r => setTimeout(r, 1500));
      const result = await assessDataBreachImpact(analysisData.extractedCreditData);
      setBreachAnalysis(result);
    } catch (err) {
      console.error(err);
      alert("Scan failed. Please try again.");
    } finally {
      setIsCheckingBreach(false);
    }
  };

  const handleCertify = () => {
    setHasCertified(true);
    setShowCertModal(false);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const activeTemplate = DISPUTE_TEMPLATES.find(t => t.id === selectedTemplate);
  
  if (!analysisData) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-slate-500 glass-panel rounded-lg border-dashed">
        <p className="text-xl font-medium">Data required. Please run AI Underwriter first.</p>
      </div>
    );
  }

  const hasBreach = breachAnalysis && (breachAnalysis.isEquifaxVictimLikely || breachAnalysis.isExperianVictimLikely || (breachAnalysis.identifiedBreaches && breachAnalysis.identifiedBreaches.length > 0));

  return (
    <div className="relative pb-20 animate-in fade-in">
      
      {/* Intro Guide */}
      <div className="glass-panel p-8 rounded-lg mb-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="relative z-10">
            <h3 className="font-serif font-bold text-3xl mb-2 text-white">Dispute Strategy Center</h3>
            <p className="text-slate-400 text-lg max-w-2xl font-light">
              Configure your identity profile, generate your affidavit, and launch targeted dispute campaigns.
            </p>
         </div>
         <div className="flex gap-4 relative z-10">
            {onViewGuide && (
                <button onClick={onViewGuide} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold uppercase tracking-wider border border-slate-600 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    CFPB Instructions
                </button>
            )}
            {onViewFTCGuide && (
                <button onClick={onViewFTCGuide} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold uppercase tracking-wider border border-slate-600 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    FTC Affidavit Guide
                </button>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[800px]">
        
        {/* LEFT COLUMN: WORKFLOW */}
        <div className="xl:col-span-4 flex flex-col gap-6">

          {/* STEP 0: CLIENT IDENTITY PROFILE */}
          <div className="glass-panel rounded-lg p-5">
             <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
               <div className="bg-emerald-600 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono">1</div>
               <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Identity Config</h3>
             </div>
             <div className="space-y-3">
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Legal Name</label>
                 <input 
                    type="text" 
                    value={clientInfo.fullName}
                    onChange={(e) => setClientInfo({...clientInfo, fullName: e.target.value})}
                    placeholder="e.g. Johnathan Doe"
                    className="w-full px-3 py-2 bg-black/40 border border-slate-700 rounded text-sm text-white focus:border-emerald-500 outline-none"
                 />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Current Address</label>
                 <input 
                    type="text" 
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
                    placeholder="123 Main St, City, State, Zip"
                    className="w-full px-3 py-2 bg-black/40 border border-slate-700 rounded text-sm text-white focus:border-emerald-500 outline-none"
                 />
               </div>
               <div className="flex gap-3">
                 <div className="flex-1">
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Date of Birth</label>
                   <input 
                      type="text" 
                      value={clientInfo.dob}
                      onChange={(e) => setClientInfo({...clientInfo, dob: e.target.value})}
                      placeholder="MM/DD/YYYY"
                      className="w-full px-3 py-2 bg-black/40 border border-slate-700 rounded text-sm text-white focus:border-emerald-500 outline-none"
                   />
                 </div>
                 <div className="w-24">
                   <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">SSN (Last 4)</label>
                   <input 
                      type="text" 
                      value={clientInfo.ssnLast4}
                      onChange={(e) => setClientInfo({...clientInfo, ssnLast4: e.target.value})}
                      maxLength={4}
                      placeholder="XXXX"
                      className="w-full px-3 py-2 bg-black/40 border border-slate-700 rounded text-sm text-white focus:border-emerald-500 outline-none"
                   />
                 </div>
               </div>
             </div>
          </div>
          
          {/* STEP 1: BREACH SCANNER (FEATURE PUT BACK) */}
          <div className={`rounded-lg border transition-all p-6 relative overflow-hidden ${hasBreach ? 'bg-red-900/10 border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'glass-panel'}`}>
            <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-2">
                  <div className="bg-emerald-600 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono">2</div>
                  <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Data Breach Scan</h3>
               </div>
               {hasBreach && <span className="text-red-400 text-[10px] font-bold px-2 py-1 border border-red-500/30 rounded uppercase animate-pulse">Threat Detected</span>}
            </div>
            
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
               Run a specialized diagnostic against known data breaches (Equifax 2017, T-Mobile, etc) to qualify for "Identity Theft" block procedures.
            </p>

            {!breachAnalysis ? (
              <button 
                onClick={handleScanClick}
                disabled={isCheckingBreach}
                className="w-full py-3 bg-emerald-600/10 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white text-emerald-400 font-bold transition-all rounded text-xs tracking-widest flex items-center justify-center gap-2"
              >
                {isCheckingBreach ? (
                   <>
                     <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                     SCANNING DARK WEB...
                   </>
                ) : (
                   <>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                     RUN BREACH DIAGNOSTIC
                   </>
                )}
              </button>
            ) : (
              <div className="space-y-3 mt-3 animate-in fade-in">
                <div className="grid grid-cols-2 gap-2">
                  <div className={`p-2 rounded border text-center ${breachAnalysis.isEquifaxVictimLikely ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                    <div className="font-bold text-xs">{breachAnalysis.isEquifaxVictimLikely ? '⚠️ Equifax' : '✓ Equifax'}</div>
                  </div>
                  <div className={`p-2 rounded border text-center ${breachAnalysis.isExperianVictimLikely ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                    <div className="font-bold text-xs">{breachAnalysis.isExperianVictimLikely ? '⚠️ Experian' : '✓ Experian'}</div>
                  </div>
                </div>
                
                {hasBreach ? (
                   <div className="text-center">
                      <p className="text-[10px] text-red-300 mb-2">Likely victim of {breachAnalysis.identifiedBreaches?.length} major breaches.</p>
                      <button 
                        onClick={handleLoadBreachTemplate}
                        className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded shadow-lg animate-pulse"
                      >
                        Load Breach Strategy
                      </button>
                   </div>
                ) : (
                    <div className="text-center text-xs text-emerald-500 font-medium">
                        No breach vectors identified.
                    </div>
                )}
                
                <button onClick={() => setBreachAnalysis(null)} className="w-full text-[10px] text-slate-500 hover:text-slate-300 mt-2 underline">
                    Reset Scanner
                </button>
              </div>
            )}
          </div>

          {/* STEP 2: THE FOUNDATION */}
          <div className="glass-panel rounded-lg p-5">
             <div className="flex items-center gap-2 mb-3">
                <div className="bg-emerald-600 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono">3</div>
                <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Foundation</h3>
             </div>
             
             <div className="space-y-2">
               <button
                 onClick={() => setSelectedTemplate('personal_info_cleanup')}
                 className={`w-full text-left p-3 rounded border transition-all text-xs font-bold ${selectedTemplate === 'personal_info_cleanup' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-black/20 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
               >
                 A. Personal Info Sweep
               </button>
               <button
                 onClick={() => setSelectedTemplate('identity_statement_of_fact')}
                 className={`w-full text-left p-3 rounded border transition-all text-xs font-bold ${selectedTemplate === 'identity_statement_of_fact' ? 'bg-amber-600 text-white border-amber-500' : 'bg-black/20 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
               >
                 B. Identity Affidavit (Notarize)
               </button>
             </div>
          </div>

          {/* STEP 3: CHOOSE ATTACK */}
          <div className="glass-panel rounded-lg flex flex-col overflow-hidden flex-1 min-h-[400px]">
             <div className="bg-black/20 p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-600 text-white w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono">4</div>
                  <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Attack Vectors</h3>
                </div>
             </div>
             
             <div className="flex-1 overflow-y-auto max-h-[600px] p-2 space-y-2 custom-scrollbar">
                {DISPUTE_TEMPLATES
                  .filter(t => t.id !== 'identity_statement_of_fact' && t.id !== 'personal_info_cleanup')
                  .map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`w-full text-left p-4 rounded border transition-all group ${
                      selectedTemplate === t.id 
                        ? 'bg-emerald-600 border-emerald-500 text-white' 
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                       <div className="font-bold text-sm mb-1">{t.name}</div>
                       {RESTRICTED_TEMPLATES.includes(t.id) && hasBreach && t.id.includes('breach') && (
                          <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">RECOMMENDED</span>
                       )}
                    </div>
                    <div className={`text-[10px] uppercase font-bold tracking-wider opacity-60 ${selectedTemplate === t.id ? 'text-emerald-100' : 'text-slate-600'}`}>
                       {t.legalBasis || 'General Dispute'}
                    </div>
                  </button>
                ))}
             </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ACTION & PREVIEW */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* HEADER PANEL */}
          <div className="glass-panel rounded-lg p-6">
             <div className="flex justify-between items-start mb-6">
               <div>
                  <h2 className="text-2xl font-bold text-white font-serif">{activeTemplate?.name}</h2>
                  <p className="text-slate-400 text-sm mt-1 max-w-2xl">{activeTemplate?.purpose}</p>
               </div>
               {activeTemplate?.legalBasis && (
                 <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded text-xs font-mono border border-slate-700 whitespace-nowrap">
                   {activeTemplate.legalBasis}
                 </span>
               )}
             </div>

             {/* GENERATE BUTTON OR PROGRESS BAR */}
             {isGenerating ? (
               <div className="w-full bg-black/40 rounded p-6 border border-slate-700">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-xs font-bold text-emerald-400 font-mono animate-pulse">
                       {statusMessage}
                     </span>
                     <span className="text-xs font-black text-emerald-500">{generationProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-emerald-500 transition-all duration-300 ease-out"
                       style={{ width: `${generationProgress}%` }}
                     ></div>
                  </div>
               </div>
             ) : (
                <button
                  onClick={handleGenerateClick}
                  className="w-full py-5 rounded font-bold text-lg text-white transition-all bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-emerald-400 flex items-center justify-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  GENERATE DOCUMENT
                </button>
             )}
          </div>

          {/* PREVIEW PANEL */}
          <div className="flex-1 glass-panel rounded-lg p-8 flex flex-col relative min-h-[600px]">
             
             {generatedLetters.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                     <h3 className="font-bold text-slate-300 text-lg">Document Preview</h3>
                  </div>
                  <div className="flex-1 bg-white text-slate-900 p-10 rounded border border-slate-200 shadow-inner overflow-y-auto font-serif whitespace-pre-wrap text-lg leading-loose selection:bg-emerald-200 max-h-[800px]">
                    {generatedLetters[0].content}
                  </div>
                  
                  {/* Footer Actions */}
                  <div className="mt-6 flex justify-end">
                    <button className="bg-slate-800 text-white font-bold flex items-center gap-2 px-8 py-4 rounded hover:bg-slate-700 transition-colors border border-slate-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download PDF
                    </button>
                  </div>
                </>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 gap-4">
                   <div className="p-6 rounded-full border border-slate-800">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                   </div>
                   <p className="text-sm font-mono opacity-50">SYSTEM READY FOR GENERATION</p>
                </div>
             )}

          </div>

        </div>
      </div>

      {/* Certification Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCertModal(false)}></div>
          <div className="glass-panel rounded-lg shadow-2xl p-8 max-w-md w-full relative z-10 animate-in zoom-in-95 duration-300 border border-slate-700">
            <h3 className="text-xl font-bold text-white text-center mb-4">Legal Certification</h3>
            <p className="text-slate-400 text-center mb-6 text-sm">
              Confirm that you believe you are a victim of identity theft or data breach to unlock these templates.
            </p>
            <div className="flex gap-3">
               <button onClick={() => setShowCertModal(false)} className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold rounded hover:bg-slate-700">Cancel</button>
               <button onClick={handleCertify} className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded hover:bg-emerald-500">I Certify</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisputeGenerator;
