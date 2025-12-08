
import React, { useState } from 'react';

interface Post {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  color: string;
  content: string[]; // Array of paragraphs for easier rendering
}

const ResourcesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      id: 1,
      category: 'Dispute Strategy',
      title: 'Why Automated "E-OSCAR" Disputes Fail',
      excerpt: 'Learn why metro2 compliance scanners and automated portals often result in "verified" outcomes, and why manual processing is the only legal leverage you have.',
      date: 'Oct 24, 2024',
      readTime: '5 min read',
      color: 'bg-blue-500',
      content: [
        "The Credit Reporting Agencies (CRAs) process over 98% of disputes using an automated system called e-OSCAR (Online Solution for Complete and Accurate Reporting). When you submit a dispute online or via a standard template, an OCR system reads your letter, summarizes it into a 2-digit code (e.g., '01 - Not mine'), and sends that code to the data furnisher.",
        "The furnisher's computer simply checks if the name and SSN match their records. If it matches, they send back a 'Verified' code. No human ever looks at your evidence. No one checks the actual contract. This is why automated disputes fail.",
        "To win, you must force a MANUAL investigation. This is done by avoiding standard templates, using specific legal language (like 15 U.S.C. 1681i), and confusing the OCR system or demanding procedural information that the automated system cannot provide."
      ]
    },
    {
      id: 2,
      category: 'Data Breach',
      title: 'Equifax 2017: Are You Owed Compensation?',
      excerpt: 'The settlement window is complex. If you had an active credit file prior to 2017, you are likely a victim. Here is how to claim your deletion rights.',
      date: 'Nov 12, 2024',
      readTime: '3 min read',
      color: 'bg-red-500',
      content: [
        "In 2017, Equifax lost the personal data (Name, SSN, DOB, Address) of approximately 147 million Americans. If you had a credit report in 2017, you are almost certainly a victim.",
        "While the monetary settlement window has largely closed, the 'Equifax Data Breach Settlement' established a permanent legal precedent: Your data is compromised. This means Equifax cannot simply 'verify' an account by matching your SSN, because your SSN is public knowledge on the dark web.",
        "You can use this in disputes by stating: 'My identity was compromised in the 2017 Equifax breach. Mere verification of my personal info is insufficient proof of debt ownership, as this data is compromised. I demand physical proof of contract.'"
      ]
    },
    {
      id: 3,
      category: 'Funding',
      title: 'The "700 Club": Funding Readiness Standards',
      excerpt: 'Lenders look for more than just a score. We break down the 5 key data points underwriters check before approving business lines of credit.',
      date: 'Dec 05, 2024',
      readTime: '7 min read',
      color: 'bg-emerald-500',
      content: [
        "A 700 FICO score is not enough. Underwriters for high-limit business credit cards (Chase Ink, Amex, BOA) look at the 'Data Points' behind the score.",
        "1. **Utilization**: Must be under 10% on individual cards, not just overall. A maxed-out card is a dealbreaker even with a high score.",
        "2. **Age of History**: Primary accounts aged 5+ years are the gold standard. Under 2 years is considered 'Thin File'.",
        "3. **Comparable Credit**: If you want a $50k limit, you need at least one existing card with a $10k+ limit. They rarely give you 5x your highest current limit.",
        "4. **Inquiries**: No more than 1-2 hard inquiries in the last 6 months.",
        "5. **Derogatory Marks**: Zero. No late payments in 24 months. No collections."
      ]
    },
    {
      id: 4,
      category: 'Legal',
      title: 'The "Method of Verification" Attack',
      excerpt: 'When a bureau says "Verified", they usually didn\'t check proofs. Use 15 U.S.C. § 1681i(a)(7) to demand the specific procedure they used.',
      date: 'Dec 12, 2024',
      readTime: '4 min read',
      color: 'bg-purple-500',
      content: [
        "The FCRA Section 611 (15 U.S.C. § 1681i(a)(7)) allows a consumer to request the 'Method of Verification'. This is a powerful follow-up to any 'Verified' dispute response.",
        "You demand: 'Provide the business name, address, telephone number, and name of the specific individual who verified this information.'",
        "The bureaus (Equifax, Experian, TransUnion) almost never have this information because they verified it electronically via e-OSCAR. They do not know who clicked the button at the bank.",
        "When they fail to provide this specific procedural information within 15 days, the verification is invalid, and the item must be deleted."
      ]
    },
    {
      id: 5,
      category: 'Public Records',
      title: 'Deleting Bankruptcies from LexisNexis',
      excerpt: 'Bureaus don\'t go to the courthouse. They use LexisNexis. Freeze the secondary bureau first to stop the verification chain.',
      date: 'Jan 03, 2025',
      readTime: '6 min read',
      color: 'bg-amber-500',
      content: [
        "The Big 3 bureaus do not send runners to courthouses to verify bankruptcies or tax liens. They buy this data from a secondary bureau called LexisNexis.",
        "To delete a bankruptcy, you must attack the source.",
        "Step 1: Request your LexisNexis report.",
        "Step 2: Submit a 'Security Freeze' on LexisNexis.",
        "Step 3: Dispute the bankruptcy on LexisNexis directly (often finding errors in the filing date or liabilities).",
        "Step 4: Once frozen or deleted at LexisNexis, dispute it with Equifax/Experian/TransUnion. When they try to 'ping' LexisNexis to verify, they will be blocked by the freeze. Result: Unverifiable -> Deletion."
      ]
    },
    {
      id: 6,
      category: 'Inquiries',
      title: 'Removing Hard Inquiries in 24 Hours',
      excerpt: 'Hard inquiries not attached to open accounts can often be removed by calling the fraud department directly. Here is the script.',
      date: 'Jan 15, 2025',
      readTime: '3 min read',
      color: 'bg-pink-500',
      content: [
        "Hard inquiries stay on your report for 2 years, but they only hurt your score for 12 months. However, too many (6+) will get you denied for funding.",
        "The '24 Hour' Method: Call the credit bureau (Experian is easiest). navigate to the Fraud Department.",
        "Script: 'I am reviewing my report and I see inquiries I do not recognize. I am concerned about identity theft. These inquiries are not attached to any open accounts I authorized. Please remove them.'",
        "Warning: Do NOT dispute inquiries attached to open, positive accounts (like your main credit card). The bank may close the account for fraud."
      ]
    },
     {
      id: 7,
      category: 'Growth',
      title: 'Authorized User "Piggybacking" 101',
      excerpt: 'How to legally boost your score by 40+ points instantly using a friend or relative\'s aged tradeline.',
      date: 'Jan 20, 2025',
      readTime: '5 min read',
      color: 'bg-cyan-500',
      content: [
        "Authorized User (AU) tradelines are the fastest way to boost a score. You get added to someone else's credit card, and their entire history for that card copies to your report.",
        "Selection Criteria:",
        "1. **Age**: Must be 5+ years old (10+ is better).",
        "2. **Limit**: Higher is better ($20k+).",
        "3. **Utilization**: Must be < 10%. If the owner maxes it out, YOUR score drops.",
        "4. **History**: 100% on-time payments.",
        "Note: Some banks (Chase) ask for the SSN of the AU. Others (Amex) ask for Passport. Ensure the address matches on the credit file for the trade to report correctly."
      ]
    },
    {
      id: 8,
      category: 'Funding',
      title: 'Sequencing Your Applications',
      excerpt: 'Don\'t apply randomly. Learn the "App-O-Rama" technique to secure multiple lines of credit before the inquiries hit your report.',
      date: 'Feb 01, 2025',
      readTime: '8 min read',
      color: 'bg-indigo-500',
      content: [
        "Credit inquiries are almost instant, but not always. 'Sequencing' or 'App-O-Rama' is the art of applying for multiple loans in a short window so lenders don't see the other new inquiries yet.",
        "Strategy:",
        "1. Open 3 browser tabs for different banks (e.g., Chase, Amex, BOA).",
        "2. Pre-fill all applications.",
        "3. Submit them all within seconds of each other.",
        "This minimizes the chance that Bank B sees the hard pull from Bank A before making their decision.",
        "Also, apply for the hardest banks first (Chase 5/24 rule) before moving to more lenient lenders."
      ]
    },
    {
      id: 9,
      category: 'Business',
      title: 'Tier 1 Business Credit Vendors',
      excerpt: 'Stop using your SSN. Start building a Paydex score with these 5 Net-30 vendors that report to Dun & Bradstreet.',
      date: 'Feb 10, 2025',
      readTime: '6 min read',
      color: 'bg-teal-500',
      content: [
        "To get business loans without a personal guarantee (PG), you need a Paydex score of 80 with Dun & Bradstreet.",
        "You build this by opening 'Net-30' accounts. These are vendor accounts where you buy supplies and pay in 30 days.",
        "The Top 5 Tier 1 Vendors (Easy Approval):",
        "1. **Uline**: Shipping supplies. Reports quickly.",
        "2. **Quill**: Office supplies. often requires a $50 purchase first.",
        "3. **Grainger**: Industrial supplies.",
        "4. **Summa Office Supplies**: Reports to Equifax Business.",
        "5. **Nav**: A business credit monitoring service that also reports as a tradeline.",
        "Buy small items ($50), pay immediately. Do this for 3 months to generate a Paydex score."
      ]
    }
  ];

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    return (
        <div className="animate-in fade-in pb-10 min-h-[600px] flex flex-col">
            <button 
                onClick={() => setSelectedPost(null)}
                className="self-start flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group"
            >
                <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </div>
                <span className="text-sm font-bold uppercase tracking-wide">Back to Intelligence Hub</span>
            </button>

            <article className="glass-panel rounded-2xl p-8 md:p-12 max-w-4xl mx-auto w-full relative overflow-hidden border border-white/10 shadow-2xl">
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 w-96 h-96 ${selectedPost.color} opacity-5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2`}></div>
                
                <header className="mb-10 relative z-10">
                    <div className="flex flex-wrap gap-3 items-center mb-6">
                        <span className={`text-[10px] font-bold text-white uppercase tracking-wider px-3 py-1 rounded-full ${selectedPost.color.replace('bg-', 'bg-opacity-20 text-').replace('500', '400')} border border-white/10 bg-black/40`}>
                            {selectedPost.category}
                        </span>
                        <span className="text-slate-500 text-xs font-mono">
                            {selectedPost.date} • {selectedPost.readTime}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight mb-6">
                        {selectedPost.title}
                    </h1>
                    <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
                </header>

                <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-light leading-relaxed space-y-6 relative z-10">
                    {selectedPost.content.map((paragraph, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{__html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')}}></p>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center relative z-10">
                     <span className="text-slate-500 text-xs uppercase tracking-widest">RevolV Intelligence Engine</span>
                     <button 
                        onClick={() => setSelectedPost(null)}
                        className="text-emerald-400 hover:text-emerald-300 font-bold text-sm"
                     >
                        Read Next Article &rarr;
                     </button>
                </div>
            </article>
        </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 font-serif">Intelligence Hub</h2>
          <p className="text-slate-400 font-light">Advanced strategies for compliance and capital acquisition.</p>
        </div>
        <div className="w-full md:w-auto relative group">
          <input 
            type="text" 
            placeholder="Search intelligence..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/30 border border-slate-700 text-white pl-10 pr-4 py-2.5 rounded-lg w-full md:w-72 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
          />
          <svg className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-all ${
                    activeCategory === cat 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
            <article 
                key={post.id} 
                onClick={() => setSelectedPost(post)}
                className="group glass-panel rounded-xl overflow-hidden hover:bg-white/5 transition-all cursor-pointer flex flex-col h-full border border-white/5 hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1 duration-300"
            >
                <div className={`h-1.5 w-full ${post.color} opacity-80`} />
                <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-700 px-2 py-1 rounded bg-black/20">
                    {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors font-serif leading-tight">
                    {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1 font-light">
                    {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800 group-hover:border-slate-700 transition-colors">
                    <span className="text-xs text-slate-600">{post.date}</span>
                    <button className="text-xs font-bold text-emerald-500 uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    </button>
                </div>
                </div>
            </article>
            ))
        ) : (
            <div className="col-span-full py-20 text-center text-slate-500">
                <p>No intelligence reports found matching your criteria.</p>
                <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}} className="mt-4 text-emerald-400 underline">Reset Filters</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesView;