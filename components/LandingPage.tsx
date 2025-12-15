
import { usePaySubscriptionMutation } from '@/redux/features/subscription/subscription';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CiLock } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  onEnterApp: () => void;
}

const LandingPage: React.FC<Props> = () => {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = useNavigate();


  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "E-Commerce Founder",
      funded: "$150,000",
      quote: "RevolV helped me delete 4 collections and get my startup capital in just 60 days. The AI Underwriter is scary accurate.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Marcus Thorne",
      role: "Real Estate Investor",
      funded: "$285,000",
      quote: "The voice coach is insane. I knew exactly what to say to the Chase banker to bypass the manual review trigger.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "David Chen",
      role: "Tech Startup",
      funded: "$80,000",
      quote: "My utilization was killing me. The AU strategy fixed my score in 2 weeks and I got approved for the Amex Platinum immediately.",
      image: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      name: "Elena Rodriguez",
      role: "Small Business Owner",
      funded: "$50,000",
      quote: "I didn't think I could get funding with a past bankruptcy. The procedural attack worked and removed it from LexisNexis.",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully.');
    setUser(null);
  };

  const goLoginPage = () => {
    window.location.href = "/login";
  }

  const shwoProfile = () => {
    if (!user) {
      toast.error('Please login first.');
      return;
    }
    navigate('/dashboard-profile');
  }

  const onEnterApp = () => {
    if (!user) {
      toast.error('Please login first.');
      return;
    }
    navigate('/dashboard');
  }

  const [paymentSub] = usePaySubscriptionMutation();

  const buySubscription = async () => {
    try {
      const data = {
        productName: "RevolV",
        price: 299,
        type: "year"
      }
      const res = await paymentSub(data);
      console.log(res)

      if (res?.data?.message === "Success") {
        toast.success(res?.data?.message);
        navigate(res?.data?.url);
      }
      else {
        toast.error(res?.error?.data?.error || "Something went wrong.");
      }

    } catch (error) {
      toast.error(error?.error?.data?.message || "Something went wrong.");
    }

  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0c15]">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern z-0 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-50 flex justify-between items-center px-6 md:px-8 py-6 max-w-7xl mx-auto">
        <Link to="/">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <svg viewBox="0 0 100 100" className="h-10 w-10 group-hover:rotate-90 transition-transform duration-700" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="landingLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path
                d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                stroke="url(#landingLogoGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 35 V65 M35 45 H55 C62 45 65 35 55 35 H35 M45 45 L65 65"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="80" cy="80" r="4" fill="#10b981" className="animate-pulse" />
            </svg>
            <span className="text-2xl font-bold text-white font-serif tracking-tight">RevolV</span>
          </div>
        </Link>

        {
          user ? (
            <div className="flex items-center gap-3">
              <button onClick={shwoProfile} className=" bg-color-primary  px-4 py-2 rounded  text-sm font-bold text-gray-100 hover:text-white transition-colors">
                History
              </button>
              <button onClick={handleLogout} className=" bg-red-700 px-4 py-2 rounded md:block text-sm font-bold text-white hover:text-white transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={goLoginPage} className="hidden  bg-color-primary  px-4 py-2 rounded md:flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-white transition-colors">
              Member Login <CiLock className="text-xl font-semibold" />
            </button>
          )
        }

      </nav>

      {/* HERO SECTION */}
      <div className="relative z-10 pt-20 pb-32 px-4 text-center max-w-6xl mx-auto">
        <div className="inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            Waitlist Access Only
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white font-serif leading-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 drop-shadow-2xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 animate-pulse-slow">Unfair Advantage</span> <br />
          in Capital Acquisition.
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          Stop guessing. Start funding. Our AI Underwriter analyzes your profile like a bank, constructs your legal disputes like an attorney, and preps you for funding interviews.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in zoom-in duration-1000 delay-300">
          <button
            onClick={onEnterApp}
            className="group relative px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10">Start Your Analysis</span>
          </button>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-900"></div>
              <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-900"></div>
              <div className="w-8 h-8 rounded-full bg-slate-500 border border-slate-900"></div>
            </div>
            <span>2,400+ Members Funded</span>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS - PARALLAX FEEL */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="glass-panel p-8 rounded-2xl hover:-translate-y-4 transition-transform duration-500 border-t-2 border-t-emerald-500/50 group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-serif">AI Underwriter</h3>
            <p className="text-slate-400 leading-relaxed">
              Don't apply blindly. Our engine simulates a Tier 1 Bank Underwriting review to calculate your exact approval odds before you trigger a hard inquiry.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 rounded-2xl hover:-translate-y-4 transition-transform duration-500 delay-100 border-t-2 border-t-cyan-500/50 group">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-serif">Legal Dispute Engine</h3>
            <p className="text-slate-400 leading-relaxed">
              We don't use templates. We generate unique legal affidavits citing 15 U.S.C. 1681i and Metro 2 compliance failures to force manual deletions.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 rounded-2xl hover:-translate-y-4 transition-transform duration-500 delay-200 border-t-2 border-t-purple-500/50 group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 font-serif">Voice Coach</h3>
            <p className="text-slate-400 leading-relaxed">
              Practice your funding interview with a real-time AI Agent trained on transcripts from Chase, Amex, and SBA loan officers.
            </p>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="relative z-10 py-10 px-4 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">
            Real Results. <span className="text-emerald-400">Real Capital.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join 2,400+ members who have successfully navigated the underwriting process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-emerald-500/50 object-cover" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-black font-bold" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <span className="text-xs text-slate-500">{t.role}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Funded</span>
                <div className="text-2xl font-serif font-bold text-white">{t.funded}</div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed italic flex-1">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING SECTION */}
      <div className="relative z-10 py-20 bg-black/40 border-t border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white font-serif mb-4">
              Choose Your Leverage.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Whether you need tools to execute yourself or expert guidance to guarantee the result.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">

            {/* STANDARD PACKAGE */}
            <div className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-b from-slate-700 to-slate-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0f1016] border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col h-full">
                <div className="uppercase tracking-widest text-xs font-bold text-slate-400 mb-4 bg-slate-800/50 inline-block px-3 py-1 rounded w-max">Self-Directed</div>
                <h3 className="text-3xl font-bold text-white font-serif mb-2">RevolV Pro Underwriter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-slate-500 font-medium text-sm">initiation</span>
                  <span className="text-slate-500 font-medium text-sm ml-1">+ $17/mo</span>
                </div>

                <div className="w-full h-px bg-slate-800 mb-6"></div>

                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "Unlimited AI Underwriter Scans",
                    "Metro 2 Dispute Generator",
                    "Breach Detection System",
                    "24/7 AI Voice Coach Access",
                    "Full Resource Library"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onEnterApp}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all border border-slate-700 hover:border-slate-600"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* PREMIUM PACKAGE */}
            <div className="relative group h-full transform lg:-translate-y-4">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-400 via-cyan-500 to-purple-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000 animate-pulse-slow"></div>
              <div className="relative bg-[#0b0c15] border border-emerald-500/30 rounded-xl p-8 shadow-2xl flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="uppercase tracking-widest text-xs font-bold text-emerald-950 bg-emerald-400 px-3 py-1 rounded shadow-[0_0_15px_rgba(52,211,153,0.5)]">Most Popular</div>
                </div>

                <h3 className="text-3xl font-bold text-white font-serif mb-2">Funding Coach Underwriter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold text-white">$299</span>
                  <span className="text-slate-400 font-medium text-sm">one-time</span>
                </div>

                <p className="text-sm text-slate-400 mb-6 font-light">
                  Full "Done-With-You" implementation. We verify your file is 100% compliant before you apply.
                </p>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-6"></div>

                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-white font-bold text-sm">
                    <span className="bg-emerald-500/20 text-emerald-400 p-1 rounded">ALL</span>
                    <span>Includes RevolV Pro Features</span>
                  </li>
                  {[
                    "Step-by-Step Underwriting Prep",
                    "Business Structure Compliance Audit",
                    "Personal File Structuring for Funding",
                    "Secret Funding Strategy Playbook"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                  {/* BONUS ITEMS */}
                  <li className="flex items-start gap-3 text-white p-3 bg-white/5 rounded border border-emerald-500/20">
                    <span className="text-yellow-400 text-lg">★</span>
                    <div className="text-sm">
                      <strong className="block text-emerald-400">FREE: 6-Month 6-Figure Guarantee</strong>
                      <span className="text-slate-400 text-xs">We work with you until you hit 6-figures in funding.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-white p-3 bg-white/5 rounded border border-emerald-500/20">
                    <span className="text-yellow-400 text-lg">★</span>
                    <div className="text-sm">
                      <strong className="block text-emerald-400">FREE: 1-Hour 1-on-1 Coaching</strong>
                      <span className="text-slate-400 text-xs">Deep dive strategy session with a Funding Expert.</span>
                    </div>
                  </li>
                </ul>

                <button
                  onClick={buySubscription}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:scale-[1.02]"
                >
                  Secure Coach Package
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-12 text-center text-slate-600 text-sm relative z-10 border-t border-white/5 bg-[#0b0c15]">
        <p>&copy; {new Date().getFullYear()} RevolV Financial Intelligence. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <button className="hover:text-slate-400 transition">Terms of Service</button>
          <button className="hover:text-slate-400 transition">Privacy Policy</button>
          <button className="hover:text-slate-400 transition">Earnings Disclaimer</button>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
