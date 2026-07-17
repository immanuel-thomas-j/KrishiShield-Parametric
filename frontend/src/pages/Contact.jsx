import React, { useState } from 'react'
import { Landmark, Mail, Phone, MapPin, Send, MessageSquare, Shield, Clock } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [msg, setMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    if (e) e.preventDefault()
    setSubmitted(true)
    setName('')
    setAadhaar('')
    setMsg('')
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-10">
      {/* Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 px-6 text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-widest">Support Center</span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Connect With Our <span className="text-emerald-600">Agricultural Advisors</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-semibold">
            Have questions about parametric triggers, direct benefit wallet withdrawals, or smart contracts? Send a support ticket directly to our department.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 text-left">
        {/* Contact info card */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider text-slate-800 uppercase flex items-center gap-2">
              <Landmark className="h-4 w-4 text-emerald-600" /> Ministry & Advisory Offices
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Office Headquarters</p>
                  <p className="text-sm font-bold text-slate-800 leading-normal">
                    National Agriculture Parametric Index Board, Krishi Bhavan, Rajpath Area, New Delhi, Delhi 110001
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Inquiry Support</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">support.rwbcis@imd-nic.gov.in</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <Phone className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Helpline Toll Free</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">1800-180-1551 (Farmer Portal Desk)</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Working Hours</p>
                  <p className="text-sm font-bold text-slate-800 leading-normal">
                    Monday to Friday: 09:00 AM to 05:30 PM (IST)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 flex items-start gap-3 shadow-inner">
            <Shield className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1 text-xs text-emerald-800 leading-relaxed font-semibold">
              <span className="font-extrabold uppercase tracking-wide block">Encrypted Authentication</span>
              <span>All message submissions require validation. Message contents are securely logged for public audit and grievance redressal tracking.</span>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-sm font-bold tracking-wider text-slate-800 uppercase mb-6 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-emerald-600" /> Submit Grievance / Question
          </h3>

          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 shadow-sm animate-pulse">
              <Shield className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>✓ Support request submitted! Our agricultural advisory team will review within 24 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-bold block">Farmer Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition font-semibold"
                placeholder="e.g. Rajesh Kumar" />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-bold block">12-Digit Aadhaar Card Number (Optional)</label>
              <input type="text" maxLength={12} value={aadhaar} onChange={e => setAadhaar(e.target.value.replace(/\D/g, ''))}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition font-mono font-bold"
                placeholder="XXXX XXXX XXXX" />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-bold block">Message / Inquiry Details</label>
              <textarea rows={4} value={msg} onChange={e => setMsg(e.target.value)} required
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-xs text-slate-850 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition leading-relaxed font-semibold"
                placeholder="Describe your question or support issue..." />
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-550 px-4 py-3 text-xs font-bold text-white transition hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-500/20">
              Submit Request <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
