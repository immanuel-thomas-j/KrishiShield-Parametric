import { useState } from 'react'
import { Shield, Globe, Link2, Compass, Mail, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [legalTab, setLegalTab] = useState(null)

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 text-left">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                <Shield className="h-4.5 w-4.5 text-emerald-600" />
              </div>
              <span className="text-base font-bold text-slate-900">KrishiShield</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              India's first AI-powered parametric crop insurance settlement engine. Zero-touch claims. Government-integrated. Blockchain-verified.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { Icon: Globe, href: 'https://data.gov.in' },
                { Icon: Link2, href: 'https://pmfby.gov.in' },
                { Icon: Compass, href: 'https://mausam.imd.gov.in' },
                { Icon: Mail, href: 'mailto:support.rwbcis@imd-nic.gov.in' }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-600 transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="text-left">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[['Portal Dashboard', '/dashboard'], ['Risk Engine', '/dashboard'], ['Scheme Matching', '/dashboard'], ['API Access', '/dashboard']].map(([label, to]) => (
                <li key={label}><Link to={to} className="text-sm text-slate-500 hover:text-emerald-600 transition">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Government */}
          <div className="text-left">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Government</h4>
            <ul className="space-y-2.5">
              {[['PMFBY', 'https://pmfby.gov.in'], ['PM-KISAN', 'https://pmkisan.gov.in'], ['PMKSY', 'https://pmksy.gov.in'], ['IMD', 'https://mausam.imd.gov.in']].map(([label, href]) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-emerald-600 transition">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="text-left">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Documentation', href: '/about' },
                { label: 'API Reference', href: '/dashboard' },
                { label: 'Research Papers', href: 'https://pmfby.gov.in/pdf/Revised_Operational_Guidelines_RWBCIS.pdf' },
                { label: 'Open Source', href: 'https://leafletjs.com' }
              ].map(item => (
                <li key={item.label}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} className="text-sm text-slate-500 hover:text-emerald-655 transition">{item.label}</Link>
                  ) : (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-emerald-655 transition">{item.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-405 font-semibold">&copy; 2026 KrishiShield Parametric. Built for India's farmers.</p>
          <div className="flex items-center gap-4 text-xs text-slate-450 font-semibold">
            <button onClick={() => setLegalTab('privacy')} className="hover:text-slate-650 transition focus:outline-none">Privacy</button>
            <button onClick={() => setLegalTab('terms')} className="hover:text-slate-650 transition focus:outline-none">Terms</button>
            <button onClick={() => setLegalTab('policy')} className="hover:text-slate-650 transition focus:outline-none">Data Policy</button>
          </div>
        </div>
      </div>

      {/* LEGAL MODAL */}
      {legalTab && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 no-print">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl text-left relative animate-[slideIn_0.25s_ease] font-sans font-semibold">
            <button onClick={() => setLegalTab(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-650 p-1.5 rounded-lg hover:bg-slate-100 transition">
              <X className="h-4 w-4" />
            </button>
            
            {legalTab === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-605 shrink-0" /> Privacy Policy (DPDP Compliant)
                </h3>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-[300px] overflow-y-auto pr-1">
                  <p className="font-bold text-slate-700">KrishiShield takes data privacy seriously. Our operations conform to India's Digital Personal Data Protection (DPDP) Act:</p>
                  <p><strong className="text-slate-800">1. Data Encryption:</strong> All landholder credentials, phone numbers, and 12-digit Aadhaar credentials are encrypted prior to database storage.</p>
                  <p><strong className="text-slate-800">2. Geo-Coordinate Logs:</strong> GPS coordinates pinned on Leaflet maps are used solely for weather indices (IMD/NASA POWER grids) and are never shared.</p>
                  <p><strong className="text-slate-800">3. Consent & Erasure:</strong> Farmers retain the absolute right to delete their profile session, which wipes cached local state database logs instantly.</p>
                </div>
              </div>
            )}

            {legalTab === 'terms' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-605 shrink-0" /> Terms of Parametric Service
                </h3>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-[300px] overflow-y-auto pr-1">
                  <p className="font-bold text-slate-700">By enrolling in KrishiShield's weather-index policies, you agree to these operational rules:</p>
                  <p><strong className="text-slate-800">1. Trigger Thresholds:</strong> Claim payouts are automated based on objective weather parameters (e.g. &gt;40% monsoon deficit) verified by decentralized Chainlink weather station oracles.</p>
                  <p><strong className="text-slate-800">2. Zero-Touch Claims:</strong> Settlement disbursements are processed through Aadhaar-Enabled Payments (DBT) directly into the registered bank account. No manual claim sheets are required.</p>
                  <p><strong className="text-slate-800">3. Underwriting Rules:</strong> Premium rates correspond to PMFBY standards (2% Kharif, 1.5% Rabi). Sowing shift sensitivities are assessed dynamically on policy activation.</p>
                </div>
              </div>
            )}

            {legalTab === 'policy' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-605 shrink-0" /> Weather Data & Ingestion Policy
                </h3>
                <div className="text-xs text-slate-600 space-y-3 leading-relaxed max-h-[300px] overflow-y-auto pr-1">
                  <p className="font-bold text-slate-700">Our weather ingestion layer is calibrated under official meteorological criteria:</p>
                  <p><strong className="text-slate-800">1. Data Sources:</strong> We fetch historical and forecasted rainfall/temperature indicators from the India Meteorological Department (IMD), Open-Meteo, and NASA POWER grids.</p>
                  <p><strong className="text-slate-800">2. Reliability Fallback:</strong> If governmental weather data nodes encounter downtime or rate limits, the engine triggers satellite fallback logic (Open-Meteo REST endpoint) to maintain coverage uptime.</p>
                  <p><strong className="text-slate-800">3. Micro-Climate Offsets:</strong> Geocoded coordinates pinned by the farmer include a calculated satellite offset badge factor (e.g. +6% district variance) to adjust local water stress anomaly scores.</p>
                </div>
              </div>
            )}
            
            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button onClick={() => setLegalTab(null)} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-555 text-xs font-bold text-white shadow-md transition active:scale-95 hover:scale-102">
                Acknowledge Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
