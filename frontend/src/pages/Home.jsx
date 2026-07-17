import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield, ArrowRight, Zap, Globe, Sprout, Landmark, Cpu, CheckCircle,
  Database, UserCheck, TrendingUp, HelpCircle, ChevronDown, Award, RefreshCw, BarChart2,
  AlertTriangle, XCircle, Info, TrendingDown, Thermometer, Droplets, Clock
} from 'lucide-react'

const RiceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-amber-600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20c4-1.5 8-1.5 12 0" />
    <path d="M7 18c.5-2 1.5-4.5 3-6.5C11.5 9.5 13 8 15 7" />
    <path d="M12 13c1.5-1 3.5-1.5 5-1.5s2.5.5 3.5 1.5" />
    <path d="M14 9.5c1.5-1.5 3.5-2 5.5-2s3 .5 4 1.5" />
    <path d="M9.5 15.5c1.5-1 3-2 4-3.5" />
  </svg>
)

const WheatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-yellow-600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22c1.5-3.5 4.5-6.5 8-8" />
    <path d="M11.5 14.5c.5-1 1.5-2.5 3-3.5 1.5-1 3.5-1.5 5.5-1" />
    <path d="M14.5 11.5c.5-1 1.5-2.5 3-3.5 1.5-1 3.5-1.5 5.5-1" />
    <path d="M9.5 16.5c.5-1 1.5-2.5 3-3.5" />
    <path d="M17.5 8.5c.5-1 1.5-2.5 3-3.5" />
  </svg>
)

const CottonIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-slate-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 9a3 3 0 0 0-3-3 3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5Z" />
    <path d="M12 15a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-2-3-5-3-5s-3 3-3 5Z" />
    <path d="M15 12a3 3 0 0 0 3-3 3 3 0 0 0-3-3c-2 0-5 3-5 3s3 3 5 3Z" />
    <path d="M9 12a3 3 0 0 0-3 3 3 3 0 0 0 3 3c2 0 5-3 5-3s-3-3-5-3Z" />
  </svg>
)

const SugarcaneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-emerald-600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22V2M16 22V2M8 7h8M8 13h8M8 18h8" />
  </svg>
)

const MaizeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-yellow-500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-3.3 0-6 3.6-6 8s2.7 10 6 10 6-5.6 6-10-2.7-8-6-8z" />
    <path d="M12 2v18" />
    <path d="M9 6h6M8 10h8M9 14h6" />
  </svg>
)

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [simDeficit, setSimDeficit] = useState(30)

  const stats = [
    { value: '1.4 Cr+', label: 'PMFBY Farmers Protected', sub: 'National annual average' },
    { value: '₹1.5L Cr+', label: 'Claims Paid Nationally', sub: 'Cumulative PMFBY disbursements' },
    { value: '2.8 Cr Ha', label: 'Covered Farmland Cover', sub: 'Active seasonal land records' },
    { value: '10,000+', label: 'Govt Weather Stations', sub: 'IMD AWS sensor grid network' }
  ]

  const integrations = [
    { name: 'Ministry of Agriculture', role: 'PMFBY Guidelines Integration', icon: Landmark, color: 'text-amber-600' },
    { name: 'IMD', role: 'Real-time Weather Station Feeds', icon: Database, color: 'text-blue-600' },
    { name: 'ISRO Bhuvan', role: 'NDVI Vegetation Index Satellites', icon: Globe, color: 'text-emerald-600' },
    { name: 'Indian Bank Core', role: 'Direct Benefit Transfer (DBT) Escrow Gateway', icon: Landmark, color: 'text-amber-600' }
  ]

  const crops = [
    { name: 'Rice (Dhan)', season: 'Kharif', water: 'High', area: 'UP, Punjab, TN, WB', icon: RiceIcon },
    { name: 'Wheat (Gehun)', season: 'Rabi', water: 'Medium', area: 'Haryana, Punjab, MP', icon: WheatIcon },
    { name: 'Cotton (Kapas)', season: 'Kharif', water: 'Medium', area: 'Gujarat, Maharashtra', icon: CottonIcon },
    { name: 'Sugarcane (Ganna)', season: 'Annual', water: 'Very High', area: 'UP, Maharashtra, Karnataka', icon: SugarcaneIcon },
    { name: 'Maize (Makka)', season: 'Kharif', water: 'Medium', area: 'Karnataka, Bihar, MP', icon: MaizeIcon }
  ]

  const faqs = [
    {
      q: 'What is Parametric Crop Insurance?',
      a: 'Unlike traditional insurance which requires months of manual inspections and yield surveys, parametric insurance triggers payouts automatically based on objective weather parameters (e.g., rainfall deficit, temperature extremes) measured by verified satellite and meteorological data.'
    },
    {
      q: 'Do I need to submit a claim form after a drought or crop loss?',
      a: 'No! The KrishiShield smart contract automatically monitors satellite and weather data. If the rainfall deficit in your area crosses the critical threshold (e.g., 40% deficit), the claim is automatically triggered, verified by decentralized oracles, and direct-transferred to your Aadhaar-linked bank account within minutes.'
    },
    {
      q: 'How does the Aadhaar-seeded DBT system work?',
      a: 'We integrate with the National Payments Corporation of India (NPCI) Aadhaar-Enabled Payment System (AePS). When a parametric claim is triggered, it triggers a Direct Benefit Transfer (DBT) payout processed by Indian Bank directly to the bank account linked with your Aadhaar, avoiding any middle-men or delays.'
    },
    {
      q: 'Is this scheme approved by the Government of India?',
      a: 'KrishiShield operates in alignment with the Pradhan Mantri Fasal Bima Yojana (PMFBY) guidelines for weather-based crop insurance (RWBCIS), utilizing authenticated weather feeds from the India Meteorological Department (IMD).'
    }
  ]

  // Payout % logic
  const triggerVal = 40
  const maxVal = 60
  let payoutPct = 0
  if (simDeficit >= triggerVal) {
    payoutPct = Math.min(100, Math.round(((simDeficit - triggerVal) / (maxVal - triggerVal)) * 100))
  }

  // Current Position X coordinate for marker
  const markerX = 10 + (simDeficit - 10) * 1.14
  const markerY = simDeficit < 40 ? 70 : simDeficit > 60 ? 10 : 70 - (simDeficit - 40) * 3

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden font-sans">
      {/* Decorative Gradients for Light Theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-750 text-xs font-black shadow-sm">
              <Zap className="h-3.5 w-3.5 text-emerald-600 animate-pulse" /> Next-Gen Parametric Crop Shield
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Securing Indian <br />
              <span className="bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
                Farms with On-Chain Trust
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-semibold">
              Monsoon volatility and delayed insurance payouts shouldn't ruin your livelihood. KrishiShield integrates directly with IMD weather feeds, ISRO satellite grids, and Aadhaar DBT gateways for 100% automated weather-index claims.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link to="/dashboard"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-base font-bold text-white transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 hover:-translate-y-0.5">
                Launch Portal <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#problem-statement"
                className="flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-bold text-slate-700 hover:text-slate-900 shadow-sm transition">
                Understand The Problem
              </a>
            </div>

            {/* Aligned logos / Badges */}
            <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center gap-6">
              <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Aligned with Indian Initiatives:</span>
              <div className="flex flex-wrap gap-4 text-xs font-black text-slate-600">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Landmark className="h-3.5 w-3.5 text-amber-600" /> Digital India</span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Sprout className="h-3.5 w-3.5 text-emerald-600" /> PMFBY Guidelines</span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"><Award className="h-3.5 w-3.5 text-blue-600" /> Aadhaar DBT</span>
              </div>
            </div>
          </div>

          {/* Hero Right — Interactive Claim Sandbox with dynamic SVG Payout Curve */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase flex items-center gap-1.5">
                  <Cpu className="h-4 w-4 text-emerald-600" /> Smart Contract Sandbox
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200/50 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" /> ORACLE ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-505 font-bold">Simulate Monsoon Rainfall Deficit</span>
                    <span className={`font-black ${simDeficit >= 40 ? 'text-red-600 font-extrabold' : 'text-emerald-700'}`}>{simDeficit}% Deficit</span>
                  </div>
                  <input type="range" min="10" max="80" value={simDeficit} onChange={e => setSimDeficit(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-bold">
                    <span>10% (Normal)</span>
                    <span className="text-red-500 font-bold">40% Trigger Level</span>
                    <span>80% (Extreme)</span>
                  </div>
                </div>

                {/* Dynamic SVG Payout Curve Chart */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Parametric Payout Contract Curve</span>
                  <svg className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-2" viewBox="0 0 100 80">
                    {/* Horizontal Gridlines */}
                    <line x1="10" y1="10" x2="90" y2="10" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="20" x2="90" y2="20" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="30" x2="90" y2="30" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="40" x2="90" y2="40" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="60" x2="90" y2="60" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="10" y1="70" x2="90" y2="70" stroke="#cbd5e1" strokeWidth="0.8" />
                    
                    {/* Vertical Gridlines */}
                    <line x1="10" y1="10" x2="10" y2="70" stroke="#cbd5e1" strokeWidth="0.8" />
                    <line x1="20" y1="10" x2="20" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="30" y1="10" x2="30" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="40" y1="10" x2="40" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="50" y1="10" x2="50" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="60" y1="10" x2="60" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="70" y1="10" x2="70" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="80" y1="10" x2="80" y2="70" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="1 3" />
                    <line x1="90" y1="10" x2="90" y2="70" stroke="#cbd5e1" strokeWidth="0.8" />
                    
                    {/* Trigger lines */}
                    <line x1="48.5" y1="10" x2="48.5" y2="70" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
                    <line x1="71.4" y1="10" x2="71.4" y2="70" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2 2" />
                    
                    {/* Payout curve path */}
                    <path d="M 10 70 L 48.5 70 L 71.4 10 L 90 10" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Position Marker */}
                    <line x1={markerX} y1="10" x2={markerX} y2="70" stroke="#ef4444" strokeWidth="1.2" />
                    <circle cx={markerX} cy={markerY} r="4" fill="#ef4444" />
                    
                    {/* Text Labels */}
                    <text x="48.5" y="78" fontSize="4.5" fill="#f59e0b" textAnchor="middle" fontWeight="bold">40% Trigger</text>
                    <text x="71.4" y="78" fontSize="4.5" fill="#10b981" textAnchor="middle" fontWeight="bold">60% Max</text>
                  </svg>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2.5 font-sans text-xs font-semibold">
                  <div className="flex justify-between">
                    <span className="text-slate-505 font-bold">Escrow Address:</span>
                    <span className="text-emerald-600 font-mono font-bold">0x9F82...4Db8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Smart Contract State:</span>
                    {simDeficit >= 40 ? (
                      <span className="text-red-655 font-black animate-pulse flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" /> TRIGGERED ({payoutPct}% Payout)
                      </span>
                    ) : (
                      <span className="text-emerald-650 font-black flex items-center gap-1">
                        <Shield className="h-4 w-4 text-emerald-600 shrink-0" /> ACTIVE COVERAGE
                      </span>
                    )}
                  </div>
                </div>

                {simDeficit >= 40 ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 animate-[slideIn_0.3s_ease] font-sans font-semibold">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                      <CheckCircle className="h-4 w-4 text-emerald-600" /> Payout Disbursed!
                    </div>
                    <p className="text-emerald-805/90 text-[11px] leading-relaxed">
                      Breached trigger limit. Direct Benefit Transfer (DBT) payout of <span className="font-black text-slate-900">₹{(45000 * payoutPct / 100).toLocaleString('en-IN')}</span> ({payoutPct}% of Sum Insured) routed to farmer Aadhaar UPI wallet.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs text-slate-500 font-sans font-medium">
                    <p className="text-[11px] leading-relaxed">
                      Drag the slider above 40% to simulate a weather breach. The parametric escrow will automatically disburse payment values based on contract rules.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white border-y border-slate-200 py-12 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-sm font-bold text-slate-900">{stat.label}</p>
              <p className="text-xs text-slate-500 font-semibold">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM STATEMENT SECTION */}
      <section id="problem-statement" className="py-20 px-6 max-w-7xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">The Problem & The Crisis</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Crop Insurance in India is Broken</h2>
          <p className="text-slate-605 text-sm sm:text-base font-semibold">
            Monsoon variations threaten over 14 crore Indian farming families, yet traditional insurance mechanisms fail them when they need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 font-sans">
          {[
            { title: 'Extreme Delayed Payouts', desc: 'When crops fail, farmers wait 6 to 12 months for inspectors to manually assess fields. This delay drives farmers to informal moneylenders with high interest rates.', icon: Clock, color: 'text-red-500' },
            { title: 'Subjective Manual Inspections', desc: 'Manual Crop Cutting Experiments (CCEs) are prone to disputes, human errors, and administrative corruption. Farmers are often undercompensated or denied claim settlement.', icon: XCircle, color: 'text-amber-500' },
            { title: 'High Administrative Overhead', desc: 'Managing millions of individual micro-farms manually costs insurance companies billions, making premiums expensive without massive government subsidies.', icon: AlertTriangle, color: 'text-orange-500' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 hover:border-slate-350 shadow-sm transition">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-505 leading-relaxed font-semibold">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* COMPARISON CHART */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Traditional Insurance vs. KrishiShield Parametric</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                  <th className="py-3 px-4 w-1/3">Feature</th>
                  <th className="py-3 px-4 w-1/3 text-red-500">Traditional Crop Insurance (Yield-based)</th>
                  <th className="py-3 px-4 w-1/3 text-emerald-600">KrishiShield Parametric (Weather-index)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                <tr>
                  <td className="py-4 px-4 font-bold">Loss Inspection Method</td>
                  <td className="py-4 px-4 flex items-start gap-2 text-red-750"><XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" /> Manual physical survey / Crop Cutting Experiments</td>
                  <td className="py-4 px-4"><span className="flex items-start gap-2 text-emerald-750"><CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> Automated weather index (IMD Station & Satellite)</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Claim Settlement Speed</td>
                  <td className="py-4 px-4 flex items-start gap-2 text-red-750"><XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" /> 6 to 12 Months (Post harvest reports)</td>
                  <td className="py-4 px-4"><span className="flex items-start gap-2 text-emerald-750"><CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> Under 5 Minutes (Zero-touch automated transfer)</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Direct Benefit Transfer (DBT)</td>
                  <td className="py-4 px-4 flex items-start gap-2 text-red-750"><XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" /> Manual banks approvals / paper verification checks</td>
                  <td className="py-4 px-4"><span className="flex items-start gap-2 text-emerald-750"><CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> On-chain Smart Contract triggering Aadhaar UPI payment</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold">Verification Transparency</td>
                  <td className="py-4 px-4 flex items-start gap-2 text-red-750"><XCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" /> Opaque local administration and manual calculations</td>
                  <td className="py-4 px-4"><span className="flex items-start gap-2 text-emerald-750"><CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" /> Decentrally signed weather station oracles (Chainlink)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CORE INTEGRATION PARTNERS GRID */}
      <section className="bg-slate-100 border-t border-slate-200 py-16 px-6 text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl font-extrabold text-slate-900">Empowered by Open Infrastructure</h3>
            <p className="text-sm text-slate-500 font-semibold">Decentralized weather networks and public government channels integrated for zero-friction verification.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 hover:border-slate-350 shadow-sm transition">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200">
                    <Icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{item.role}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RISK SCORING FORMULA SECTION */}
      <section className="relative bg-[#080d14] py-24 px-6 overflow-hidden">
        {/* Background grid decoration */}
        <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Actuarial Intelligence Engine
            </span>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">How the Risk Score is Calculated</h3>
            <p className="text-sm text-slate-500 font-semibold mt-3 max-w-lg mx-auto leading-relaxed">A transparent, deterministic formula — not a black box. Every variable is explainable and auditable by the Block Officer.</p>
          </div>

          {/* Master Formula */}
          <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-6 mb-10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
            <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black mb-4 text-center">Master Actuarial Formula</p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-mono text-xs font-bold">
              <span className="text-white bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700">Score</span>
              <span className="text-slate-600 text-base">=</span>
              <span className="text-red-400 bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-900/40">ENSO <span className="text-red-600 font-normal">(+15)</span></span>
              <span className="text-slate-600">+</span>
              <span className="text-amber-400 bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-900/40">SowingShift</span>
              <span className="text-slate-600">+</span>
              <span className="text-emerald-400 bg-emerald-950/40 px-2.5 py-1.5 rounded-lg border border-emerald-900/40"><span className="text-yellow-400">Σ</span> Deficit<span className="text-slate-500 text-[9px] align-sub">&gt;30%</span> × Weight</span>
              <span className="text-slate-600">+</span>
              <span className="text-blue-400 bg-blue-950/40 px-2.5 py-1.5 rounded-lg border border-blue-900/40">SoilRisk</span>
              <span className="text-slate-600">+</span>
              <span className="text-orange-400 bg-orange-950/40 px-2.5 py-1.5 rounded-lg border border-orange-900/40">LiveWeather</span>
            </div>
            <p className="text-center text-[10px] text-slate-600 font-semibold mt-4">Clamped 5–100 &nbsp;·&nbsp; Parametric trigger fires when Score &gt; 60 or any monthly deficit &gt; 42%</p>
          </div>

          {/* Component Cards — 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

            {/* 1. ENSO */}
            <div className="group rounded-2xl border border-red-900/30 hover:border-red-700/50 bg-gradient-to-br from-slate-900 to-red-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-red-900/50 border border-red-800/40 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">El Niño / ENSO State</p>
                  <span className="text-[9px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-900/40 mt-0.5 inline-block">Fixed +15 pts</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Active ENSO weakens India's South-West monsoon. Every assessment starts with a baseline drought risk of <span className="text-red-400 font-bold">+15 points</span>.</p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-red-500/70 rounded-full" style={{width:'15%'}} />
              </div>
              <div className="flex justify-between text-[9px] text-slate-600 font-bold mt-1"><span>0</span><span className="text-red-400">15%</span><span>100</span></div>
            </div>

            {/* 2. Sowing Shift */}
            <div className="group rounded-2xl border border-amber-900/30 hover:border-amber-700/50 bg-gradient-to-br from-slate-900 to-amber-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-amber-900/50 border border-amber-800/40 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">Sowing Date Sensitivity</p>
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-900/40 mt-0.5 inline-block">±8–10% / week</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[10px] font-semibold">
                <div className="flex items-center gap-2 text-emerald-400"><span className="font-mono bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-900/40">Delay +1w</span><span className="text-slate-500">→ Risk</span><span className="font-black">−8 pts</span></div>
                <div className="flex items-center gap-2 text-red-400"><span className="font-mono bg-red-950/50 px-1.5 py-0.5 rounded border border-red-900/40">Early  −1w</span><span className="text-slate-500">→ Risk</span><span className="font-black">+10 pts</span></div>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-3">Aligns flowering phase with peak late-monsoon rainfall windows. Biggest lever a farmer controls.</p>
            </div>

            {/* 3. Stage-Weighted Deficit */}
            <div className="group rounded-2xl border border-emerald-900/30 hover:border-emerald-700/50 bg-gradient-to-br from-slate-900 to-emerald-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-emerald-900/50 border border-emerald-800/40 flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">Stage-Weighted Deficit</p>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-900/40 mt-0.5 inline-block">Core Formula</span>
                </div>
              </div>
              <div className="font-mono text-[10px] text-emerald-400 bg-black/40 rounded-xl p-3 border border-emerald-900/30 leading-loose">
                <span className="text-slate-600">// per growth month</span><br/>
                Δ = (Hist − Forecast) / Hist × 100<br/>
                <span className="text-slate-600">if</span> Δ &gt; 30:<br/>
                &nbsp;&nbsp;Score += 15 × StageWeight
              </div>
            </div>

            {/* 4. Stage Weights */}
            <div className="group rounded-2xl border border-violet-900/30 hover:border-violet-700/50 bg-gradient-to-br from-slate-900 to-violet-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-violet-900/50 border border-violet-800/40 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">Physiological Stage Weights</p>
                  <span className="text-[9px] font-bold text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded-full border border-violet-900/40 mt-0.5 inline-block">Growth Multipliers</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {[['Flowering','2.0×',100,'text-red-400','bg-red-500'],['Grain Fill','1.5×',75,'text-orange-400','bg-orange-500'],['Tillering','1.2×',60,'text-amber-400','bg-amber-500'],['Sowing','0.8×',40,'text-emerald-400','bg-emerald-500'],['Ripening','0.8×',40,'text-blue-400','bg-blue-500']].map(([s,w,pct,c,bg])=>(
                  <div key={s}>
                    <div className="flex justify-between text-[10px] mb-1"><span className={`font-semibold text-slate-400`}>{s}</span><span className={`font-black font-mono ${c}`}>{w}</span></div>
                    <div className="h-1 w-full rounded-full bg-slate-800"><div className={`h-full rounded-full ${bg}/60`} style={{width:`${pct}%`}}/></div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Soil + Water Need */}
            <div className="group rounded-2xl border border-blue-900/30 hover:border-blue-700/50 bg-gradient-to-br from-slate-900 to-blue-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-blue-900/50 border border-blue-800/40 flex items-center justify-center">
                  <Droplets className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">Crop Water Need + Soil Type</p>
                  <span className="text-[9px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-900/40 mt-0.5 inline-block">+0 to +13 pts</span>
                </div>
              </div>
              <div className="space-y-2 text-[10px]">
                {[['High/Very High water crop','text-red-400','+5'],['Red Laterite (20% retention)','text-red-400','+8'],['Black Cotton soil','text-amber-400','+3'],['Alluvial / Loamy soil','text-emerald-400','+0–2']].map(([label,c,val])=>(
                  <div key={label} className="flex justify-between items-center border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-500 font-semibold">{label}</span>
                    <span className={`font-black font-mono ${c} shrink-0 ml-2`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Live Weather */}
            <div className="group rounded-2xl border border-orange-900/30 hover:border-orange-700/50 bg-gradient-to-br from-slate-900 to-orange-950/20 p-5 transition-all hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-orange-900/50 border border-orange-800/40 flex items-center justify-center">
                  <Thermometer className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">Live Weather Telemetry</p>
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-950/60 px-2 py-0.5 rounded-full border border-orange-900/40 mt-0.5 inline-block">Open-Meteo API</span>
                </div>
              </div>
              <div className="space-y-2 text-[10px]">
                {[['Temp > crop max tolerance','text-red-400','+15'],['Relative humidity < 45%','text-orange-400','+10'],['Wind speed > 22 km/h (lodging)','text-amber-400','+8']].map(([label,c,val])=>(
                  <div key={label} className="flex justify-between items-center border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-500 font-semibold">{label}</span>
                    <span className={`font-black font-mono ${c} shrink-0 ml-2`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Verdict Bar */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black mb-5 text-center">Parametric Trigger Thresholds</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="relative rounded-xl bg-emerald-950/40 border border-emerald-800/30 p-4 text-center overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <p className="text-2xl font-black text-emerald-400 font-mono">&lt; 40</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-widest">Safe Zone</p>
                <p className="text-[11px] text-emerald-500/80 font-semibold mt-2">No insurance urgently needed. Monitor seasonally.</p>
              </div>
              <div className="relative rounded-xl bg-amber-950/40 border border-amber-800/30 p-4 text-center overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <p className="text-2xl font-black text-amber-400 font-mono">40 – 65</p>
                <p className="text-[10px] text-amber-600 font-bold mt-1 uppercase tracking-widest">Moderate Risk</p>
                <p className="text-[11px] text-amber-500/80 font-semibold mt-2">Strongly consider enrolling in PMFBY coverage.</p>
              </div>
              <div className="relative rounded-xl bg-red-950/40 border border-red-800/30 p-4 text-center overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                <p className="text-2xl font-black text-red-400 font-mono">&gt; 65</p>
                <p className="text-[10px] text-red-600 font-bold mt-1 uppercase tracking-widest">Critical — DBT Live</p>
                <p className="text-[11px] text-red-500/80 font-semibold mt-2">Parametric trigger fires. Payout queued for BAO sign-off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-left">
        <div className="text-center space-y-3 mb-12">
          <h3 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          <p className="text-sm text-slate-550 font-semibold">Everything you need to know about parametric weather contracts and Aadhaar payment seedings.</p>
        </div>
        <div className="space-y-4 font-sans font-semibold">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm">
              <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition text-sm">
                <span>{faq.q}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-550 border-t border-slate-100 bg-slate-50/50 leading-relaxed font-semibold">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
