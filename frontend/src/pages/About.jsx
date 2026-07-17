import React from 'react'
import { Shield, Brain, Cpu, Globe, Award, HelpCircle, ArrowRight, Sprout, Landmark, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-10">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-20 px-6 text-center">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-widest">About Our Protocol</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Decentralized Parametric Climate Risk Mitigation for <span className="text-emerald-600">Indian Agriculture</span>
          </h1>
          <p className="text-base text-slate-550 max-w-2xl mx-auto leading-relaxed">
            KrishiShield is a next-generation SaaS crop insurance advisory and zero-touch direct payout settlement platform built for Pradhan Mantri Fasal Bima Yojana (PMFBY) RWBCIS schemes.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Brain,
            title: 'AI Crop Underwriting',
            desc: 'Powered by Groq LLaMA 3.3 agricultural intelligence to analyze multi-spectral crop vulnerabilities, soil diagnostic chemistry, and historic climate patterns.',
            color: 'text-violet-650 bg-violet-50 border-violet-100'
          },
          {
            icon: Cpu,
            title: 'On-Chain Parametric Settlements',
            desc: 'Automates insurance contract payouts using Polygon smart contracts linked directly to Chainlink weather data oracles. Zero claims paperwork for farmers.',
            color: 'text-emerald-600 bg-emerald-50 border-emerald-100'
          },
          {
            icon: Globe,
            title: 'Hyperlocal Satellite Gridding',
            desc: 'Combines district-level IMD indices with satellite rainfall grids (NASA POWER, SMAP, CHIRPS) to offset micro-climatic variances across village blocks.',
            color: 'text-blue-600 bg-blue-50 border-blue-100'
          }
        ].map((pillar, i) => {
          const Icon = pillar.icon
          return (
            <div key={i} className="rounded-2xl border border-slate-205 bg-white p-8 text-left shadow-sm hover:shadow-md transition">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${pillar.color} mb-5 shadow-sm`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{pillar.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">{pillar.desc}</p>
            </div>
          )
        })}
      </section>

      {/* Open Datasets & Tech Stack integration */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-12 text-left shadow-sm relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Agricultural Data Feeds & Open APIs</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-semibold">
                We leverage real-time public datasets and satellites to calibrate risk modeling:
              </p>
              
              <div className="space-y-4">
                {[
                  { name: 'IMD & data.gov.in', detail: 'Gridded weather benchmarks and historical PMFBY yield payout statistics.' },
                  { name: 'NASA POWER API', detail: 'Solar radiation, crop canopy warmth, and agricultural climate indices.' },
                  { name: 'NASA SMAP & CHIRPS', detail: 'Soil moisture tracking and 5km high-resolution rainfall grid corrections.' },
                  { name: 'NOAA Climate Prediction Center', detail: 'El Niño-Southern Oscillation (ENSO) anomalies monitoring.' }
                ].map((feed, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{feed.name}</p>
                      <p className="text-xs text-slate-500 font-semibold">{feed.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-inner">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase">National Advisory Support</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                "Our mission is to establish transparency in crop-loss inspections, avoiding the delays associated with manual CCE checks under PMFBY guidelines."
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold border border-emerald-200">
                  <Landmark className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800">Govt of India Advisory Board</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Met-Oracle Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="max-w-3xl mx-auto px-6 py-10 text-center">
        <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-bold text-white px-6 py-3.5 transition hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25">
          Go to Farmer Portal <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
