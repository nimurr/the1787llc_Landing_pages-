
import React from 'react';

const FTCGuide: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Visit IdentityTheft.gov',
      content: (
        <div className="space-y-4 text-slate-300 font-light">
          <p>Official federal portal for affidavit generation.</p>
          <a href="https://www.identitytheft.gov/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">
            Go to IdentityTheft.gov
          </a>
        </div>
      )
    },
    {
      id: 2,
      title: 'Select "Get Started"',
      content: (
        <p className="text-slate-300 font-light">
          Click the prominent button on the homepage.
        </p>
      )
    },
    {
      id: 3,
      title: 'Categorize the Theft',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Select: <em>"I want to report identity theft"</em></p>
          <div className="bg-black/30 p-4 rounded border border-slate-700 text-sm">
             <span className="text-emerald-400 font-bold">✓ I want to report identity theft</span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Select Affected Accounts',
      content: (
        <div className="space-y-4 text-slate-300 font-light">
          <p>Select categories matching your negative items (Credit Card, Loan, etc).</p>
        </div>
      )
    },
    {
      id: 7,
      title: 'Download Affidavit',
      content: (
        <div className="bg-emerald-500/10 p-6 rounded border border-emerald-500/20">
          <h4 className="text-xl font-bold text-white mb-2">CRITICAL STEP</h4>
          <p className="text-emerald-200">
            You MUST download the <strong>Identity Theft Report</strong> (PDF). This is your legal shield.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="animate-in fade-in pb-16">
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h2 className="text-4xl font-bold text-white mb-4 font-serif">FTC Affidavit Protocol</h2>
        <p className="text-slate-400 text-xl font-light">
          Obtain your federal immunity document to block fraudulent information.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="glass-panel p-8 rounded-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-serif font-bold text-white leading-none -mt-4 -mr-4">{step.id}</div>
               <h3 className="text-2xl font-bold text-white mb-4 relative z-10 font-serif">{step.title}</h3>
               <div className="relative z-10">{step.content}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FTCGuide;
