
import React from 'react';

interface Props {
  onViewFTCGuide?: () => void;
}

const CFPBGuide: React.FC<Props> = ({ onViewFTCGuide }) => {
  const steps = [
    {
      id: 1,
      title: 'Create Account & Start',
      content: (
        <ul className="list-disc list-inside space-y-3 text-slate-300 text-lg ml-2 font-light">
          <li>Go to <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-4">consumerfinance.gov</a></li>
          <li>Click <strong className="text-white">"Submit a Complaint"</strong> (Top Right)</li>
          <li>Scroll down and click <strong className="text-white">"Start a New Complaint"</strong></li>
        </ul>
      )
    },
    {
      id: 2,
      title: 'Categorize the Complaint',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Select these exact options to ensure manual processing:</p>
          <div className="bg-black/30 p-6 rounded border border-slate-700 space-y-4 font-mono text-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="text-slate-500">Subject?</span>
              <span className="text-emerald-400">Credit Reporting</span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <span className="text-slate-500">Problem?</span>
              <span className="text-emerald-400">Incorrect information on report</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Investigation Details',
      content: (
        <div className="space-y-4 text-slate-300">
          <p>Answer the standard questionnaire:</p>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="bg-black/30 p-4 border border-slate-700 rounded flex justify-between items-center">
              <span className="text-slate-400">Tried to fix with company?</span>
              <span className="text-emerald-400 font-bold">YES</span>
            </div>
            <div className="bg-black/30 p-4 border border-slate-700 rounded flex justify-between items-center">
              <span className="text-slate-400">Did company provide info?</span>
              <span className="text-red-400 font-bold">NO</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Narrative & Resolution',
      content: (
        <div className="space-y-6 text-slate-300">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">"What happened?"</label>
            <div className="bg-slate-800 p-4 rounded text-slate-200 border border-slate-600 select-all cursor-text font-serif italic">
              "Unauthorized/unverified accounts, and inquiries on my credit report."
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: 'Upload Evidence',
      content: (
        <ul className="list-disc list-inside space-y-4 text-slate-300 text-lg ml-2 font-light">
          <li><strong>Dispute Letter:</strong> Upload the PDF you just generated.</li>
          <li className="bg-emerald-500/10 p-3 rounded -ml-3 pl-3 border border-emerald-500/20 text-emerald-200">
            <strong>FTC Identity Theft Report:</strong> If applicable, upload your affidavit.
          </li>
          <li><strong>ID & Proof of Address:</strong> Mandatory uploads.</li>
        </ul>
      )
    }
  ];

  return (
    <div className="animate-in fade-in pb-16">
      <div className="mb-10 border-b border-slate-800 pb-8">
        <h2 className="text-4xl font-bold text-white mb-4 font-serif">CFPB Protocol</h2>
        <p className="text-slate-400 text-xl font-light">
          Manual submission override via Federal Portal.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step) => (
            <div key={step.id} className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-mono font-bold">
                {step.id}
              </div>
              
              <div className="glass-panel p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-6 font-serif">
                  {step.title}
                </h3>
                {step.content}
              </div>
            </div>
          ))}

        <div className="mt-16 text-center">
          <a 
            href="https://www.consumerfinance.gov/complaint/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 rounded font-bold text-white transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            Launch CFPB Portal
          </a>
        </div>
      </div>
    </div>
  );
};

export default CFPBGuide;
