
import React, { useState } from 'react';

const BusinessBlueprint: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const phases = [
    {
      id: 1,
      title: "Business Foundations",
      subtitle: "Legitimacy & Structure",
      steps: [
        {
          id: 1,
          title: "Entity Formation",
          desc: "Establish your legal structure (LLC/Corp) to separate liability.",
          details: "You must register with your Secretary of State. Ensure your name is available. For high-limit funding, we recommend an LLC or C-Corp structure. Avoid Sole Proprietorships.",
          action: "Register Entity (USA.gov)",
          link: "https://www.usa.gov/register-business",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          )
        },
        {
          id: 2,
          title: "EIN Acquisition",
          desc: "Obtain your Federal Tax ID from the IRS.",
          details: "Your EIN is your business 'Social Security Number'. It is required for banking, credit, and vendor accounts. Ensure responsible party details match your personal credit profile exactly.",
          action: "Apply for EIN (IRS.gov)",
          link: "https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          )
        },
        {
          id: 3,
          title: "Business Email",
          desc: "Professional domain-based communication channel.",
          details: "Banks reject '@gmail.com' or '@yahoo.com' addresses. You must have 'name@yourbusiness.com' via Google Workspace or Outlook.",
          action: "Setup Workspace",
          link: "https://workspace.google.com/",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
          )
        },
        {
          id: 4,
          title: "Business Phone",
          desc: "Local or Toll-Free line with 411 registration capability.",
          details: "Must be a VOIP or dedicated line (RingCentral, Zoom, etc.) that can be listed. Personal cell numbers are a 'High Risk' indicator for underwriters.",
          action: "Get Business Line",
          link: "https://www.ringcentral.com/",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          )
        },
        {
          id: 5,
          title: "Domain & Website",
          desc: "Custom HTML site with secure hosting.",
          details: "Underwriters check your website to verify nature of business. Ensure your domain WHOIS info matches your Entity registration address.",
          action: "Register Domain",
          link: "https://www.godaddy.com/",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
          )
        }
      ]
    },
    {
      id: 2,
      title: "Business Credibility",
      subtitle: "Data & Funding Readiness",
      steps: [
        {
          id: 6,
          title: "411 Listing",
          desc: "Public directory verification.",
          details: "Your business must be discoverable via White Pages / 411. This is the first check many Tier 1 automated underwriting systems perform.",
          action: "List Yourself 411",
          link: "https://www.listyourself.net/ListYourself/",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          )
        },
        {
          id: 7,
          title: "D-U-N-S Number",
          desc: "Dun & Bradstreet registration.",
          details: "Required for building a Paydex score. Get this expeditiously without paying D&B's fee by using the standard government grant portal link.",
          action: "Get D-U-N-S",
          link: "https://www.dnb.com/duns-number/get-a-duns.html",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )
        },
        {
          id: 8,
          title: "Experian Business",
          desc: "Create and claim your business credit profile.",
          details: "Ensure your personal credit links correctly to your business profile ('Match & Merge'). This is critical for Amex and Chase business card approvals.",
          action: "Check Experian Biz",
          link: "https://www.experian.com/small-business/business-credit-reports",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .883-.393 1.627-1 2.18m1-2.18C9.607 6.628 10 5.883 10 5m0 0a2 2 0 10-4 0m4 0a2 2 0 11-4 0" /></svg>
          )
        },
        {
          id: 9,
          title: "Personal Financial Statement",
          desc: "Lender-ready liquidity & asset breakdown.",
          details: "Create a professional PFS (SBA Form 413) outlining your liquidity, assets, and liabilities. This is required for SBA loans and lines of credit over $50k.",
          action: "Download SBA 413",
          link: "https://www.sba.gov/document/sba-form-413-personal-financial-statement-7a-504-loans-surety-bonds",
          icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          )
        }
      ]
    }
  ];

  return (
    <div className="animate-in fade-in pb-20">
      
      {/* Header */}
      <div className="mb-10 border-b border-slate-800 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
            <svg className="w-64 h-64 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 font-serif relative z-10">Business Blueprint</h2>
        <p className="text-slate-400 text-xl font-light relative z-10">
          The structural compliance roadmap to funding. Complete these phases to satisfy Tier 1 underwriting requirements.
        </p>
      </div>

      <div className="space-y-12 relative">
        {/* Timeline Connector Graphic */}
        <div className="absolute left-5 top-16 bottom-16 w-0.5 bg-gradient-to-b from-emerald-500/50 via-slate-700 to-transparent hidden md:block"></div>

        {phases.map((phase) => (
          <div key={phase.id} className="relative md:pl-16">
            
            {/* Phase Node Graphic */}
            <div className="hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-[#0b0c15] border-2 border-emerald-500 items-center justify-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <span className="text-emerald-500 font-bold text-sm">{phase.id}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-6">
               <h3 className="text-2xl font-bold text-white font-serif">{phase.title}</h3>
               <div className="hidden md:block w-px h-6 bg-slate-700 mx-2"></div>
               <span className="text-emerald-400 text-sm font-mono uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">{phase.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {phase.steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`glass-panel rounded-lg border transition-all duration-300 overflow-hidden group ${activeStep === step.id ? 'border-emerald-500 bg-white/5' : 'border-white/5 hover:border-white/20'}`}
                >
                  <div 
                    className="p-6 flex items-start gap-4 cursor-pointer"
                    onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  >
                    <div className={`p-3 rounded-lg transition-colors duration-300 ${activeStep === step.id ? 'bg-emerald-500 text-white shadow-[0_0_15px_#10b981]' : 'bg-slate-800 text-slate-400 group-hover:text-emerald-400'}`}>
                      {step.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`text-lg font-bold transition-colors ${activeStep === step.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                          {step.title}
                        </h4>
                        <div className="hidden sm:flex text-xs uppercase font-bold tracking-wider text-slate-500 items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${activeStep === step.id ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
                           {activeStep === step.id ? 'Active' : 'Pending'}
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">{step.desc}</p>
                    </div>

                    <div className="text-slate-500">
                       <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${activeStep === step.id ? 'rotate-180 text-emerald-500' : ''}`} 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                       >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeStep === step.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                     <div className="p-6 pt-0 border-t border-white/5 bg-black/20">
                        <div className="mt-4 text-slate-300 text-sm leading-relaxed mb-6 pl-4 border-l-2 border-emerald-500/30">
                           <strong className="text-emerald-400 block mb-2 uppercase text-xs tracking-wider">Underwriting Compliance Requirement:</strong>
                           {step.details}
                        </div>
                        <div className="flex justify-end">
                           <a 
                             href={step.link}
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="px-6 py-3 bg-slate-800 hover:bg-emerald-600 text-white font-bold rounded text-sm transition-all border border-slate-600 hover:border-emerald-500 flex items-center gap-2 group shadow-lg hover:shadow-emerald-500/20"
                           >
                              <span>{step.action}</span>
                              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                           </a>
                        </div>
                     </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessBlueprint;
