import { useState, useEffect, useRef } from 'react'
import {
  Shield, Droplets, Thermometer, AlertTriangle, CheckCircle,
  Loader2, Zap, MapPin, Sprout, Layers, ArrowRight, Activity,
  TrendingDown, FileWarning, CircleDollarSign, Brain, Landmark,
  ExternalLink, Clock, Database, ChevronDown, ChevronUp, Star,
  FileText, Globe, BadgeCheck, Info, Phone, MessageSquare,
  Volume2, VolumeX, Download, Printer, BarChart3, TrendingUp,
  Calculator, Link2, Hash, X, Send, ChevronRight, Languages,
  Wallet, Award, Compass, RefreshCw, Sun, Cloud, CloudRain,
  CloudLightning, UserCheck, Lock, User, Cpu
} from 'lucide-react'
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart, Bar, BarChart,
  Line, LineChart, ReferenceLine
} from 'recharts'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const API_URL = `${BASE_URL}/api/evaluate-risk`
const CROP_TYPES = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize']
const SOIL_TYPES = ['Alluvial', 'Black Cotton', 'Red Laterite', 'Loamy']

const CROP_PROFILES = {
  Rice:   { rainfall: 150, tempMax: 35, tempMin: 20, waterNeed: 'High', season: 'Kharif', months: ['Jun','Jul','Aug','Sep'], growthStages: ['Sowing','Tillering','Flowering','Grain Filling'] },
  Wheat:  { rainfall: 75,  tempMax: 25, tempMin: 10, waterNeed: 'Medium', season: 'Rabi',  months: ['Nov','Dec','Jan','Feb'], growthStages: ['Sowing','Crown Root','Jointing','Maturity'] },
  Cotton: { rainfall: 100, tempMax: 38, tempMin: 21, waterNeed: 'Medium', season: 'Kharif', months: ['May','Jun','Jul','Aug'], growthStages: ['Sowing','Squaring','Boll Formation','Bursting'] },
  Sugarcane: { rainfall: 120, tempMax: 38, tempMin: 20, waterNeed: 'Very High', season: 'Annual', months: ['Mar','Apr','May','Jun'], growthStages: ['Germination','Tillering','Elongation','Ripening'] },
  Maize:  { rainfall: 90,  tempMax: 32, tempMin: 18, waterNeed: 'Medium', season: 'Kharif', months: ['Jun','Jul','Aug','Sep'], growthStages: ['Sowing','Knee-high','Silking','Maturity'] }
}

const CROP_TRANSLATIONS = {
  en: { Rice: 'Rice', Wheat: 'Wheat', Cotton: 'Cotton', Sugarcane: 'Sugarcane', Maize: 'Maize' },
  hi: { Rice: 'धान (चावल)', Wheat: 'गेहूं', Cotton: 'कपास', Sugarcane: 'गन्ना', Maize: 'मक्का' },
  ta: { Rice: 'நெல்', Wheat: 'கோதுமை', Cotton: 'பருத்தி', Sugarcane: 'கரும்பு', Maize: 'சோளம்' },
  te: { Rice: 'వరి', Wheat: 'గోధుమ', Cotton: 'ప్రత్తి', Sugarcane: 'చెరకు', Maize: 'మొక్కజొన్న' },
  mr: { Rice: 'तांदूळ', Wheat: 'गहू', Cotton: 'कापूस', Sugarcane: 'ऊस', Maize: 'मका' },
  pa: { Rice: 'ਝੋਨਾ', Wheat: 'ਕਣਕ', Cotton: 'ਨਰਮਾ', Sugarcane: 'ਗੰਨਾ', Maize: 'ਮੱਕੀ' }
}

const SOIL_TRANSLATIONS = {
  en: { Alluvial: 'Alluvial', 'Black Cotton': 'Black Cotton', 'Red Laterite': 'Red Laterite', Loamy: 'Loamy' },
  hi: { Alluvial: 'जलोढ़ मिट्टी', 'Black Cotton': 'काली कपास मिट्टी', 'Red Laterite': 'लाल लेटेराइट', Loamy: 'दुमट मिट्टी' },
  ta: { Alluvial: 'வண்டல் மண்', 'Black Cotton': 'கரிசல் மண்', 'Red Laterite': 'செம்மண்', Loamy: 'வண்டல் கலந்த மண்' },
  te: { Alluvial: 'ఒండ్రు నేల', 'Black Cotton': 'నల్ల రేగడి నేల', 'Red Laterite': 'ఎర్ర నేల', Loamy: 'దుమ్ము నేల' },
  mr: { Alluvial: 'गाळाची माती', 'Black Cotton': 'काळी कापसाची माती', 'Red Laterite': 'तांबडी माती', Loamy: 'लोमी माती' },
  pa: { Alluvial: 'ਜਲੋੜ ਮਿੱਟੀ', 'Black Cotton': 'ਕਾਲੀ ਮਿੱਟੀ', 'Red Laterite': 'ਲਾਲ ਮਿੱਟੀ', Loamy: 'ਦੋਮਟ ਮਿੱਟੀ' }
}

// Default coordinates (Kuthambakkam, Tamil Nadu)
const DEFAULT_LAT = 13.0186
const DEFAULT_LNG = 79.9865

/* ──────────────── LIVE BLOCKCHAIN ORACLE TICKER ──────────────── */
function LiveTicker() {
  const [ticks, setTicks] = useState([
    { id: 1, text: 'IMD Oracle verified 42% rainfall deficit in Kanchipuram district, Tamil Nadu.' },
    { id: 2, text: 'Direct Benefit Transfer of ₹45,000 sent to Aadhaar ****-9284 (Rice Crop, Kharif).' },
    { id: 3, text: 'Indian Bank DBT Cleared: Txn 0x8f3c...71ab (Instant Settlement).' },
    { id: 4, text: 'ISRO Bhuvan satellite node updated NDVI vegetation density score for Punjab region.' }
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTicks(prev => [...prev.slice(1), prev[0]])
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-emerald-900/10 text-emerald-700 py-2 px-6 border-b border-emerald-100 text-xs font-bold overflow-hidden whitespace-nowrap select-none flex items-center justify-between no-print">
      <div className="flex items-center gap-1.5 uppercase tracking-wider text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded shadow-sm">
        <Activity className="h-3 w-3 animate-pulse" /> Live Oracle Feed
      </div>
      <div className="flex-1 overflow-hidden pl-4 text-left">
        <p className="animate-pulse inline-block whitespace-nowrap leading-none text-emerald-800 font-semibold">
          {ticks[0].text}
        </p>
      </div>
      <div className="text-[10px] text-emerald-600 font-mono shrink-0 hidden sm:block">
        SYNCED: Indian Bank Node #184712
      </div>
    </div>
  )
}

/* ──────────────── DYNAMIC SOLIDITY POLICY VIEWER ──────────────── */
function SolidityViewer({ cropType, location, triggered, payout }) {
  const stateStr = triggered ? 'PAID' : 'ACTIVE'
  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract CropShieldPolicy is ChainlinkClient {
    address public constant IMD_ORACLE = 0x8f3c...1A42;
    uint255 public constant DEFICIT_LIMIT = 40; // 40% Deficit
    uint255 public constant PAYOUT_PER_HA = 45000; // INR

    enum PolicyState { ACTIVE, TRIGGERED, PAID }
    PolicyState public state = PolicyState.${triggered ? 'PAID' : 'ACTIVE'};

    struct Farmer {
        string aadhaarHash;
        uint255 hectares;
        address payable wallet;
    }

    Farmer public farmer;
    
    event ParametricBreach(uint255 actualDeficit, uint255 payoutAmt);
    event DBTDisbursed(address indexed recipient, uint255 amount);

    constructor(string memory _aadhaar, uint255 _ha, address payable _wallet) {
        farmer = Farmer(_aadhaar, _ha, _wallet);
    }

    // Chainlink Weather Oracle Callback
    function fulfillRainfallData(bytes32 _requestId, uint255 _actualDeficit) public {
        require(state == PolicyState.ACTIVE, "Policy inactive");
        
        if (_actualDeficit >= DEFICIT_LIMIT) {
            state = PolicyState.TRIGGERED;
            emit ParametricBreach(_actualDeficit, farmer.hectares * PAYOUT_PER_HA);
            executeDirectBenefitTransfer();
        }
    }

    function executeDirectBenefitTransfer() private {
        require(state == PolicyState.TRIGGERED, "Unauthorized");
        state = PolicyState.PAID;
        uint255 totalClaim = farmer.hectares * PAYOUT_PER_HA;
        farmer.wallet.transfer(totalClaim);
        emit DBTDisbursed(farmer.wallet, totalClaim);
    }
}`

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5"><Cpu className="h-4 w-4 text-violet-655" /> On-Chain Solidity smart contract</h4>
          <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Processed and routed via Indian Bank DBT Core Gateway</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-md font-black border uppercase ${
          triggered ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}>
          State: {stateStr}
        </span>
      </div>
      <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto max-h-[280px] font-mono text-[10px] text-emerald-400 leading-normal scrollbar-thin shadow-inner">
        <pre>{contractCode}</pre>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 font-semibold"><span className="h-2 w-2 rounded-full bg-violet-500" /> smart contract ABI v1.0.4</span>
        <span className="text-slate-400 font-mono font-bold">Gas Used: {triggered ? '62,814' : '0'} Gwei</span>
      </div>
    </div>
  )
}

/* ──────────────── GAUGE ──────────────── */
function RiskGauge({ score, labelText, triggerText }) {
  const angle = (score / 100) * 180 - 90
  const color = score > 65 ? '#ef4444' : score > 40 ? '#f59e0b' : '#16a34a'
  const defaultLabel = score > 65 ? 'CRITICAL' : score > 40 ? 'MODERATE' : 'LOW'
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-56">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.2" />
        <line x1="100" y1="100" x2="100" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" transform={`rotate(${angle}, 100, 100)`} style={{ transition: 'transform 1.2s cubic-bezier(.4,0,.2,1), stroke 0.5s' }} />
        <circle cx="100" cy="100" r="6" fill={color} style={{ transition: 'fill 0.5s' }} />
      </svg>
      <div className="mt-[-8px] text-center">
        <span className="text-5xl font-black tracking-tight text-slate-800" style={{ color }}>{score}</span>
        <span className="text-slate-400 text-sm ml-1">/ 100</span>
        <div className="text-xs font-bold tracking-[0.25em] mt-1" style={{ color }}>
          {triggerText || defaultLabel} {labelText || 'RISK'}
        </div>
      </div>
    </div>
  )
}

/* ──────────────── LIVE WEATHER FEED ──────────────── */
function LiveWeatherFeed({ weather, location }) {
  if (!weather) return null
  
  const getWeatherDetails = (code) => {
    if (code === 0) return { label: 'Sunny / Clear Sky', color: 'text-amber-500', icon: Sun }
    if ([1, 2, 3].includes(code)) return { label: 'Partly Cloudy', color: 'text-slate-500', icon: Cloud }
    if ([45, 48].includes(code)) return { label: 'Foggy conditions', color: 'text-slate-400', icon: Info }
    if ([51, 53, 55, 61, 63, 65].includes(code)) return { label: 'Rainy', color: 'text-blue-500', icon: CloudRain }
    if ([80, 81, 82].includes(code)) return { label: 'Heavy Showers', color: 'text-blue-600', icon: Droplets }
    if ([95].includes(code)) return { label: 'Thunderstorms', color: 'text-violet-600', icon: CloudLightning }
    return { label: 'Clear Sky', color: 'text-amber-500', icon: Sun }
  }
  
  const details = getWeatherDetails(weather.code)
  const WeatherIcon = details.icon

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:border-slate-300 transition">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Meteorological Satellite Feed</h4>
        </div>
        <p className="text-[11px] text-slate-505 font-semibold">Live observations at <span className="text-slate-900 font-semibold">{location.split(',')[0]}</span> via Open-Meteo</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-5 md:gap-6 w-full md:w-auto">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <WeatherIcon className={`h-5 w-5 ${details.color}`} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Conditions</p>
            <p className="text-xs font-bold text-slate-705">{details.label}</p>
          </div>
        </div>
        
        <div className="hidden sm:block h-8 w-px bg-slate-200" />
        
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Temperature</p>
          <p className="text-sm font-black text-slate-800">{weather.temp}°C</p>
        </div>
        
        <div className="hidden sm:block h-8 w-px bg-slate-200" />
        
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</p>
          <p className="text-sm font-black text-slate-800">{weather.humidity}%</p>
        </div>
        
        <div className="hidden sm:block h-8 w-px bg-slate-200" />
        
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">Wind Speed</p>
          <p className="text-sm font-black text-slate-800">{weather.wind} km/h</p>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── BLOCKCHAIN CLAIM TIMELINE ──────────────── */
function ClaimSettlementTimeline({ settlement, onSimulateDBT, hasPaidClaim, t }) {
  if (!settlement) return null
  const icons = { alert: AlertTriangle, zap: Zap, check: BadgeCheck, calc: Calculator, transfer: CircleDollarSign, message: MessageSquare }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-slate-805 uppercase flex items-center gap-2">
            <Link2 className="h-4 w-4 text-violet-650" /> {t.payoutTimeline}
          </h3>
          <p className="text-[10px] text-slate-405 mt-0.5 font-mono">Polygon PoS Txn: {settlement.txn_hash.slice(0,18)}...</p>
        </div>
        {!hasPaidClaim && (
          <button onClick={onSimulateDBT} className="self-start sm:self-auto text-[10px] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-indigo-600/15 flex items-center gap-1.5 shadow-sm">
            <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" /> {t.forceDBT}
          </button>
        )}
      </div>
      <div className="relative space-y-0 text-left pl-1">
        {settlement.steps.map((step, i) => {
          const Icon = icons[step.icon] || CheckCircle
          const isComplete = step.status === 'complete' || (step.id === 5 && hasPaidClaim) || (step.id === 6 && hasPaidClaim)
          const isProcessing = step.status === 'processing' && !hasPaidClaim
          return (
            <div key={step.id} className="flex gap-4 relative">
              {/* Connector line */}
              {i < settlement.steps.length - 1 && (
                <div className={`absolute left-[19px] top-10 w-0.5 h-[calc(100%-4px)] ${isComplete ? 'bg-emerald-500/40' : 'bg-slate-200'}`} />
              )}
              {/* Node */}
              <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all ${
                isComplete ? 'bg-emerald-50 border-emerald-500/30 shadow-md shadow-emerald-500/5' :
                isProcessing ? 'bg-amber-50 border-amber-300 animate-pulse' :
                'bg-slate-50 border-slate-200 text-slate-400'
              }`}>
                {isComplete ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : <Icon className={`h-5 w-5 ${isProcessing ? 'text-amber-500' : 'text-slate-404'}`} />}
              </div>
              {/* Content */}
              <div className="pb-6 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`text-sm font-bold ${isComplete ? 'text-slate-800' : isProcessing ? 'text-amber-600' : 'text-slate-400'}`}>
                    Step {step.id}: {step.label}
                  </p>
                  {isComplete && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">Confirmed</span>}
                  {isProcessing && <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-705 border border-amber-200 animate-pulse font-bold">Processing</span>}
                  {!isComplete && !isProcessing && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 border border-slate-200 font-bold">Pending</span>}
                </div>
                <p className="text-xs text-slate-505 mt-0.5 leading-relaxed font-semibold">
                  {step.id === 5 && hasPaidClaim ? 'Direct benefit transfer has been fully credited to your wallet.' : step.id === 6 && hasPaidClaim ? 'SMS warning and payment voucher dispatched successfully.' : step.detail}
                </p>
                {step.timestamp && <p className="text-[10px] text-slate-404 mt-0.5 font-mono font-semibold">{new Date(step.timestamp).toLocaleTimeString('en-IN')}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex gap-6">
          <div className="text-left"><p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">{t.payoutAmt}</p><p className="text-lg font-black text-emerald-600">₹{settlement.total_payout.toLocaleString('en-IN')}</p></div>
          <div className="text-left"><p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">{t.payoutVerification}</p><p className="text-sm font-semibold text-violet-650">{settlement.chain}</p></div>
        </div>
        <div className="rounded bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-emerald-700 text-xs font-bold shadow-sm">
          {t.aadhaarLinked}
        </div>
      </div>
    </div>
  )
}

/* ──────────────── SOIL HEALTH CARD ──────────────── */
function SoilHealthCard({ soilHealth, soilType, t }) {
  if (!soilHealth) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2">
        <Layers className="h-4 w-4 text-amber-500" /> {t.soilCardTitle} ({soilType})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Nitrogen (N)', val: soilHealth.nitrogen, color: 'from-blue-500 to-indigo-500', pct: 60, detail: 'Leafy crop development' },
          { label: 'Phosphorus (P)', val: soilHealth.phosphorus, color: 'from-emerald-500 to-teal-500', pct: 75, detail: 'Root & seed growth' },
          { label: 'Potassium (K)', val: soilHealth.potassium, color: 'from-amber-500 to-orange-500', pct: 90, detail: 'Disease resistance' },
          { label: 'Soil pH', val: soilHealth.ph, color: 'from-violet-500 to-fuchsia-500', pct: 70, detail: 'Nutrient absorption rate' },
          { label: 'Organic Carbon', val: soilHealth.organic_carbon, color: 'from-red-500 to-rose-500', pct: 55, detail: 'Structural soil biology' },
          { label: 'Moisture Retention', val: soilHealth.moisture_retention, color: 'from-cyan-500 to-blue-500', pct: 85, detail: 'Soil water retention capacity' }
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5 hover:border-slate-200 transition">
            <p className="text-[10px] text-slate-400 uppercase font-bold">{item.label}</p>
            <p className="text-sm font-extrabold text-slate-850">{item.val}</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.pct}%` }} />
            </div>
            <p className="text-[9px] text-slate-500 leading-none font-semibold">{item.detail}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1.5 font-semibold">
        <Info className="h-3.5 w-3.5 text-slate-400" /> {t.diagnosticICAR}
      </p>
    </div>
  )
}

/* ──────────────── AGMARKNET MANDI & GROUNDWATER FEED CARD ──────────────── */
function MandiWRISCard({ cropType, lang }) {
  const cropPrices = {
    Rice: { price: 2250, msp: 2183, risk: 'Low', unit: 'Quintal' },
    Wheat: { price: 2320, msp: 2275, risk: 'Low', unit: 'Quintal' },
    Cotton: { price: 6800, msp: 6620, risk: 'Medium', unit: 'Quintal' },
    Sugarcane: { price: 340, msp: 315, risk: 'Low', unit: 'Tonne' },
    Maize: { price: 2090, msp: 1960, risk: 'Low', unit: 'Quintal' }
  }

  const selectedPrice = cropPrices[cropType] || cropPrices.Rice

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm font-sans font-semibold">
      <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2">
        <Landmark className="h-4 w-4 text-emerald-600" /> Mandi Economics & India-WRIS Hydrology
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Mandi Price Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Agmarknet / eNAM Mandi Feed</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-705 font-bold border border-emerald-200">Live Price</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-lg font-black text-slate-800">₹{selectedPrice.price.toLocaleString('en-IN')}</p>
            <span className="text-[10px] text-slate-500 font-bold">/ {selectedPrice.unit}</span>
          </div>
          <div className="text-[11px] text-slate-505 leading-relaxed space-y-1">
            <p>Govt Minimum Support Price (MSP): <span className="font-bold text-slate-800">₹{selectedPrice.msp}</span></p>
            <p>Mandi Market Price Volatility Risk: <span className={`font-bold ${selectedPrice.risk === 'Medium' ? 'text-amber-600' : 'text-emerald-605'}`}>{selectedPrice.risk}</span></p>
          </div>
        </div>

        {/* Groundwater Level Anomaly */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase font-bold">India-WRIS Groundwater Feed</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-705 font-bold border border-blue-200">CGWB Safe</span>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-lg font-black text-slate-800">4.8</p>
            <span className="text-[10px] text-slate-500 font-bold">mbgl (meters below ground level)</span>
          </div>
          <div className="text-[11px] text-slate-505 leading-relaxed space-y-1">
            <p>Groundwater Aquifer Status: <span className="font-bold text-emerald-605">Positive Recharge</span></p>
            <p>Irrigation Reserve Buffer: <span className="font-bold text-slate-800">1.05x anomaly safety buffer</span></p>
          </div>
        </div>
      </div>
      
      {/* NDMA & GDACS Alerts */}
      <div className="mt-4 pt-3 border-t border-slate-105 flex items-center justify-between text-[10px] text-slate-405 leading-relaxed">
        <span className="flex items-center gap-1.5 font-semibold">
          <Shield className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> 
          NDMA Active Warnings: <span className="font-bold text-emerald-700">No Disaster Alerts</span>
        </span>
        <span className="font-mono">GDACS: Green Flag (Normal)</span>
      </div>
    </div>
  )
}

/* ──────────────── INDIA STATE HEATMAP ──────────────── */
function IndiaHeatmap({ stateRisks, t }) {
  const [hoveredState, setHoveredState] = useState(null)
  if (!stateRisks) return null
  const states = Object.entries(stateRisks)
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left relative z-10 shadow-sm">
      <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2">
        <Globe className="h-4 w-4 text-blue-500" /> {t.stateHeatmap}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {states.map(([name, data]) => {
          const color = data.risk > 75 ? 'red' : data.risk > 55 ? 'amber' : 'emerald'
          const bgClass = `bg-${color}-50 border-${color}-200 hover:bg-${color}-100`
          const textClass = `text-${color}-650 font-bold`
          return (
            <div key={name}
              onMouseEnter={() => setHoveredState(name)} onMouseLeave={() => setHoveredState(null)}
              className={`rounded-lg border p-2.5 cursor-pointer transition-all ${bgClass} ${hoveredState === name ? 'scale-105 z-20 shadow-md' : ''}`}>
              <p className="text-[11px] text-slate-500 font-bold truncate">{name}</p>
              <p className={`text-lg font-black ${textClass}`}>{data.risk}</p>
              {hoveredState === name && (
                <div className="absolute z-30 bg-white border border-slate-200 rounded-xl p-3.5 mt-1 shadow-2xl text-xs min-w-[190px] text-left">
                  <p className="font-bold text-slate-900 mb-1">{name}</p>
                  <p className="text-slate-600">Key Crops: {data.crops.join(', ')}</p>
                  <p className="text-slate-600">Districts: {data.districts}</p>
                  <p className="text-slate-600">Insured Area: {data.insured_pct}%</p>
                  <p className="text-slate-605 font-semibold">Claims Settled: {data.claims_settled}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-emerald-500/80" /> Low Risk (&lt;55)</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-amber-500/80" /> Moderate (55-75)</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-red-500/80" /> High Risk (&gt;75)</span>
      </div>
    </div>
  )
}

/* ──────────────── AUDIT HISTORY LOGS ──────────────── */
function AuditHistoryLogs({ history, onSelectAudit, t }) {
  if (!history?.length) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm font-sans">
      <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2">
        <Database className="h-4 w-4 text-emerald-600" /> {t.historyArchive}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left font-semibold">
          <thead>
            <tr className="border-b border-slate-100 text-slate-404 font-bold uppercase tracking-wider">
              <th className="py-2.5 px-3">Audit ID</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Crop / Soil</th>
              <th className="py-2.5 px-3 text-center">Risk Score</th>
              <th className="py-2.5 px-3 text-center">Parametric Trigger</th>
              <th className="py-2.5 px-3 text-right">DBT Claim</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 text-slate-700">
            {history.map(item => (
              <tr key={item.id} onClick={() => onSelectAudit(item)} className="hover:bg-slate-50 cursor-pointer transition">
                <td className="py-3 px-3 font-mono font-bold text-emerald-700">{item.id}</td>
                <td className="py-3 px-3 text-slate-500">{new Date(item.timestamp).toLocaleDateString('en-IN')}</td>
                <td className="py-3 px-3 font-bold">{item.crop_type} ({item.soil_type})</td>
                <td className="py-3 px-3 text-center font-black">{item.risk_score}</td>
                <td className="py-3 px-3 text-center font-bold">
                  {item.parametric_trigger ? (
                    <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">Triggered</span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Inactive</span>
                  )}
                </td>
                <td className="py-3 px-3 text-right font-black text-slate-800">
                  {item.claim_payout > 0 ? `₹${item.claim_payout.toLocaleString('en-IN')}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ──────────────── PREMIUM CALCULATOR + EV SIMULATOR MODAL ──────────────── */
function PremiumModal({ premium, cropType, hectares, sumPerHa, onClose, t }) {
  const [localHectares, setLocalHectares] = useState(hectares || 2)
  const [localSumPerHa, setLocalSumPerHa] = useState(sumPerHa || 50000)
  const [calcResult, setCalcResult] = useState(premium)
  
  useEffect(() => {
    recalculate()
  }, [localHectares, localSumPerHa, cropType])
  
  async function recalculate() {
    try {
      const res = await fetch(`${BASE_URL}/api/calculate-premium`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropType, sumInsured: localHectares * localSumPerHa })
      })
      setCalcResult(await res.json())
    } catch (e) { console.error(e) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full mx-4 shadow-2xl text-left overflow-y-auto max-h-[90vh] scrollbar-thin" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-850 flex items-center gap-2"><Calculator className="h-5 w-5 text-emerald-600" /> {t.evCalculator}</h3>
          <button onClick={onClose} className="text-slate-404 hover:text-slate-700 transition p-1.5 rounded-lg hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        
        <div className="space-y-5 font-sans font-semibold">
          {/* Hectares slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-bold">Cultivated Land Cover</span>
              <span className="text-slate-805 font-extrabold">{localHectares} Hectares</span>
            </div>
            <input type="range" min="1" max="20" value={localHectares} onChange={e => setLocalHectares(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            <div className="flex justify-between text-[9px] text-slate-404 mt-1 font-bold"><span>1 Hectare</span><span>20 Hectares max</span></div>
          </div>
          
          {/* Sum Insured Per Hectare slider */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-bold">Sum Insured Per Hectare</span>
              <span className="text-slate-805 font-extrabold">₹{localSumPerHa.toLocaleString('en-IN')}</span>
            </div>
            <input type="range" min="20000" max="100000" step="5000" value={localSumPerHa} onChange={e => setLocalSumPerHa(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            <div className="flex justify-between text-[9px] text-slate-404 mt-1 font-bold"><span>₹20,000 / ha</span><span>₹1,00,000 / ha</span></div>
          </div>

          {calcResult && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3.5 text-center">
                  <p className="text-[10px] text-emerald-700 uppercase tracking-wider font-bold">Farmer Premium Share (2%)</p>
                  <p className="text-2xl font-black text-emerald-600">₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-emerald-500 mt-0.5 font-bold">{calcResult.rate_pct}% PMFBY capped rate</p>
                </div>
                <div className="rounded-xl bg-violet-50 border border-violet-100 p-3.5 text-center">
                  <p className="text-[10px] text-violet-700 uppercase tracking-wider font-bold">Government Subsidy (88%)</p>
                  <p className="text-2xl font-black text-violet-605">₹{calcResult.govt_subsidy?.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-violet-500 mt-0.5 font-bold">{calcResult.subsidy_pct}% covered by Centre/State</p>
                </div>
              </div>
              
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2 text-xs font-bold">
                <div className="flex justify-between"><span className="text-slate-500">Total Sum Insured Coverage</span><span className="text-slate-800 font-black">₹{(localHectares * localSumPerHa).toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-slate-505">Actuarial Premium (Market Rate)</span><span className="text-slate-600">₹{calcResult.actuarial_premium?.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold"><span className="text-slate-700">Final Farmer Premium Paid</span><span className="text-emerald-600 text-sm">₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</span></div>
              </div>

              {/* Scenario & EV Simulator Table */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5"><TrendingUp className="h-4 w-4 text-emerald-600" /> {t.evCalculator}</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Season Scenario</th>
                        <th className="py-2.5 px-3 text-center">Probability</th>
                        <th className="py-2.5 px-3 text-right">Expected Payout</th>
                        <th className="py-2.5 px-3 text-right">Premium Cost</th>
                        <th className="py-2.5 px-3 text-right">Net Expected Value (EV)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 text-slate-700 bg-white font-bold">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold">Normal Year (No Deficit)</td>
                        <td className="py-2.5 px-3 text-center">75%</td>
                        <td className="py-2.5 px-3 text-right">₹0</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-red-600">-₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-amber-700">Moderate Drought (40% Deficit)</td>
                        <td className="py-2.5 px-3 text-center">20%</td>
                        <td className="py-2.5 px-3 text-right">₹{(localHectares * localSumPerHa * 0.4).toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600">+₹{((localHectares * localSumPerHa * 0.4) - calcResult.farmer_premium).toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-red-700">Severe Drought / Deficit</td>
                        <td className="py-2.5 px-3 text-center">5%</td>
                        <td className="py-2.5 px-3 text-right">₹{(localHectares * localSumPerHa).toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right text-slate-600">₹{calcResult.farmer_premium?.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600">+₹{((localHectares * localSumPerHa) - calcResult.farmer_premium).toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] text-slate-400 mt-2 font-semibold leading-normal">
                  Net Expected Value formula: (Probability % × Payout) - Premium Paid. This illustrates the mathematical safety net provided by parametric crop insurance policies during deficit cycles.
                </p>
              </div>
              
              <p className="text-[9px] text-slate-404 text-center leading-normal mt-2 font-bold">
                Premium shares conform to PMFBY rules: 2.0% Kharif crops, 1.5% Rabi crops, and 5.0% Commercial/Horticultural crops.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ──────────────── SMS/WhatsApp DISPATCH ──────────────── */
function AlertDispatch({ messages, onTriggerAlert, isMuted }) {
  const [sending, setSending] = useState({ sms: false, whatsapp: false })
  const [sent, setSent] = useState({ sms: false, whatsapp: false })

  if (!messages) return null

  function playBeep() {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      console.warn('AudioContext beep failed:', e)
    }
  }

  function handleSend(type) {
    if (sent[type] || sending[type]) return
    setSending(prev => ({ ...prev, [type]: true }))

    setTimeout(() => {
      setSending(prev => ({ ...prev, [type]: false }))
      setSent(prev => ({ ...prev, [type]: true }))
      
      playBeep()
      
      if (navigator.vibrate) {
        navigator.vibrate([80])
      }

      onTriggerAlert(
        type === 'sms' ? '⚠️ SMS Alert Dispatched' : '💬 WhatsApp Alert Dispatched',
        type === 'sms' ? messages.sms : messages.whatsapp
      )
    }, 1500)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <h3 className="text-xs font-bold tracking-widest text-slate-805 uppercase mb-4 flex items-center gap-2">
        <Send className="h-4 w-4 text-blue-500" /> Farmer Alert Dispatch Simulation
      </h3>
      <div className="grid md:grid-cols-2 gap-4 font-sans font-semibold">
        {/* SMS */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/60 bg-white/50">
            <span className="text-xs font-bold text-slate-605 flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-slate-500" /> SMS Alert</span>
            <button onClick={() => handleSend('sms')} disabled={sending.sms || sent.sms}
              className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1 ${
                sent.sms ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                sending.sms ? 'bg-blue-50 text-blue-700 border border-blue-105 cursor-not-allowed' :
                'bg-blue-600/10 text-blue-605 border border-blue-200 hover:bg-blue-600/20'
              }`}>
              {sending.sms && <Loader2 className="h-3 w-3 animate-spin" />}
              {sent.sms ? '✓ Sent' : sending.sms ? 'Sending...' : 'Simulate Send'}
            </button>
          </div>
          <div className="p-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-600 font-mono leading-relaxed shadow-inner">
              {messages.sms}
            </div>
            <p className="text-[10px] text-slate-404 mt-2 font-mono">To: +91-XXXX-XXXX42 • Via: TRAI DLT Platform</p>
          </div>
        </div>
        {/* WhatsApp */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200/60 bg-white/50">
            <span className="text-xs font-bold text-slate-605 flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5 text-slate-500" /> WhatsApp Alert</span>
            <button onClick={() => handleSend('whatsapp')} disabled={sending.whatsapp || sent.whatsapp}
              className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1 ${
                sent.whatsapp ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                sending.whatsapp ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed' :
                'bg-emerald-50 text-emerald-700 border border-emerald-250 hover:bg-emerald-100'
              }`}>
              {sending.whatsapp && <Loader2 className="h-3 w-3 animate-spin" />}
              {sent.whatsapp ? '✓ Sent' : sending.whatsapp ? 'Sending...' : 'Simulate Send'}
            </button>
          </div>
          <div className="p-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-600 font-mono leading-relaxed shadow-inner whitespace-pre-line">
              {messages.whatsapp}
            </div>
            <p className="text-[10px] text-slate-404 mt-2 font-mono">To: +91-XXXX-XXXX42 • Via: WhatsApp Business API</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── VOICE ADVISORY ──────────────── */
function VoiceAdvisory({ text, lang, t }) {
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef(null)

  function speak() {
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return }
    const langMap = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', mr: 'mr-IN', pa: 'pa-IN' }
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = langMap[lang] || 'en-IN'
    utter.rate = 0.9
    utter.onend = () => setSpeaking(false)
    utterRef.current = utter
    window.speechSynthesis.speak(utter)
    setSpeaking(true)
  }

  return (
    <button onClick={speak} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition border hover:scale-[1.02] active:scale-[0.98] ${
      speaking ? 'bg-emerald-50 border-emerald-300 text-emerald-700 animate-pulse font-bold' : 'bg-slate-50 border-slate-200 text-slate-650 hover:border-slate-300 font-semibold'}`}>
      {speaking ? <Volume2 className="h-4 w-4 text-emerald-600 animate-bounce" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
      {speaking ? t.expshowing : t.expbutton}
    </button>
  )
}

/* ──────────────── AI REPORT ──────────────── */
function AIReportPanel({ report }) {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="rounded-2xl border border-violet-200 bg-white overflow-hidden text-left shadow-sm font-sans font-semibold">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-5 hover:bg-slate-50/50 transition">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 border border-violet-100"><Brain className="h-4.5 w-4.5 text-violet-655" /></div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-805 flex items-center gap-2">AI Risk Intelligence Report <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200 font-bold">Groq LLaMA 3.3</span></h3>
            <p className="text-[11px] text-slate-400 font-semibold">AI-powered crop advisory and risk analysis</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          <div className="rounded-lg bg-violet-50 border border-violet-105 p-4">
            <h4 className="text-xs font-bold text-violet-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-violet-650" /> Executive Summary</h4>
            <p className="text-sm text-slate-700 leading-relaxed font-semibold">{report.executive_summary}</p>
          </div>
          <div><h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Crop Vulnerability Analysis</h4><p className="text-sm text-slate-600 leading-relaxed">{report.crop_vulnerability_analysis}</p></div>
          <div><h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-slate-400" /> Regional Context</h4><p className="text-sm text-slate-600 leading-relaxed">{report.regional_context}</p></div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Actions</h4>
            <div className="grid sm:grid-cols-2 gap-2">{report.recommended_actions.map((a, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100 shadow-sm font-semibold"><CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" /><span>{a}</span></div>
            ))}</div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-amber-50/50 border border-amber-200 p-3.5"><h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1"><CircleDollarSign className="h-3.5 w-3.5 text-amber-600" /> Payout Estimate</h4><p className="text-sm font-semibold text-slate-705">{report.payout_estimate}</p></div>
            <div className="rounded-lg bg-blue-50/50 border border-blue-200 p-3.5"><h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1 flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-blue-600" /> Climate Outlook</h4><p className="text-sm font-semibold text-slate-705">{report.climate_outlook}</p></div>
          </div>
          {report.alternative_crops && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-250 p-3.5">
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Sprout className="h-3.5 w-3.5 text-emerald-600" /> Alternative Crop Suggestions</h4>
              <p className="text-sm text-slate-705 font-bold">{report.alternative_crops}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ──────────────── GOVT SCHEMES ──────────────── */
function GovtSchemesPanel({ schemes, t }) {
  const [expandedId, setExpandedId] = useState(null)
  if (!schemes?.length) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm font-sans font-semibold">
      <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2"><Landmark className="h-4 w-4 text-emerald-600" /> {t.governmentSchemes} <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 ml-1 font-bold">{schemes.length} eligible</span></h3>
      <div className="space-y-3">{schemes.map((scheme, idx) => (
        <div key={scheme.id} className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden transition-all">
          <button onClick={() => setExpandedId(expandedId === scheme.id ? null : scheme.id)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-105/50 transition">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-emerald-50 border-emerald-300">
              <span className="text-xs font-black text-emerald-700">{scheme.matchScore}%</span>
            </div>
            <div className="flex-1 min-w-0"><div className="flex items-center gap-2">{idx === 0 && <Star className="h-3.5 w-3.5 text-amber-500" />}<h4 className="text-sm font-bold text-slate-805 truncate">{scheme.name}</h4></div><p className="text-[11px] text-slate-404 font-bold">{scheme.ministry}</p></div>
            {expandedId === scheme.id ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
          </button>
          {expandedId === scheme.id && (
            <div className="px-4 pb-4 space-y-3 border-t border-slate-200/60 pt-3">
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">{scheme.description}</p>
              <div><p className="text-xs text-emerald-700 font-bold uppercase tracking-wider mb-1.5">Why this matches</p><div className="flex flex-wrap gap-1.5">{scheme.matchReasons.map((r, i) => (<span key={i} className="text-[11px] px-2 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold">{r}</span>))}</div></div>
              <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Key Benefits</p><ul className="space-y-1">{scheme.benefits.map((b, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-semibold"><BadgeCheck className="h-4.5 w-4.5 text-emerald-600 mt-0.5 shrink-0" />{b}</li>))}</ul></div>
              <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1.5">Documents Required</p><div className="flex flex-wrap gap-1.5">{scheme.eligibility.documents.map((d, i) => (<span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-white text-slate-500 border border-slate-200 shadow-sm font-bold">{d}</span>))}</div></div>
              <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-550 transition mt-1">Apply / Learn More <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          )}
        </div>
      ))}</div>
    </div>
  )
}

/* ──────────────── SMART CONTRACT ALERT ──────────────── */
function SmartContractAlert({ assessmentId }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-red-200 bg-red-50 p-5 text-left shadow-sm">
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 border border-red-200"><Zap className="h-6 w-6 text-red-650" /></div>
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-ping" /><h3 className="text-sm font-bold text-red-700 tracking-wide uppercase">Smart Contract Triggered</h3></div>
          <p className="text-red-900 font-bold text-sm leading-relaxed">CRITICAL THRESHOLD BREACHED: Initiating Zero-Touch Direct Benefit Transfer (DBT) Payout to Farmer.</p>
          <div className="text-[10px] text-red-700 font-semibold mt-2 leading-relaxed max-w-lg bg-white/50 border border-red-200/50 rounded-lg p-2 flex items-start gap-1.5 shadow-sm">
            <Info className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
            <span>Demo Mode: Parametric validation is simulated on local testnets. Production deployments run on Chainlink weather oracle contracts.</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-white/80 px-2 py-1 text-red-700 border border-red-200 font-bold shadow-sm font-mono">Gateway: Indian Bank Core</span>
            <span className="rounded bg-white/80 px-2 py-1 text-red-700 border border-red-200 font-bold shadow-sm font-mono">Assessment: {assessmentId}</span>
            <span className="rounded bg-emerald-50 px-2 py-1 text-emerald-700 border border-emerald-200 font-bold shadow-sm">Status: Confirmed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ──────────────── MAIN DASHBOARD COMPONENT ──────────────── */
export default function Dashboard() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('krishi_user')
    return saved ? JSON.parse(saved) : null
  })
  const [authTab, setAuthTab] = useState('login')
  const [aadhaarInput, setAadhaarInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [pinInput, setPinInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [historyList, setHistoryList] = useState([])

  const [location, setLocation] = useState('Kuthambakkam, Tamil Nadu')
  const [lat, setLat] = useState(DEFAULT_LAT)
  const [lng, setLng] = useState(DEFAULT_LNG)
  const [pincode, setPincode] = useState('')
  const [cropType, setCropType] = useState(CROP_TYPES[0])
  const [soilType, setSoilType] = useState(SOIL_TYPES[0])
  const [soilDropdownOpen, setSoilDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showPremium, setShowPremium] = useState(false)
  const [lang, setLang] = useState('en')
  const [stateRisks, setStateRisks] = useState(null)
  const [toast, setToast] = useState(null)
  const [phoneAlert, setPhoneAlert] = useState(null)
  const [dbtSimStep, setDbtSimStep] = useState(null)
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('krishi_muted') === '1'
  })
  
  // Geolocation method tabs
  const [locTab, setLocTab] = useState('gps') 
  const [liveWeather, setLiveWeather] = useState(null)

  // Standout features states
  const [mapLayer, setMapLayer] = useState('none') // 'none' | 'ndvi' | 'rain' | 'moisture'
  const [sowingShift, setSowingShift] = useState(0) // -2 to +2 weeks
  const [activeMidSeason, setActiveMidSeason] = useState(false) // toggle mid-season monitored shifts
  
  // Premium restructurings layout tabs state
  const [activeRightTab, setActiveRightTab] = useState('audit') // 'audit' | 'analytics' | 'soil' | 'schemes' | 'logs'

  // Geolocation and map tracking
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerInstance = useRef(null)
  const circleInstance = useRef(null)

  // Wallet DBT state (synchronized with DB)
  const [walletBalance, setWalletBalance] = useState(6000) 
  const [walletHistory, setWalletHistory] = useState([])
  const [hasPaidClaim, setHasPaidClaim] = useState(false)

  // AI Chat state
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Namaste! I am your Krishi AI copilot. Ask me anything about crop insurance, weather alerts, soil chemistry, or sowing suggestions.' }
  ])
  const [chatLoading, setChatLoading] = useState(false)
  const chatEndRef = useRef(null)

  // Sync database records when user logs in/changes
  useEffect(() => {
    if (user) {
      fetchUserData(user.id)
    }
  }, [user])

  // Reset active tab to 'audit' when result is null (before assessment is run)
  useEffect(() => {
    if (!result) {
      setActiveRightTab('audit')
    }
  }, [result])

  async function fetchUserData(userId) {
    try {
      const histRes = await fetch(`${BASE_URL}/api/user-assessments/${userId}`)
      const histData = await histRes.json()
      setHistoryList(histData)
      
      if (histData && histData.length > 0) {
        const latestTriggered = histData.find(a => a.parametric_trigger);
        if (latestTriggered) {
          setHasPaidClaim(latestTriggered.approved === 1 || latestTriggered.approved === true);
        } else {
          setHasPaidClaim(false);
        }
      } else {
        setHasPaidClaim(false);
      }
      
      const walletRes = await fetch(`${BASE_URL}/api/wallet/${userId}`)
      const walletData = await walletRes.json()
      setWalletBalance(walletData.balance)
      setWalletHistory(walletData.transactions)
    } catch (err) {
      console.error('Failed to sync DB user data:', err)
    }
  }

  // Block Officer pending claims state and actions
  const [pendingClaims, setPendingClaims] = useState([])
  const [loadingClaims, setLoadingClaims] = useState(false)

  async function fetchPendingClaims() {
    setLoadingClaims(true)
    try {
      const res = await fetch(`${BASE_URL}/api/pending-assessments`)
      const data = await res.json()
      setPendingClaims(data)
    } catch (err) {
      console.error('Failed to fetch pending audit claims:', err)
    } finally {
      setLoadingClaims(false)
    }
  }

  async function handleApproveClaim(assessmentId) {
    try {
      const res = await fetch(`${BASE_URL}/api/approve-assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId })
      })
      const data = await res.json()
      if (data.success) {
        showToast('✓ Direct Benefit Transfer authorized and disbursed!', 'success')
        fetchPendingClaims()
      }
    } catch (err) {
      showToast('Governance approval execution failed', 'error')
    }
  }

  useEffect(() => {
    if (user && user.aadhaar === '987654321098') {
      fetchPendingClaims()
    }
  }, [user])

  // Fetch Open-Meteo Weather when lat/lng change
  useEffect(() => {
    async function fetchLiveWeather() {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
        const data = await res.json()
        if (data && data.current) {
          setLiveWeather({
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m,
            code: data.current.weather_code
          })
        }
      } catch (err) {
        console.error('Weather API error:', err)
      }
    }
    fetchLiveWeather()
  }, [lat, lng])

  // Load Leaflet CSS on mount
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Load state risks on mount
  useEffect(() => {
    fetch(`${BASE_URL}/api/state-risks`).then(r => r.json()).then(setStateRisks).catch(console.error)
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, chatOpen])

  // Initialize and update Leaflet Map (supporting multi-layer satellite index simulation)
  useEffect(() => {
    if (!mapRef.current) return;

    if (!window.L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = () => {
        initMap()
      }
      document.head.appendChild(script)
    } else {
      initMap()
    }

    function initMap() {
      if (!mapInstance.current) {
        mapInstance.current = window.L.map(mapRef.current, {
          zoomControl: true,
          attributionControl: false
        }).setView([lat, lng], 8)
        
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19
        }).addTo(mapInstance.current)

        mapInstance.current.on('click', async (e) => {
          const { lat: clickLat, lng: clickLng } = e.latlng
          setLat(clickLat)
          setLng(clickLng)
          setPincode('') 
          setLoading(true)
          
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${clickLat}&lon=${clickLng}&zoom=14`)
            const data = await res.json()
            const addr = data.address
            const resolvedName = [
              addr.village || addr.town || addr.suburb || addr.city_district || '',
              addr.state_district || addr.district || '',
              addr.state || ''
            ].filter(Boolean).join(', ')
            
            setLocation(resolvedName || `${clickLat.toFixed(4)}° N, ${clickLng.toFixed(4)}° E`)
            showToast('📍 Farm pinned on map!', 'success')
          } catch (err) {
            setLocation(`${clickLat.toFixed(4)}° N, ${clickLng.toFixed(4)}° E`)
          } finally {
            setLoading(false)
          }
        })
      }

      // Add/Update Marker
      const customPin = window.L.divIcon({
        className: 'custom-map-pin',
        html: `<div class="relative flex items-center justify-center w-8 h-8">
          <div class="absolute w-8 h-8 bg-emerald-500/25 rounded-full animate-ping" />
          <div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 border-2 border-white shadow-lg text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 14px; height: 14px;" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      })

      if (markerInstance.current) {
        markerInstance.current.setLatLng([lat, lng])
        markerInstance.current.setIcon(customPin)
      } else {
        markerInstance.current = window.L.marker([lat, lng], { icon: customPin }).addTo(mapInstance.current)
      }
      mapInstance.current.setView([lat, lng], 10)
      markerInstance.current.bindPopup(`<b>Farm Location</b><br/>Lat: ${lat.toFixed(4)}<br/>Lng: ${lng.toFixed(4)}`).openPopup()

      // Add Circle Overlays based on mapLayer
      if (circleInstance.current) {
        mapInstance.current.removeLayer(circleInstance.current)
        circleInstance.current = null
      }

      if (mapLayer !== 'none') {
        let color = '#22c55e'
        let label = 'NDVI Crop Health'
        const riskVal = result ? result.risk_score : 30
        if (mapLayer === 'ndvi') {
          color = riskVal > 60 ? '#b45309' : riskVal > 35 ? '#eab308' : '#22c55e'
          label = `NDVI Index: ${((100 - riskVal)/100).toFixed(2)} (Normal: 0.82)`
        } else if (mapLayer === 'rain') {
          color = '#ef4444'
          label = `Rain Deficit Radar Grid`
        } else if (mapLayer === 'moisture') {
          color = '#3b82f6'
          label = `Soil Moisture Index: 38% (Loamy)`
        }

        circleInstance.current = window.L.circle([lat, lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          radius: 12000 
        }).addTo(mapInstance.current)
        
        circleInstance.current.bindTooltip(label, { permanent: true, direction: 'top' })
      }
    }
  }, [lat, lng, location, mapLayer, result, user])

  function showToast(msg, type = 'info') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Live GPS lookup
  function handleGPSLookup() {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setLat(latitude)
        setLng(longitude)
        setPincode('')
        
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14`)
          const data = await res.json()
          const addr = data.address
          const resolvedName = [
            addr.village || addr.town || addr.suburb || addr.city_district || '',
            addr.state_district || addr.district || '',
            addr.state || ''
          ].filter(Boolean).join(', ')
          setLocation(resolvedName || `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`)
          showToast('✓ GPS Coordinates resolved successfully!', 'success')
        } catch (err) {
          setLocation(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`)
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        showToast(`GPS Error: ${err.message}`, 'error')
        setLoading(false)
      }
    )
  }

  // Indian Pincode geocoding API lookup
  async function handlePincodeSearch(e) {
    const pin = e.target.value.replace(/\D/g, '')
    setPincode(pin)
    if (pin.length === 6) {
      setLoading(true)
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`)
        const data = await res.json()
        if (data[0] && data[0].Status === 'Success') {
          const details = data[0].PostOffice[0]
          const resolvedLoc = `${details.Name}, ${details.District}, ${details.State}`
          setLocation(resolvedLoc)
          
          const codeOffset = parseInt(pin.substring(0, 3))
          const approxLat = 10 + (codeOffset % 15) + (parseInt(pin.substring(3)) % 1000) / 1000
          const approxLng = 73 + (codeOffset % 12) + (parseInt(pin.substring(3)) % 1000) / 1000
          
          setLat(approxLat)
          setLng(approxLng)
          showToast(`✓ Resolved PIN code: ${details.District}, ${details.State}`, 'success')
        } else {
          showToast('Invalid Indian PIN code', 'error')
        }
      } catch (err) {
        showToast('Pincode resolver network timeout', 'error')
      } finally {
        setLoading(false)
      }
    }
  }

  async function handleAnalyze(e) {
    if (e) e.preventDefault()
    setLoading(true)
    setResult(null)
    setHasPaidClaim(false)
    try {
      const res = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, cropType, soilType, lat, lng, pincode, sowingShift, activeMidSeason })
      })
      const data = await res.json()
      setResult(data)
      
      // Auto-save assessment to DB if user is logged in
      if (user) {
        await fetch(`${BASE_URL}/api/save-assessment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            assessmentId: data.assessment_id,
            location: location,
            cropType: cropType,
            soilType: soilType,
            riskScore: data.risk_score,
            parametricTrigger: data.parametric_trigger,
            claimPayout: data.claim_settlement?.total_payout || 0,
            weatherData: data.weather_data,
            soilHealth: data.soil_health,
            aiReport: data.ai_report
          })
        })
        fetchUserData(user.id)
      }

      if (data.parametric_trigger) {
        showToast('⚡ Parametric trigger activated — DBT claim processing!', 'warning')
      } else {
        showToast('✓ Risk assessment complete', 'success')
      }
    } catch (err) {
      console.error(err)
      showToast('Error connecting to engine', 'error')
    } finally {
      setLoading(false)
    }
  }

  function triggerPushNotification(title, body) {
    setPhoneAlert({ title, body })
    setTimeout(() => {
      setPhoneAlert(null)
    }, 4500)
  }

  function playSuccessChord() {
    if (isMuted) return
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playBeep = (freq, delay, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        gain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + duration);
      }
      playBeep(523.25, 0, 0.35); // C5
      playBeep(659.25, 0.1, 0.35); // E5
      playBeep(783.99, 0.2, 0.55); // G5
    } catch (e) {
      console.warn('Success chord failed:', e);
    }
  }

  // Force simulation of direct bank transfer (Polygon + Aadhaar DBT)
  function simulateDBTPayout() {
    if (!result?.parametric_trigger) {
      showToast('Direct Benefit Transfer requires a triggered threshold breach!', 'error')
      return
    }
    if (hasPaidClaim) {
      showToast('DBT claim payout already disbursed to wallet.', 'info')
      return
    }
    
    setDbtSimStep('init')
    
    setTimeout(() => {
      setDbtSimStep('step1')
      setTimeout(() => {
        setDbtSimStep('stepBAO')
        setTimeout(() => {
          setDbtSimStep('step2')
          setTimeout(() => {
            setDbtSimStep('step3')
            setTimeout(() => {
              setDbtSimStep('queued')
              showToast('Claim queued in District Audit Ledger!', 'success')
              if (user) {
                fetchUserData(user.id)
              }
            }, 1500)
          }, 1500)
        }, 1500)
      }, 1500)
    }, 1500)
  }

  async function completeDBTPayoutOnBackend() {
    const payoutAmount = result.claim_settlement?.total_payout || 45000
    if (user) {
      try {
        const res = await fetch(`${BASE_URL}/api/disburse-dbt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            amount: payoutAmount,
            cropType: cropType,
            ref: `DBT${Math.floor(10000000 + Math.random() * 90000000)}`
          })
        })
        const data = await res.json()
        if (data.success) {
          setWalletBalance(data.balance)
          setWalletHistory(data.transactions)
          setHasPaidClaim(true)
          setDbtSimStep('success')
          playSuccessChord()
          showToast(`Direct Benefit Transfer Confirmed!`, 'success')
        }
      } catch (err) {
        showToast('DBT dispatch failed', 'error')
        setDbtSimStep(null)
      }
    }
  }

  // AI chat call
  async function handleSendMessage(e) {
    if (e) e.preventDefault()
    if (!chatInput.trim()) return
    const text = chatInput
    setChatMessages(prev => [...prev, { role: 'user', text }])
    setChatInput('')
    setChatLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, cropType, soilType, location })
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: 'assistant', text: data.response }])
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: 'Namaste! I experienced a connection issue, but in the meantime, make sure your crops have adequate soil moisture, check latest local alerts, and enroll in PMFBY.' }])
    } finally {
      setChatLoading(false)
    }
  }

  function handleSelectAudit(pastAudit) {
    setResult({
      risk_score: pastAudit.risk_score,
      recommendation: pastAudit.claim_payout > 0 ? 'Strongly Opt for Insurance' : 'Safe',
      parametric_trigger: pastAudit.parametric_trigger,
      weather_data: pastAudit.weather_data,
      key_factors: pastAudit.ai_report?.recommended_actions || [],
      alerts: [],
      crop_profile: { name: pastAudit.crop_type, season: (CROP_PROFILES[pastAudit.crop_type] || CROP_PROFILES.Rice).season, water_need: (CROP_PROFILES[pastAudit.crop_type] || CROP_PROFILES.Rice).waterNeed, growth_stages: (CROP_PROFILES[pastAudit.crop_type] || CROP_PROFILES.Rice).growthStages },
      ai_report: pastAudit.ai_report,
      soil_health: pastAudit.soil_health,
      assessment_id: pastAudit.id,
      timestamp: pastAudit.timestamp,
      claim_settlement: pastAudit.claim_payout > 0 ? {
        steps: [
          { id: 1, label: 'Weather Threshold Breach Detected', status: 'complete', timestamp: pastAudit.timestamp, icon: 'alert', detail: 'Rainfall deficit >45% confirmed by IMD data' },
          { id: 2, label: 'Smart Contract Auto-Triggered', status: 'complete', timestamp: pastAudit.timestamp, icon: 'zap', detail: `Assessment ${pastAudit.id}` },
          { id: 3, label: 'Oracles Verify Weather Data', status: 'complete', timestamp: pastAudit.timestamp, icon: 'check', detail: '3/3 Chainlink oracles confirmed breach' },
          { id: 4, label: 'Claim Amount Calculated', status: 'complete', timestamp: pastAudit.timestamp, icon: 'calc', detail: `${pastAudit.crop_type} — ₹${pastAudit.claim_payout.toLocaleString('en-IN')} total` },
          { id: 5, label: 'DBT to Farmer Bank Account', status: 'complete', timestamp: pastAudit.timestamp, icon: 'transfer', detail: 'Disbursed successfully' }
        ],
        total_payout: pastAudit.claim_payout,
        chain: 'Indian Bank Core',
        txn_hash: '0x7f3a91b2c4d5e6f7890a1b2c3d4e5f6a7b8c9d0e'
      } : null
    })
    setLocation(pastAudit.location)
    setCropType(pastAudit.crop_type)
    setSoilType(pastAudit.soil_type)
    setHasPaidClaim(pastAudit.claim_payout > 0)
    setActiveRightTab('audit') // Switch to audit page automatically
    showToast(`Loaded historical assessment ${pastAudit.id}`, 'info')
  }

  // Handle Login submission
  async function handleLoginSubmit(e) {
    if (e) e.preventDefault()
    setAuthError('')
    if (aadhaarInput.length !== 12) {
      setAuthError('Aadhaar number must be exactly 12 digits')
      return
    }
    if (!passwordInput) {
      setAuthError('Password is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaar: aadhaarInput, password: passwordInput })
      })
      const data = await res.json()
      if (data.error) {
        setAuthError(data.error)
      } else {
        localStorage.setItem('krishi_user', JSON.stringify(data.user))
        setUser(data.user)
        setWalletBalance(data.wallet.balance)
        setWalletHistory(data.wallet.transactions)
        showToast(`Welcome back, ${data.user.name}!`, 'success')
      }
    } catch (err) {
      setAuthError('Unable to connect to the SQLite authentication service.')
    } finally {
      setLoading(false)
    }
  }

  // Handle Registration submission
  async function handleRegisterSubmit(e) {
    if (e) e.preventDefault()
    setAuthError('')
    if (aadhaarInput.length !== 12) {
      setAuthError('Aadhaar number must be exactly 12 digits')
      return
    }
    if (!nameInput.trim()) {
      setAuthError('Full Name is required')
      return
    }
    if (!phoneInput.trim()) {
      setAuthError('Phone number is required')
      return
    }
    if (!passwordInput) {
      setAuthError('Password is required')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: aadhaarInput,
          name: nameInput,
          phone: phoneInput,
          pincode: pinInput,
          password: passwordInput
        })
      })
      const data = await res.json()
      if (data.error) {
        setAuthError(data.error)
      } else {
        // Auto-login
        const loginRes = await fetch(`${BASE_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ aadhaar: aadhaarInput, password: passwordInput })
        })
        const loginData = await loginRes.json()
        localStorage.setItem('krishi_user', JSON.stringify(loginData.user))
        setUser(loginData.user)
        setWalletBalance(loginData.wallet.balance)
        setWalletHistory(loginData.wallet.transactions)
        showToast(`Account registered successfully!`, 'success')
      }
    } catch (err) {
      setAuthError('Authentication service connection failed.')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('krishi_user')
    setUser(null)
    setResult(null)
    setHistoryList([])
    setAadhaarInput('')
    setPasswordInput('')
    setNameInput('')
    setPhoneInput('')
    setPinInput('')
    showToast('Signed out of portal', 'info')
  }

  function handleExportPDF() { window.print() }

  const voiceText = result ? `Risk score is ${result.risk_score} out of 100. ${result.recommendation}. Key factors include: ${result.key_factors.slice(0,2).join('. ')}. Estimated insurance premium under PMFBY is ${result.premium_breakdown?.farmer_premium || 0} rupees per hectare with ${result.premium_breakdown?.subsidy_pct || 0}% government subsidy.` : ''

  const localTranslations = {
    en: {
      title: 'KrishiShield',
      sub: 'Parametric Crop Settlement Portal',
      locate: 'Use GPS',
      pin: 'Search Pincode',
      chat: 'Krishi AI Support',
      wallet: 'Aadhaar DBT Wallet',
      auditHeader: 'Farm Risk Audit',
      findCoords: 'Find Farm Coordinates',
      currentAddress: 'Current Coordinates Address:',
      insuredCrop: 'Insured Crop',
      soilProfiling: 'Soil Profiling',
      sowingShift: 'Sowing Date Shift',
      midSeason: 'Mid-Season Monitoring',
      midSeasonDesc: 'Re-evaluate standing crop failure risk as weather anomalies unfold',
      runAudit: 'Run Climate Assessment',
      fetchingFeeds: 'Fetching Feeds...',
      evCalculator: 'EV Payout Simulator',
      oracleGrid: 'Oracle Verification Grid',
      payoutTimeline: 'Parametric Claim Settlement Pipeline',
      forceDBT: 'Force Instant DBT Payout',
      payoutAmt: 'Total Payout',
      payoutVerification: 'Verification',
      aadhaarLinked: 'Aadhaar Linked Direct Transfer',
      soilCardTitle: 'Soil Health Card & Chemistry',
      diagnosticICAR: 'Soil diagnostic data simulated under ICAR/NIC National Soil Data Portal guidelines.',
      stateHeatmap: 'India State-Level Risk Heatmap',
      historyArchive: 'Farm Risk Assessment Archives',
      growthStagesTitle: 'Growth Stage Weather Mapping',
      deficitLabel: 'Rainfall Deficit (mm)',
      tempLabel: 'Temperature Indices (°C)',
      trendHeader: '5-Year Historical Risk Trend',
      trendSub: 'Risk score trajectory and estimated losses per hectare',
      expshowing: 'Speaking...',
      expbutton: 'Voice Advisory',
      nasaHeader: 'NASA POWER Agriculture Diagnostics',
      solarLabel: 'Solar Insolation',
      soilTempLabel: 'Soil Temp (10cm)',
      humidityLabel: 'Surface Humidity',
      evapoLabel: 'Evapotranspiration',
      optimalPhoto: 'Optimal Photosynthesis',
      rootThermal: 'Root Thermal Safe',
      lowCanopy: 'Low Canopy Stress',
      modTrans: 'Moderate Transpiration',
      nasaFooter: 'Active satellite assimilation of NASA POWER solar, thermal, and evapotranspiration feeds.',
      governmentSchemes: 'Matched Government Schemes'
    },
    hi: {
      title: 'कृषिशील्ड',
      sub: 'पैरामीट्रिक फसल बीमा निपटान पोर्टल',
      locate: 'जीपीएस उपयोग करें',
      pin: 'खोजें पिनकोड',
      chat: 'कृषि एआई सहायता',
      wallet: 'आधार डीबीटी बटुआ',
      auditHeader: 'कृषि जोखिम लेखापरीक्षा',
      findCoords: 'खेत के निर्देशांक ढूंढें',
      currentAddress: 'वर्तमान निर्देशांक पता:',
      insuredCrop: 'बीमाकृत फसल',
      soilProfiling: 'मिट्टी की रूपरेखा',
      sowingShift: 'बुवाई की तारीख में बदलाव',
      midSeason: 'मध्य-सीजन निगरानी',
      midSeasonDesc: 'मौसम की विसंगतियों के सामने आने पर खड़ी फसल के नुकसान के जोखिम का पुनर्मूल्यांकन करें',
      runAudit: 'जलवायु मूल्यांकन चलाएं',
      fetchingFeeds: 'डेटा एकत्र किया जा रहा है...',
      evCalculator: 'प्रत्याशित मूल्य (EV) सिम्युलेटर',
      oracleGrid: 'ओरैकल सत्यापन ग्रिड',
      payoutTimeline: 'पैरामीट्रिक दावा निपटान पाइपलाइन',
      forceDBT: 'तत्काल डीबीटी भुगतान करें',
      payoutAmt: 'कुल भुगतान राशि',
      payoutVerification: 'सत्यापन',
      aadhaarLinked: 'आधार लिंक्ड प्रत्यक्ष हस्तांतरण',
      soilCardTitle: 'मृदा स्वास्थ्य कार्ड और रसायन शास्त्र',
      diagnosticICAR: 'भाकृअनुप/एनआईसी राष्ट्रीय मृदा डेटा पोर्टल दिशानिर्देशों के तहत सिम्युलेटेड मृदा निदान डेटा।',
      stateHeatmap: 'भारत राज्य-स्तरीय जोखिम हीटमैप',
      historyArchive: 'कृषि जोखिम मूल्यांकन अभिलेखागार',
      growthStagesTitle: 'फसल वृद्धि चरण मौसम मानचित्रण',
      deficitLabel: 'वर्षा कमी (मिमी)',
      tempLabel: 'तापमान सूचकांक (°C)',
      trendHeader: '5-वर्षीय ऐतिहासिक जोखिम प्रवृत्ति',
      trendSub: 'प्रति हेक्टेयर जोखिम स्कोर प्रक्षेपवक्र और अनुमानित नुकसान',
      expshowing: 'बोल रहा है...',
      expbutton: 'आवाज सलाह',
      nasaHeader: 'नासा पावर कृषि निदान',
      solarLabel: 'सौर विकिरण',
      soilTempLabel: 'मिट्टी का तापमान (10 सेमी)',
      humidityLabel: 'सतही आर्द्रता',
      evapoLabel: 'वाष्पोत्सर्जन',
      optimalPhoto: 'इष्टतम प्रकाश संश्लेषण',
      rootThermal: 'जड़ें थर्मल सुरक्षित',
      lowCanopy: 'कम वाष्पोत्सर्जन तनाव',
      modTrans: 'मध्यम वाष्पीकरण',
      nasaFooter: 'नासा पावर सौर, थर्मल और वाष्पोत्सर्जन उपग्रह डेटा का सक्रिय समेकन।',
      governmentSchemes: 'योग्य सरकारी योजनाएं'
    },
    ta: {
      title: 'கிரிஷிஷீல்ட்',
      sub: 'பயன்பாட்டு வானிலை காப்பீட்டு போர்ட்டல்',
      locate: 'ஜிபிஎஸ் பயன்படுத்தவும்',
      pin: 'பின்கோடு தேடுங்கள்',
      chat: 'கிரிஷி ஏஐ ஆதரவு',
      wallet: 'ஆதார் டிபிடி பணப்பை',
      auditHeader: 'பயிர் இடர் தணிக்கை',
      findCoords: 'பண்ணை ஒருங்கிணைப்புகளைக் கண்டறியவும்',
      currentAddress: 'தற்போதைய முகவரி:',
      insuredCrop: 'காப்பீடு செய்யப்பட்ட பயிர்',
      soilProfiling: 'மண் வகைப்பாடு',
      sowingShift: 'விதைப்பு தேதி மாற்றம்',
      midSeason: 'மத்திய-பருவ கண்காணிப்பு',
      midSeasonDesc: 'வானிலை முரண்பாடுகள் உருவாகும்போது பயிர் இழப்பு அபாயத்தை மீண்டும் மதிப்பிடுங்கள்',
      runAudit: 'காலநிலை மதிப்பீட்டை இயக்கவும்',
      fetchingFeeds: 'தரவு பெறப்படுகிறது...',
      evCalculator: 'EV செலுத்துகை சிமுலேட்டர்',
      oracleGrid: 'ஒராக்கிள் சரிபார்ப்பு கட்டம்',
      payoutTimeline: 'காப்பீட்டு உரிமை தீர்வு குழாய்',
      forceDBT: 'உடனடி டிபிடி செலுத்துகை',
      payoutAmt: 'மொத்த செலுத்துகை',
      payoutVerification: 'சரிபார்ப்பு',
      aadhaarLinked: 'ஆதார் இணைக்கப்பட்ட நேரடி பரிமாற்றம்',
      soilCardTitle: 'மண் சுகாதார அட்டை மற்றும் வேதியியல்',
      diagnosticICAR: 'ICAR/NIC தேசிய மண் தரவு போர்டல் வழிகாட்டுதலின் கீழ் உருவகப்படுத்தப்பட்ட மண் கண்டறிதல் தரவு.',
      stateHeatmap: 'இந்திய மாநில அளவிலான இடர் வரைபடம்',
      historyArchive: 'பண்ணை இடர் மதிப்பீட்டு காப்பகங்கள்',
      growthStagesTitle: 'பயிர் வளர்ச்சி நிலை வானிலை வரைபடம்',
      deficitLabel: 'மழைப்பொழிவு பற்றாக்குறை (மிமீ)',
      tempLabel: 'வெப்பநிலை குறியீடுகள் (°C)',
      trendHeader: '5 ஆண்டு வரலாற்று இடர் போக்கு',
      trendSub: 'இடர் மதிப்பெண் பாதை மற்றும் ஹெக்டேருக்கு மதிப்பிடப்பட்ட இழப்புகள்',
      expshowing: 'பேசுகிறது...',
      expbutton: 'குரல் ஆலோசனை',
      nasaHeader: 'நாசா பவர் விவசாய கண்டறிதல்',
      solarLabel: 'சூரிய கதிர்வீச்சு',
      soilTempLabel: 'மண் வெப்பநிலை (10செ.மீ)',
      humidityLabel: 'மேற்பரப்பு ஈரப்பதம்',
      evapoLabel: 'நீராวิப்போக்கு',
      optimalPhoto: 'உகந்த ஒளிச்சேர்க்கை',
      rootThermal: 'வேர் வெப்ப பாதுகாப்பு',
      lowCanopy: 'குறைந்த நீராวิப்போக்கு அழுத்தம்',
      modTrans: 'மிதமான நீராவிப்போக்கு',
      nasaFooter: 'நாசா பவர் சூரிய, வெப்ப மற்றும் நீராวิப்போக்கு செயற்கைக்கோள் தரவுகளின் நேரடி ஒருங்கிணைப்பு.',
      governmentSchemes: 'பொருந்தும் அரசு திட்டங்கள்'
    },
    te: {
      title: 'ਕ੍ਰਿਸ਼ੀਸ਼ੀਲਡ',
      sub: 'పారామెట్రిక్ పంట బీమా పోర్టల్',
      locate: 'జీపీఎస్ వాడండి',
      pin: 'పిన్‌కోడ్ వెతకండి',
      chat: 'కృషి ఏఐ మద్దతు',
      wallet: 'ఆధార్ డీబీటీ వాలెట్',
      auditHeader: 'పంట నష్ట అంచనా',
      findCoords: 'పంట భూమి కోఆర్డినేట్లు కనుగొనండి',
      currentAddress: 'ప్రస్తుత కోఆర్డినేట్ల చిరునామా:',
      insuredCrop: 'బీమా చేయబడిన పంట',
      soilProfiling: 'నేల రకాలు',
      sowingShift: 'విత్తే తేదీ మార్పు',
      midSeason: 'మధ్య-సీజన్ పర్యవేక్షణ',
      midSeasonDesc: 'ఆగష్టు వాతావరణ వైరుధ్యాలు సంభవించినప్పుడు నిలబడిన పంట వైఫల్య ప్రమాదాన్ని తిరిగి అంచనా వేయండి',
      runAudit: 'వాతావరణ అంచనాను ప్రారంభించు',
      fetchingFeeds: 'సమాచారం సేకరిస్తోంది...',
      evCalculator: 'EV చెల్లింపు సిమ్యులేటర్',
      oracleGrid: 'ఒరాకిల్ వెరిఫికేషన్ గ్రిడ్',
      payoutTimeline: 'పారామెట్రిక్ క్లెయిమ్ సెటిల్మెంట్ పైప్‌లైన్',
      forceDBT: 'తక్షణ డీబీటీ బదిలీ చేయండి',
      payoutAmt: 'మొత్తం చెల్లింపు',
      payoutVerification: 'ధృవీకరణ',
      aadhaarLinked: 'ఆధార్ అనుసంధాన ప్రత్యక్ష బదిలీ',
      soilCardTitle: 'నేల ఆరోగ్య కార్డ్ & రసాయన శాస్త్రం',
      diagnosticICAR: 'ICAR/NIC జాతీయ నేల డేటా పోర్టల్ మార్గదర్శకాల ప్రకారం సృష్టించబడిన నేల విశ్లేషణ డేటా.',
      stateHeatmap: 'భారతదేశ రాష్ట్ర-స్థాయి ప్రమాద పటం',
      historyArchive: 'పంట నష్ట అంచనా ఆర్కైవ్స్',
      growthStagesTitle: 'పంట ఎదుగుదల దశల వాతావరణ పటం',
      deficitLabel: 'వర్షపాత లోటు (మిమీ)',
      tempLabel: 'ఉష్ణోగ్రత సూచికలు (°C)',
      trendHeader: '5 సంవత్సరాల చారిత్రక ప్రమాద ధోరణి',
      trendSub: 'ప్రమాద స్కోరు పథం మరియు హెక్టారుకు అంచనా వేయబడిన నష్టాలు',
      expshowing: 'మాట్లాడుతోంది...',
      expbutton: 'వాయిస్ సలహా',
      nasaHeader: 'నాసా పవర్ వ్యవసాయ విశ్లేషణ',
      solarLabel: 'సౌర వికిరణం',
      soilTempLabel: 'నేల ఉష్ణోగ్రత (10సెం.మీ)',
      humidityLabel: 'ఉపరితల తేమ',
      evapoLabel: 'బాష్పోత్సేకం',
      optimalPhoto: 'అనుకూలమైన కిరణజన్య సంయోగక్రియ',
      rootThermal: 'వేరు ఉష్ణ రక్షణ',
      lowCanopy: 'తక్కువ బాష్పోత్సేక ఒత్తిడి',
      modTrans: 'మితమైన బాష్పీభవనం',
      nasaFooter: 'నాసా పవర్ సౌర, ఉష్ణ మరియు బాష్పోత్సేక ఉపగ్రహ సమాచార ప్రత్యక్ష అనుసంధానం.',
      governmentSchemes: 'అర్హత గల ప్రభుత్వ పథకాలు'
    },
    mr: {
      title: 'कृषिशील्ड',
      sub: 'पॅरामेट्रिक पीक विमा निवारण पोर्टल',
      locate: 'जीपीएस वापरा',
      pin: 'पिनकोड शोधा',
      chat: 'कृषी एआय सपोर्ट',
      wallet: 'आधार डीबीटी वॉलेट',
      auditHeader: 'पीक जोखीम लेखापरीक्षण',
      findCoords: 'शेत समन्वय शोधा',
      currentAddress: 'सध्याचा पत्ता:',
      insuredCrop: 'विमा उतरवलेले पीक',
      soilProfiling: 'मातीचे प्रकार',
      sowingShift: 'पेरणीची तारीख बदल',
      midSeason: 'मध्य-हंगाम देखरेख',
      midSeasonDesc: 'हवामान विसंगती उघडकीस आल्यावर उभ्या पीक अपयशाच्या जोखमीचे पुनर्मूल्यांकन करा',
      runAudit: 'हवामान मूल्यांकन करा',
      fetchingFeeds: 'माहिती गोळा करत आहे...',
      evCalculator: 'अपेक्षित मूल्य (EV) सिम्युलेटर',
      oracleGrid: 'ओरॅकल पडताळणी ग्रिड',
      payoutTimeline: 'पॅरामेट्रिक विमा हक्क निवारण पाईपलाईन',
      forceDBT: 'त्वरित डीबीटी जमा करा',
      payoutAmt: 'एकूण परतावा',
      payoutVerification: 'पडताळणी',
      aadhaarLinked: 'आधार लिंक थेट हस्तांतरण',
      soilCardTitle: 'मृदा आरोग्य पत्रिका आणि रसायनशास्त्र',
      diagnosticICAR: 'ICAR/NIC राष्ट्रीय मृदा डेटा पोर्टल मार्गदर्शक तत्त्वांनुसार सिम्युलेटेड मातीचे निदान डेटा.',
      stateHeatmap: 'भारत राज्य-स्तरीय जोखीम नकाशा',
      historyArchive: 'पीक जोखीम मूल्यांकन दस्तऐवज',
      growthStagesTitle: 'पीक वाढीचे टप्पे आणि हवामान नकाशे',
      deficitLabel: 'पावसाची तूट (मिमी)',
      tempLabel: 'तापमान निर्देशांक (°C)',
      trendHeader: '५ वर्षांची ऐतिहासिक जोखीम प्रवृत्ती',
      trendSub: 'प्रति हेक्टर जोखीम धागा आणि अंदाजित नुकसान',
      expshowing: 'बोलत आहे...',
      expbutton: 'ध्वनी सल्ला',
      nasaHeader: 'नासा पॉवर कृषी निदान',
      solarLabel: 'सौर ऊर्जा किरण',
      soilTempLabel: 'मातीचे तापमान (१० सेमी)',
      humidityLabel: 'आर्द्रता',
      evapoLabel: 'बाष्पोत्सर्जन',
      optimalPhoto: 'उत्तम प्रकाश संश्लेषण',
      rootThermal: 'मुळे सुरक्षित तापमान',
      lowCanopy: 'कमी बाष्पीभवन ताण',
      modTrans: 'मध्यम बाष्पीभवन',
      nasaFooter: 'नासा पॉवर उपग्रह डेटाचे सक्रिय एकत्रीकरण.',
      governmentSchemes: 'शासकीय योजना सूची'
    },
    pa: {
      title: 'ਕ੍ਰਿਸ਼ੀਸ਼ੀਲਡ',
      sub: 'ਪੈਰਾਮੀਟ੍ਰਿਕ ਫਸਲ ਬੀਮਾ ਨਿਪਟਾਰਾ ਪੋਰਟਲ',
      locate: 'ਜੀਪੀਐਸ ਵਰਤੋਂ',
      pin: 'ਪਿਨਕੋਡ ਲੱਭੋ',
      chat: 'ਕ੍ਰਿਸ਼ੀ ਏਆਈ ਸਹਾਇਤਾ',
      wallet: 'ਆਧਾਰ ਡੀਬੀਟੀ ਵਾਲਿਟ',
      auditHeader: 'ਫਸਲ ਜੋਖਮ ਆਡਿਟ',
      findCoords: 'ਖੇਤ ਦੇ ਕੋਆਰਡੀਨੇਟਸ ਲੱਭੋ',
      currentAddress: 'ਮੌਜੂਦਾ ਕੋਆਰਡੀਨੇਟ ਪਤਾ:',
      insuredCrop: 'ਬੀਮਾਯੁਕਤ ਫਸਲ',
      soilProfiling: 'ਮਿੱਟੀ ਦੀ ਜਾਂਚ',
      sowingShift: 'ਬਿਜਾਈ ਦੀ ਮਿਤੀ ਤਬਦੀਲੀ',
      midSeason: 'ਮੱਧ-ਸੀਜ਼ਨ ਨਿਗਰਾਨੀ',
      midSeasonDesc: 'ਮੌਸਮ ਦੀਆਂ ਤਬਦੀਲੀਆਂ ਦੇ ਸਾਹਮਣੇ ਆਉਣ ਤੇ ਖੜ੍ਹੀ ਫਸਲ ਦੇ ਜੋਖਮ ਦਾ ਮੁੜ-ਮੁਲਾਂਕਣ ਕਰੋ',
      runAudit: 'ਜਲਵਾਯੂ ਮੁਲਾਂਕਣ ਕਰੋ',
      fetchingFeeds: 'ਡਾਟਾ ਇਕੱਠਾ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...',
      evCalculator: 'ਸੰਭਾਵਿਤ ਮੁੱਲ (EV) ਸਿਮੂਲੇਟਰ',
      oracleGrid: 'ਓਰੇਕਲ ਵੈਰੀਫਿਕੇਸ਼ਨ ਗ੍ਰਿਡ',
      payoutTimeline: 'ਪੈਰਾਮੀਟ੍ਰਿਕ ਕਲੇਮ ਨਿਪਟਾਰਾ ਪਾਈਪਲਾਈਨ',
      forceDBT: 'ਤੁਰੰਤ ਡੀਬੀਟੀ ਭੁਗਤਾਨ ਕਰੋ',
      payoutAmt: 'ਕੁੱਲ ਕਲੇਮ ਰਾਸ਼ੀ',
      payoutVerification: 'ਤਸਦੀਕ',
      aadhaarLinked: 'ਆਧਾਰ ਲਿੰਕਡ ਸਿੱਧਾ ਤਬਾਦਲਾ',
      soilCardTitle: 'ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਅਤੇ ਰਸਾਇਣ ਵਿਗਿਆਨ',
      diagnosticICAR: 'ICAR/NIC ਰਾਸ਼ਟਰੀ ਮਿੱਟੀ ਡਾਟਾ ਪੋਰਟਲ ਦੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ਾਂ ਅਧੀਨ ਮਿੱਟੀ ਜਾਂਚ ਡਾਟਾ।',
      stateHeatmap: 'ਭਾਰਤ ਰਾਜ-ਪੱਧਰੀ ਜੋਖਮ ਹੀਟਮੈਪ',
      historyArchive: 'ਫਸਲ ਜੋਖਮ ਮੁਲਾਂਕਣ ਪੁਰਾਲੇਖ',
      growthStagesTitle: 'ਫਸਲ ਵਾਧੇ ਦੇ ਪੜਾਅ ਅਤੇ ਜਲਵਾਯੂ ਮੈਪਿੰਗ',
      deficitLabel: 'ਮੀਂਹ ਦੀ ਘਾਟ (ਮੀ.ਮੀ.)',
      tempLabel: 'ਤਾਪਮਾਨ ਸੂਚਕ ਅੰਕ (°C)',
      trendHeader: '5-ਸਾਲਾ ਇਤਿਹਾਸਕ ਜੋਖਮ ਰੁਝਾਨ',
      trendSub: 'ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ ਜੋਖਮ ਸਕੋਰ ਅਤੇ ਅੰਦਾਜ਼ਨ ਨੁਕਸਾਨ',
      expshowing: 'ਬੋਲ ਰਿਹਾ ਹੈ...',
      expbutton: 'ਆਵਾਜ਼ ਸਲਾਹ',
      nasaHeader: 'ਨਾਸਾ ਪਾਵਰ ਖੇਤੀਬਾੜੀ ਡਾਇਗਨੌਸਟਿਕਸ',
      solarLabel: 'ਸੂਰਜੀ ਕਿਰਨਾਂ',
      soilTempLabel: 'ਮਿੱਟੀ ਦਾ ਤਾਪਮਾਨ (10 ਸੈ.ਮੀ.)',
      humidityLabel: 'ਨਮੀ',
      evapoLabel: 'ਵਾਸ਼ਪੀਕਰਨ',
      optimalPhoto: 'ਸਰਵੋਤਮ ਪ੍ਰਕਾਸ਼ ਸੰਸਲੇਸ਼ਣ',
      rootThermal: 'ਜੜ੍ਹਾਂ ਲਈ ਸੁਰੱਖਿਅਤ ਤਾਪਮਾਨ',
      lowCanopy: 'ਘੱਟ ਵਾਸ਼ਪੀਕਰਨ ਤਣਾਅ',
      modTrans: 'ਦਰਮਿਆਨਾ ਵਾਸ਼ਪੀਕਰਨ',
      nasaFooter: 'ਨਾਸਾ ਪਾਵਰ ਸੂਰਜੀ ਅਤੇ ਵਾਸ਼ਪੀਕਰਨ ਉਪਗ੍ਰਹਿ ਡਾਟਾ ਦਾ ਸਿੱਧਾ ਏਕੀਕਰਣ।',
      governmentSchemes: 'ਯੋਗ ਸਰਕਾਰੀ ਸਕੀਮਾਂ'
    }
  }

  const t = localTranslations[lang] || localTranslations.en

  // RENDER LOGIN / REGISTER SCREEN IF NOT AUTHENTICATED
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 flex flex-col items-center justify-center pt-24 px-6 relative">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative z-10 text-left">
          <div className="flex items-center gap-2.5 mb-6 justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
              <Shield className="h-5.5 w-5.5 text-emerald-600" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block">
                KrishiShield <span className="text-emerald-600 font-extrabold">Portal</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Aadhaar Enabled Payment System</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 bg-slate-105 p-1 rounded-xl border border-slate-200 shadow-inner mb-6">
            <button onClick={() => { setAuthTab('login'); setAuthError(''); }}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${authTab === 'login' ? 'bg-white text-emerald-700 border border-slate-200 shadow-sm' : 'text-slate-505 hover:text-slate-800'}`}>
              <User className="h-3.5 w-3.5" /> Login
            </button>
            <button onClick={() => { setAuthTab('register'); setAuthError(''); }}
              className={`py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${authTab === 'register' ? 'bg-white text-emerald-700 border border-slate-200 shadow-sm' : 'text-slate-550 hover:text-slate-800'}`}>
              <UserCheck className="h-3.5 w-3.5" /> Register
            </button>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authTab === 'login' ? (
            <>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">12-Digit Aadhaar Card Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" maxLength={12} value={aadhaarInput} onChange={e => setAadhaarInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                      placeholder="Enter Aadhaar (e.g. 123456789012)" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">Portal Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter password" required />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-555 disabled:opacity-50 px-4 py-3 text-sm font-bold text-white transition-all shadow-md shadow-emerald-600/10 mt-6">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign In to Portal <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
              <div className="mt-4 border-t border-slate-200/60 pt-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Demo Quick Login</span>
                <div className="flex justify-center gap-2">
                  <button type="button" onClick={() => { setAadhaarInput('123456789012'); setPasswordInput('demo'); }}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold transition border border-emerald-150 flex items-center gap-1 cursor-pointer">
                    🌾 Farmer Demo
                  </button>
                  <button type="button" onClick={() => { setAadhaarInput('987654321098'); setPasswordInput('admin'); }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition border border-slate-200 flex items-center gap-1 cursor-pointer">
                    👨‍💼 Block Officer Demo
                  </button>
                </div>
              </div>
            </>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-505 font-bold block">Aadhaar Card Number</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" maxLength={12} value={aadhaarInput} onChange={e => setAadhaarInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                    placeholder="Enter 12-digit Aadhaar" required />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-500 font-bold block">Full Farmer Name (as in Aadhaar)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                    placeholder="e.g. Rajesh Kumar" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" maxLength={10} value={phoneInput} onChange={e => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                      placeholder="e.g. 9876543210" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">PIN Code</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" maxLength={6} value={pinInput} onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                      placeholder="e.g. 560001" required />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-550 font-bold block">Select Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="password" value={passwordInput} onChange={e => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Create security password" required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-555 disabled:opacity-50 px-4 py-3 text-sm font-bold text-white transition-all shadow-md shadow-emerald-600/10 mt-6">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create Account & Sign In <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-505 space-y-1.5 bg-slate-50/50 -mx-8 -mb-8 p-6 rounded-b-3xl font-semibold">
            <span className="font-bold text-slate-705 flex items-center gap-1.5"><Info className="h-4 w-4 text-emerald-600" /> Demo Credentials (Pre-seeded DB):</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-emerald-700 font-bold uppercase">🌾 Farmer</p>
                <p className="mt-0.5">Aadhaar: <span className="font-mono bg-white border px-1.5 py-0.5 rounded text-slate-700">123456789012</span></p>
                <p className="mt-1">Password: <span className="font-mono bg-white border px-1.5 py-0.5 rounded text-slate-700">demo</span></p>
              </div>
              <div>
                <p className="text-[10px] text-slate-700 font-bold uppercase">👨‍💼 Block Officer</p>
                <p className="mt-0.5">Aadhaar: <span className="font-mono bg-white border px-1.5 py-0.5 rounded text-slate-700">987654321098</span></p>
                <p className="mt-1">Password: <span className="font-mono bg-white border px-1.5 py-0.5 rounded text-slate-700">admin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // MAIN DASHBOARD LAYOUT (IF LOGGED IN)
  if (user && user.aadhaar === '987654321098') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-850 pb-12 font-sans">
        {toast && (
          <div className={`fixed bottom-24 right-6 z-50 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-[slideIn_0.3s_ease] flex items-center gap-3 max-w-sm no-print ${
            toast.type === 'warning' ? 'bg-amber-50/95 border-amber-250 text-amber-900' :
            toast.type === 'error' ? 'bg-red-50/95 border-red-250 text-red-900' :
            'bg-emerald-50/95 border-emerald-250 text-emerald-900'
          }`}>
            {toast.type === 'warning' ? <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" /> :
             toast.type === 'error' ? <XCircle className="h-5 w-5 text-red-650 shrink-0" /> :
             <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />}
            <div className="flex-grow text-xs font-bold leading-normal">{toast.msg}</div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg hover:bg-slate-100/50 transition">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* LOGO BAR */}
        <div className="bg-slate-900 text-white py-3.5 px-6 flex items-center justify-between border-b border-slate-800 shadow-lg no-print">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Shield className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight block">KrishiShield <span className="text-emerald-450 font-extrabold">Auditor Portal</span></span>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">Sovereign Direct Benefit Governance</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold text-slate-200">
              <UserCheck className="h-4 w-4 text-emerald-555" />
              <span>Dr. A. K. Sharma (Block Officer)</span>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/20 cursor-pointer">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Insured Hectares</span>
              <span className="text-2xl font-black text-slate-850">2,418 Ha</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-1">✓ Verified land registry</span>
            </div>
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Deficit Warnings</span>
              <span className="text-2xl font-black text-amber-600">14 Blocks</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-1">Based on IMD AWS network</span>
            </div>
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Pending Audit Queue</span>
              <span className={`text-2xl font-black ${pendingClaims.length > 0 ? 'text-red-550' : 'text-slate-400'}`}>{pendingClaims.length} Claims</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-1">Requires digital sign-off</span>
            </div>
            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total DBT Payouts</span>
              <span className="text-2xl font-black text-emerald-600">₹4.2 Lakh</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-1">Disbursed directly via AePS</span>
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-base font-black text-slate-850">🗳️ Pending Parametric Claim Settlements</h2>
                <p className="text-xs text-slate-404 font-semibold mt-0.5">District Officer governance desk for monsoonal audit verifications</p>
              </div>
              <button onClick={fetchPendingClaims} disabled={loadingClaims} className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer">
                {loadingClaims ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <>Sync Audit Queue</>}
              </button>
            </div>

            {loadingClaims && pendingClaims.length === 0 ? (
              <div className="py-16 text-center">
                <Loader2 className="h-8 w-8 text-emerald-650 animate-spin mx-auto mb-3" />
                <p className="text-xs text-slate-404 font-bold">Synchronizing audit ledgers...</p>
              </div>
            ) : pendingClaims.length === 0 ? (
              <div className="py-16 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-3 animate-[pulse_2s_infinite]" />
                <p className="text-sm font-bold text-slate-700">All Parametric Claims Audited & Cleared!</p>
                <p className="text-xs text-slate-404 font-semibold mt-1">No pending claims waiting for sign-off in the district ledger.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-semibold">
                  <thead>
                    <tr className="text-slate-400 uppercase tracking-widest text-[9px] border-b pb-3">
                      <th className="pb-3">Farmer Details</th>
                      <th className="pb-3">Land Plot Coordinates</th>
                      <th className="pb-3">Crop / Soil</th>
                      <th className="pb-3 text-center">Rainfall Deficit</th>
                      <th className="pb-3 text-right">Escrow Payout</th>
                      <th className="pb-3 text-center">Status</th>
                      <th className="pb-3 text-right">Governance Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pendingClaims.map((claim) => (
                      <tr key={claim.id} className="hover:bg-slate-50/30 transition">
                        <td className="py-4">
                          <div className="font-bold text-slate-800">{claim.farmer_name}</div>
                          <div className="text-[10px] text-slate-404 font-semibold mt-0.5">Aadhaar: ****-****-9012</div>
                        </td>
                        <td className="py-4 font-mono text-[10px] text-slate-550">
                          {claim.location}
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-slate-700">{claim.crop_type}</div>
                          <div className="text-[10px] text-slate-404 font-semibold mt-0.5">{claim.soil_type} Soil</div>
                        </td>
                        <td className="py-4 text-center">
                          <span className="font-black text-red-550 bg-red-50 border border-red-150 px-2 py-0.5 rounded-full font-mono">
                            {claim.risk_score}% Deficit
                          </span>
                        </td>
                        <td className="py-4 text-right font-black text-slate-800">
                          ₹{claim.claim_payout?.toLocaleString() || '45,000'}
                        </td>
                        <td className="py-4 text-center">
                          {claim.approved ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.75 rounded-full text-[9px] font-black uppercase tracking-wider">Settled (DBT)</span>
                          ) : (
                            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.75 rounded-full text-[9px] font-black uppercase tracking-wider animate-[pulse_2s_infinite]">Awaiting BAO Signature</span>
                          )}
                        </td>
                        <td className="py-4 text-right">
                          {claim.approved ? (
                            <button disabled className="text-slate-400 bg-slate-50 border px-3 py-1.5 rounded-xl font-bold cursor-not-allowed">
                              Approved & Sent
                            </button>
                          ) : (
                            <button onClick={() => handleApproveClaim(claim.id)} className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-555 px-3 py-1.5 rounded-xl font-bold transition shadow-sm hover:shadow-emerald-650/10 cursor-pointer text-[11px]">
                              Approve & Sign DBT
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // MAIN DASHBOARD LAYOUT (IF LOGGED IN)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 pb-12 font-sans">
      {/* TOAST POSITIONED BOTTOM RIGHT */}
      {toast && (
        <div className={`fixed bottom-24 right-6 z-50 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all animate-[slideIn_0.3s_ease] flex items-center gap-3 max-w-sm no-print ${
          toast.type === 'warning' ? 'bg-amber-50/95 border-amber-250 text-amber-900' :
          toast.type === 'error' ? 'bg-red-50/95 border-red-250 text-red-900' :
          'bg-emerald-50/95 border-emerald-250 text-emerald-900'
        }`}>
          {toast.type === 'warning' ? <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" /> :
           toast.type === 'error' ? <XCircle className="h-5 w-5 text-red-650 shrink-0" /> :
           <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />}
          <div className="flex-grow text-xs font-bold leading-normal">{toast.msg}</div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg hover:bg-slate-100/50 transition">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* REAL-TIME PHONE NOTIFICATION CAPSULE */}
      {phoneAlert && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-55 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-start gap-3 animate-[slideIn_0.3s_ease] font-sans no-print">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 border border-emerald-500/20">
            <MessageSquare className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex-grow text-left">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-emerald-450 uppercase tracking-widest">{phoneAlert.title}</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase">Just Now</span>
            </div>
            <p className="text-[11px] text-slate-200 mt-1 leading-relaxed font-mono whitespace-pre-line">{phoneAlert.body}</p>
          </div>
          <button onClick={() => setPhoneAlert(null)} className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* DBT TRANSACTION PROCESSING CHECKLIST MODAL */}
      {dbtSimStep && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm no-print">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl text-left">
            <div className="flex items-center gap-3 mb-5 pb-2 border-b border-slate-100">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-150">
                <Wallet className="h-5 w-5 text-emerald-600 animate-bounce" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-850">Direct Benefit Transfer Pipeline</h3>
                <p className="text-[10px] text-slate-404 font-semibold">NPCI Gateway • Aadhaar Direct Payment Engine</p>
              </div>
            </div>

            {dbtSimStep !== 'success' ? (
              <div className="space-y-4 font-sans font-semibold">
                <p className="text-xs text-slate-550 mb-3 leading-relaxed">
                  Executing weather-index claims settlement rules. Please do not close this window while transaction signatures are compiled...
                </p>
                
                <div className="space-y-3">
                  {[
                    { id: 'init', label: 'NPCI Aadhaar Mapping', desc: 'Resolving landholder Aadhaar to bank account' },
                    { id: 'step1', label: 'Weather Index Verification', desc: 'Cross-checking weather oracles deficit feeds' },
                    { id: 'stepBAO', label: 'Block Officer Audit Approval', desc: 'Verifying District Officer multi-sig signature approval' },
                    { id: 'step2', label: 'Indian Bank Core Escrow Check', desc: 'Verifying sovereign claim reserve pools' },
                    { id: 'step3', label: 'Signing Payout Credit Voucher', desc: 'Generating cryptographic transfer approval' }
                  ].map((step, idx) => {
                    const stepStates = ['init', 'step1', 'stepBAO', 'step2', 'step3']
                    const currentIdx = stepStates.indexOf(dbtSimStep)
                    const isDone = currentIdx > idx
                    const isActive = dbtSimStep === step.id
                    
                    return (
                      <div key={idx} className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                        isActive ? 'bg-emerald-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-500/10' :
                        isDone ? 'bg-slate-50 border-slate-205' : 'opacity-40 border-transparent'
                      }`}>
                        {isDone ? (
                          <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : isActive ? (
                          <Loader2 className="h-5 w-5 text-emerald-600 animate-spin shrink-0 mt-0.5" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-slate-300 bg-slate-100 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className={`text-xs font-bold ${isActive ? 'text-slate-900 font-black' : isDone ? 'text-slate-705' : 'text-slate-400'}`}>
                            {step.label}
                          </p>
                          <p className="text-[10px] text-slate-404 font-semibold mt-0.5 leading-none">{step.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 animate-[slideIn_0.3s_ease] font-sans font-semibold">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-300 shadow-lg">
                  <CheckCircle className="h-10 w-10 text-emerald-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-black text-emerald-700">₹{(result?.claim_settlement?.total_payout || 45000).toLocaleString('en-IN')} Disbursed</h4>
                  <p className="text-xs text-slate-500 mt-1">Direct Benefit Transfer successfully credited to your RuPay account!</p>
                </div>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-left space-y-1.5 font-mono">
                  <div className="flex justify-between"><span className="text-slate-400 font-sans">Bank:</span><span className="text-slate-800 font-bold">Indian Bank Core</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-sans">Recipient Aadhaar:</span><span className="text-slate-800 font-bold">XXXX-XXXX-9284</span></div>
                  <div className="flex justify-between"><span className="text-slate-400 font-sans">Ref ID:</span><span className="text-slate-800 font-bold truncate max-w-[200px]">IBDBT{Math.floor(10000000 + Math.random()*90000000)}</span></div>
                </div>
                <div className="text-[10px] text-amber-700 font-semibold bg-amber-50 border border-amber-200/40 rounded-lg p-2.5 leading-relaxed text-left flex items-start gap-1.5">
                  <Info className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Demo Mode: Payment routing is simulated. In production, this integrates directly with the NPCI Aadhaar Payments Bridge (APB) API.</span>
                </div>
                <button onClick={() => setDbtSimStep(null)} className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-555 text-sm font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95">
                  Check RuPay Wallet Balance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Blockchain Oracle Ticker */}
      <LiveTicker />

      {/* USER CONTROL BAR */}
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-16 z-40 py-3 px-6 no-print shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-705 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm">
              <UserCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> {user.name} (Aadhaar Seeded)
            </span>
            <button onClick={handleLogout} className="text-xs font-bold text-red-655 hover:text-red-750 bg-red-50 hover:bg-red-100/70 border border-red-200/60 rounded-lg px-2.5 py-1.5 transition active:scale-95 shadow-sm">
              Logout
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg border border-slate-200 p-0.5 z-10 shadow-inner">
              {Object.keys(localTranslations).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded text-[10px] font-black transition uppercase ${lang === l ? 'bg-white text-emerald-600 shadow-sm border border-slate-200' : 'text-slate-505 hover:text-slate-805'}`}>
                  {l}
                </button>
              ))}
            </div>
            {result && (
              <>
                <VoiceAdvisory text={voiceText} lang={lang} t={t} />
                <button onClick={handleExportPDF} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-650 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition hover:scale-105 active:scale-95 shadow-sm"><Printer className="h-3.5 w-3.5" /> Print Certificate</button>
              </>
            )}
            {/* Mute Audio Toggle */}
            <button onClick={() => {
                const nextMute = !isMuted;
                setIsMuted(nextMute);
                localStorage.setItem('krishi_muted', nextMute ? '1' : '0');
                showToast(nextMute ? 'Audio muted (sound chimes disabled)' : 'Audio unmuted (sound chimes active)', 'info');
              }}
              title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
              className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-550 hover:text-slate-750 transition active:scale-95 shadow-sm flex items-center justify-center">
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-slate-400" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />}
            </button>
            <span className="flex items-center gap-1.5 text-xs text-slate-505 font-bold bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm"><Activity className="h-3.5 w-3.5 text-emerald-500 animate-pulse" /> Live Feed <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" /></span>
          </div>
        </div>
      </div>

      {/* DASHBOARD BODY */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[380px_1fr] gap-8 no-print">
        
        {/* LEFT PANEL — CONTROLS */}
        <aside className="space-y-6 lg:sticky lg:top-24 pb-6">
          <form onSubmit={handleAnalyze} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 text-left shadow-sm">
            <h2 className="text-sm font-bold tracking-wider text-slate-855 uppercase flex items-center gap-2"><FileWarning className="h-4 w-4 text-emerald-600" /> {t.auditHeader}</h2>
            
            {/* Geolocation Tabs */}
            <div className="space-y-3.5">
              <label className="flex items-center gap-2 text-xs text-slate-505 font-bold"><MapPin className="h-3.5 w-3.5 text-emerald-600" /> {t.findCoords}</label>
              
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
                <button type="button" onClick={() => setLocTab('gps')} className={`py-1.5 rounded text-[10px] font-black transition ${locTab === 'gps' ? 'bg-white text-emerald-700 border border-slate-200 shadow-sm' : 'text-slate-505 hover:text-slate-850'}`}>Live GPS</button>
                <button type="button" onClick={() => setLocTab('pincode')} className={`py-1.5 rounded text-[10px] font-black transition ${locTab === 'pincode' ? 'bg-white text-emerald-700 border border-slate-200 shadow-sm' : 'text-slate-505 hover:text-slate-855'}`}>{t.pin.split(' ')[1]}</button>
                <button type="button" onClick={() => setLocTab('map')} className={`py-1.5 rounded text-[10px] font-black transition ${locTab === 'map' ? 'bg-white text-emerald-700 border border-slate-200 shadow-sm' : 'text-slate-505 hover:text-slate-855'}`}>Pin Map</button>
              </div>

              {locTab === 'gps' && (
                <button type="button" onClick={handleGPSLookup} className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-xs font-black text-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm">
                  <Compass className="h-4 w-4 text-emerald-600 animate-spin-slow" /> {t.locate}
                </button>
              )}

              {locTab === 'pincode' && (
                <div className="flex gap-2">
                  <input type="text" maxLength={6} value={pincode} onChange={handlePincodeSearch}
                    className="w-full rounded-xl bg-slate-50 border border-slate-205 px-3.5 py-2.5 text-xs text-slate-850 placeholder-slate-455 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-inner font-bold"
                    placeholder="Enter 6-digit PIN" />
                </div>
              )}

              {locTab === 'map' && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200/50 p-3 text-[10px] text-emerald-800 leading-relaxed flex items-start gap-1.5 shadow-sm font-semibold">
                  <Info className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Click anywhere on the light map container to the right. The marker will automatically geocode to your selected farm parcel coordinates.</span>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold block mb-1">{t.currentAddress}</span>
                <p className="text-xs text-slate-805 font-bold leading-normal bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 shadow-inner">{location}</p>
                <div className="flex justify-between text-[10px] text-slate-505 mt-1.5 font-mono bg-slate-100/50 px-2.5 py-1.5 rounded-lg border border-slate-200 font-semibold">
                  <span>Lat: {lat.toFixed(4)}° N</span>
                  <span>Lng: {lng.toFixed(4)}° E</span>
                </div>
              </div>
            </div>

            {/* Crop selection */}
            <div>
              <label className="flex items-center gap-2 text-xs text-slate-505 mb-2 font-bold"><Sprout className="h-3.5 w-3.5 text-emerald-600" /> {t.insuredCrop}</label>
              <div className="grid grid-cols-3 gap-2">
                {CROP_TYPES.map(c => (
                  <button key={c} type="button" onClick={() => setCropType(c)} className={`py-2.5 rounded-xl text-xs font-bold border transition-all hover:scale-[1.02] active:scale-[0.98] ${cropType === c ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm font-black' : 'bg-slate-50 border-slate-200 text-slate-655 hover:border-slate-300'}`}>
                    {CROP_TRANSLATIONS[lang]?.[c] || c}
                  </button>
                ))}
              </div>
            </div>

            {/* Soil type */}
            <div>
              <label className="flex items-center gap-2 text-xs text-slate-505 mb-1.5 font-bold"><Layers className="h-3.5 w-3.5 text-emerald-600" /> {t.soilProfiling}</label>
              <div className="relative">
                <button type="button" onClick={() => setSoilDropdownOpen(!soilDropdownOpen)}
                  className="w-full rounded-xl bg-slate-50 border border-slate-205 text-sm px-3.5 py-2.5 text-slate-850 font-bold text-left focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition flex items-center justify-between shadow-sm">
                  <span>{SOIL_TRANSLATIONS[lang]?.[soilType] || soilType}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${soilDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {soilDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1.5 z-45 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl text-left font-semibold">
                    {SOIL_TYPES.map(s => (
                      <button key={s} type="button"
                        onClick={() => { setSoilType(s); setSoilDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                          soilType === s ? 'bg-emerald-50 text-emerald-700 font-black' : 'text-slate-655 hover:bg-slate-50'
                        }`}>
                        <span>{SOIL_TRANSLATIONS[lang]?.[s] || s}</span>
                        {soilType === s && <CheckCircle className="h-4 w-4 text-emerald-650" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sowing Date Sensitivity Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                <label className="flex items-center gap-1.5 text-slate-505"><Clock className="h-3.5 w-3.5 text-emerald-600" /> {t.sowingShift}</label>
                <span className="text-emerald-700 font-black">
                  {sowingShift === 0 ? 'Standard' : sowingShift > 0 ? `+${sowingShift} Week` : `${sowingShift} Week`}
                </span>
              </div>
              <input type="range" min="-2" max="2" value={sowingShift} onChange={e => setSowingShift(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-bold"><span>-2w Early</span><span>Standard</span><span>+2w Delay</span></div>
            </div>

            {/* Mid-Season Monitoring Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
              <div className="text-left max-w-[80%]">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-emerald-600" /> {t.midSeason}</span>
                <p className="text-[10px] text-slate-450 mt-0.5 leading-tight font-semibold">{t.midSeasonDesc}</p>
              </div>
              <input type="checkbox" checked={activeMidSeason} onChange={e => setActiveMidSeason(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
            </div>

            <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-555 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3.5 text-sm font-black text-white transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-emerald-600/10">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> {t.fetchingFeeds}</> : <>{t.runAudit} <ArrowRight className="h-4 w-4" /></>}
            </button>

            {result && (
              <button type="button" onClick={() => setShowPremium(true)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-50 hover:bg-violet-100 border border-violet-200 px-4 py-2.5 text-sm font-bold text-violet-750 transition-all hover:scale-[1.01] active:scale-[0.99]">
                <Calculator className="h-4 w-4 text-violet-650" /> {t.evCalculator}
              </button>
            )}

            <div className="pt-3 border-t border-slate-100">
              <p className="text-[10px] text-slate-405 uppercase tracking-wider mb-2 flex items-center gap-1 font-bold"><Database className="h-3 w-3" /> {t.oracleGrid}</p>
              <div className="flex flex-wrap gap-1.5">
                {['IMD NOAA','ISRO Bhuvan','NIC Agnet','Groq LLama 3.3','Chainlink Oracle','Indian Bank Core'].map(s => (
                  <span key={s} className="text-[9px] px-2 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200 font-bold flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-550 animate-pulse" /> {s}
                  </span>
                ))}
              </div>
            </div>
          </form>

          {/* Aadhaar DBT RuPay Card-Style Wallet */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-600/10 bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 p-5 text-left text-white shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <div className="h-7 w-9 rounded bg-amber-500/80 border border-amber-600/35 relative overflow-hidden">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-amber-700/50" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-700/50" />
                </div>
                <span className="text-[8px] tracking-widest text-emerald-200 font-mono font-bold block">KRISHI SECURE</span>
              </div>
              <span className="text-xs font-black italic tracking-wider text-emerald-300 flex items-center gap-1">
                RuPay <span className="text-[8px] font-normal not-italic px-1.5 py-0.5 rounded bg-white/10 font-bold">SELECT</span>
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-[9px] text-emerald-200 uppercase tracking-widest font-bold block mb-0.5">DIRECT BENEFIT BALANCE</span>
                <p className="text-2xl font-black text-white tracking-tight">₹{walletBalance.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="space-y-0.5">
                  <span className="text-[8px] text-emerald-300 font-mono block">Aadhaar Linked Account</span>
                  <span className="text-[10px] text-white font-mono tracking-widest">{user.aadhaar.replace(/.(?=.{4})/g, '*')}</span>
                </div>
                <span className="text-[9px] text-emerald-300 font-mono font-bold">EXP: 12/32</span>
              </div>
            </div>
            
            {result?.parametric_trigger && !hasPaidClaim && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <button onClick={simulateDBTPayout} className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 text-xs font-black text-emerald-800 border border-emerald-250/60 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-sm">
                  <CircleDollarSign className="h-4 w-4 animate-bounce text-emerald-600" /> Disburse DBT to Bank
                </button>
              </div>
            )}
            
            <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
              <p className="text-[9px] text-emerald-200 font-bold uppercase tracking-wider">Transaction Ledger</p>
              <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1 scrollbar-thin">
                {walletHistory.map(item => (
                  <div key={item.id} className="flex justify-between items-center p-2 rounded-lg bg-white/10 border border-white/10 text-[9px] font-semibold">
                    <div className="text-left">
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-emerald-200 font-mono text-[8px]">{item.ref} • {item.date}</p>
                    </div>
                    <span className="text-white font-bold font-mono">+₹{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT PANEL — ANALYTICS RESTURED INTO TABS */}
        <section className="space-y-6">
          
          {/* Dashboard Main Stats Banner (always visible on audit loads) */}
          {result && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left no-print">
              <div className="rounded-xl border border-slate-205 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-bold"><Activity className="h-3.5 w-3.5 text-emerald-605" />{t.auditHeader.split(' ')[1]} Score</div><p className="text-xl font-black text-slate-800">{result.risk_score}</p></div>
              <div className="rounded-xl border border-slate-205 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-bold"><Zap className={`h-3.5 w-3.5 ${result.parametric_trigger ? 'text-red-500' : 'text-emerald-500'}`} />{t.forceDBT.split(' ')[1]}</div><p className={`text-xl font-black ${result.parametric_trigger ? 'text-red-655 font-extrabold' : 'text-emerald-655'}`}>{result.parametric_trigger ? 'ACTIVE' : 'INACTIVE'}</p></div>
              <div className="rounded-xl border border-slate-205 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-bold"><Droplets className="h-3.5 w-3.5 text-blue-500" />{t.deficitLabel.split(' ')[1]}</div><p className="text-xl font-black text-blue-650">{Math.round(result.weather_data.reduce((a, d) => a + ((d.historical_rain_mm - d.forecasted_rain_mm) / d.historical_rain_mm) * 100, 0) / result.weather_data.length)}%</p></div>
              <div className="rounded-xl border border-slate-205 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-bold"><Landmark className="h-3.5 w-3.5 text-amber-500" />{t.governmentSchemes.split(' ')[1]}</div><p className="text-xl font-black text-amber-600">{result.govt_schemes?.length || 0}</p></div>
            </div>
          )}

          {/* Tab Navigation for Right Panel */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 sticky top-[72px] bg-slate-50/90 backdrop-blur-md z-30 pt-2 no-print">
            {[
              { id: 'audit', label: 'Audit & DBT', icon: Shield, desc: 'Gauge, Map, Timeline' },
              { id: 'analytics', label: 'Climate Analytics', icon: BarChart3, desc: 'Rainfall/Temp feeds' },
              { id: 'soil', label: 'Soil & Crops', icon: Sprout, desc: 'NPK, Alternative crops' },
              { id: 'schemes', label: 'Govt Schemes', icon: Landmark, desc: 'Schemes, Heatmap' },
              { id: 'logs', label: 'Ledgers & Code', icon: Cpu, desc: 'Smart contract code, SMS' }
            ].map(tab => {
              const TabIcon = tab.icon
              const isDisabled = !result && tab.id !== 'audit'
              return (
                <button key={tab.id}
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setActiveRightTab(tab.id)}
                  title={isDisabled ? '⚠️ Run "Run Climate Assessment" in the left controls sidebar first to unlock' : ''}
                  className={`flex-1 min-w-[130px] px-3.5 py-2 rounded-xl text-xs font-bold text-left border transition-all ${
                    isDisabled
                      ? 'bg-slate-100/50 text-slate-300 border-slate-150 cursor-not-allowed opacity-60'
                      : activeRightTab === tab.id
                        ? 'bg-white text-emerald-700 border-emerald-500/30 shadow-md shadow-emerald-500/5 font-black ring-1 ring-emerald-500/10 hover:scale-[1.01]'
                        : 'bg-white/50 text-slate-500 hover:text-slate-800 border-slate-200 hover:bg-white hover:scale-[1.01]'
                  } flex items-start gap-2`}>
                  <TabIcon className={`h-4 w-4 shrink-0 mt-0.5 ${isDisabled ? 'text-slate-300' : 'text-emerald-600/80'}`} />
                  <div className="min-w-0">
                    <span className="block font-bold truncate">{tab.label}</span>
                    <span className="text-[9px] text-slate-404 font-semibold block mt-0.5 truncate">{tab.desc}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* TAB CONTENT: AUDIT */}
          {activeRightTab === 'audit' && (
            <div className="space-y-6 transition-all duration-300">
              {liveWeather && <LiveWeatherFeed weather={liveWeather} location={location} />}

              {/* Geocoding Map Visual Container */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden p-1 shadow-sm">
                <div className="flex items-center justify-between px-4 py-3 bg-white text-left">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-600 animate-spin-slow" />
                    <span className="text-xs font-bold text-slate-800">Live Farm Satellite Mapping (Interactive Leaflet Map)</span>
                  </div>
                  {mapLayer !== 'none' && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-250 font-bold animate-pulse">
                      Satellite Radar Active
                    </span>
                  )}
                </div>
                
                <div ref={mapRef} className="w-full h-[280px] bg-slate-50 relative z-10" />

                {/* Map Layer Selector */}
                <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-slate-50 border-t border-slate-200/80">
                  <span className="text-[10px] text-slate-505 font-bold uppercase tracking-wider">Satellite Radar Overlays:</span>
                  <button type="button" onClick={() => setMapLayer('none')} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition ${mapLayer === 'none' ? 'bg-white text-slate-805 border-slate-300 shadow-sm font-black' : 'text-slate-505 hover:text-slate-705 bg-white/20 border-transparent'}`}>Standard Map</button>
                  <button type="button" onClick={() => setMapLayer('ndvi')} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition ${mapLayer === 'ndvi' ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm font-black' : 'text-slate-505 hover:text-slate-705 bg-white/20 border-transparent'}`}>NDVI Crop Health</button>
                  <button type="button" onClick={() => setMapLayer('rain')} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition ${mapLayer === 'rain' ? 'bg-red-50 text-red-700 border-red-300 shadow-sm font-black' : 'text-slate-505 hover:text-slate-705 bg-white/20 border-transparent'}`}>Precipitation Deficit</button>
                  <button type="button" onClick={() => setMapLayer('moisture')} className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition ${mapLayer === 'moisture' ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-sm font-black' : 'text-slate-505 hover:text-slate-705 bg-white/20 border-transparent'}`}>Soil Moisture Index</button>
                </div>
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
                    <Shield className="h-6 w-6 text-emerald-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-sm text-slate-655 animate-pulse font-bold">Querying Meteorological Satellite Arrays...</p>
                  <p className="text-xs text-slate-400">Running Groq AI LLaMA 3.3 models + Indexing PMFBY crop records...</p>
                </div>
              )}

              {!loading && !result && (
                <div className="flex flex-col items-center justify-center py-28 text-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm font-sans font-semibold">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner"><Shield className="h-8 w-8 text-emerald-600/60" /></div>
                  <h3 className="text-slate-805 font-bold text-base font-black">Ready for Assessment</h3>
                  <p className="text-slate-500 text-xs max-w-sm leading-relaxed">Use GPS or enter an Indian pincode to locate your farmland, select your crop profile, and launch the audit.</p>
                </div>
              )}

              {result && (
                <>
                  {/* Gauge & Underwriting Decision */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center shadow-sm">
                      <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">{t.growthStagesTitle.split(' ')[0]} {t.deficitLabel.split(' ')[1]}</h3>
                      <RiskGauge score={result.risk_score} labelText={t.auditHeader.split(' ')[1]} triggerText={result.risk_score > 65 ? 'CRITICAL' : result.risk_score > 40 ? 'MODERATE' : 'LOW'} />
                      <p className="text-[11px] text-slate-505 mt-3 text-center font-semibold">Water need: {result.crop_profile.water_need} | Sowing alignment factored</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between text-left shadow-sm">
                      <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{t.payoutVerification} Decision</h3>
                      
                      <div className={`flex items-center gap-3 rounded-xl p-4 border ${result.recommendation.toLowerCase().includes('safe') ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' : 'bg-red-50 border-red-200 text-red-800 shadow-sm'}`}>
                        {result.recommendation.toLowerCase().includes('safe') ? <CheckCircle className="h-8 w-8 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-8 w-8 text-red-500 shrink-0" />}
                        <div>
                          <p className={`text-lg font-black ${result.recommendation.toLowerCase().includes('safe') ? 'text-emerald-700' : 'text-red-750'}`}>{result.recommendation}</p>
                          <p className="text-xs text-slate-505 mt-0.5 font-semibold">Based on IMD climate models and satellite weather data</p>
                        </div>
                      </div>

                      {/* Sowing Shift Sensitivity explain */}
                      <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2.5">
                        <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"><Brain className="h-4 w-4 text-emerald-650" /> Climate Risk Explainability Panel</h4>
                        <ul className="space-y-1.5 text-xs text-slate-600 font-semibold">
                          <li className="flex items-start gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" /><span>ENSO Cycle: <span className="font-bold text-red-705">{result.enso_state || 'El Niño (Active)'}</span> is active, elevating base dry-spell probability by +15%.</span></li>
                          {result.microclimate_variance !== 0 && (
                            <li className="flex items-start gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" /><span>Hyperlocal Satellite Offset: NASA POWER/CHIRPS geocoding shows a <span className="font-bold text-slate-800">{result.microclimate_variance > 0 ? '+' : ''}{result.microclimate_variance}% variance</span> from district-average climate indices.</span></li>
                          )}
                          {sowingShift !== 0 && (
                            <li className="flex items-start gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" /><span>{t.sowingShift}: Delaying sowing altered crop vegetative stage exposure by <span className={`font-bold ${result.sowing_modifier > 0 ? 'text-red-700' : 'text-emerald-700'}`}>{result.sowing_modifier}%</span>.</span></li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Blockchain Claim Settlement Pipeline */}
                  {result.claim_settlement && <ClaimSettlementTimeline settlement={result.claim_settlement} onSimulateDBT={simulateDBTPayout} hasPaidClaim={hasPaidClaim} t={t} />}
                </>
              )}
            </div>
          )}

          {/* TAB CONTENT: ANALYTICS */}
          {activeRightTab === 'analytics' && result && (
            <div className="space-y-6 transition-all duration-300 text-left">
              
              {/* Climate Charts tab layout */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-2"><BarChart3 className="h-4 w-4 text-emerald-605" /> Climate Analytics Charts</h3>
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5"><Droplets className="h-3.5 w-3.5 text-blue-500" /> {t.deficitLabel}</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={result.weather_data}>
                        <defs>
                          <linearGradient id="hG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                          <linearGradient id="fG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#cbd5e1' }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#cbd5e1' }} unit="mm" />
                        <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, color: '#0f172a', fontSize: 12 }} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Area type="monotone" dataKey="historical_rain_mm" name="Historical" stroke="#3b82f6" fill="url(#hG)" strokeWidth={2} />
                        <Area type="monotone" dataKey="forecasted_rain_mm" name="Forecasted" stroke="#22c55e" fill="url(#fG)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1.5"><Thermometer className="h-3.5 w-3.5 text-orange-500" /> {t.tempLabel}</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={result.weather_data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#cbd5e1' }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={{ stroke: '#cbd5e1' }} unit="°C" domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, color: '#0f172a', fontSize: 12 }} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Bar dataKey="historical_temp_c" name="Historical" fill="#6366f1" radius={[3,3,0,0]} />
                        <Bar dataKey="forecasted_temp_c" name="Forecasted" fill="#f97316" radius={[3,3,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* NASA POWER Crop Energy Diagnostics */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-500 animate-spin-slow" /> {t.nasaHeader}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.solarLabel}</p>
                    <p className="text-sm font-extrabold text-slate-800">18.4 MJ/m²/day</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold mt-1 inline-block">{t.optimalPhoto}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.soilTempLabel}</p>
                    <p className="text-sm font-extrabold text-slate-800">28.6 °C</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold mt-1 inline-block font-semibold">{t.rootThermal}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.humidityLabel}</p>
                    <p className="text-sm font-extrabold text-slate-800">68% RH</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold mt-1 inline-block font-semibold">{t.lowCanopy}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{t.evapoLabel}</p>
                    <p className="text-sm font-extrabold text-slate-800">4.2 mm/day</p>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold mt-1 inline-block font-semibold">{t.modTrans}</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1.5 font-semibold">
                  <Info className="h-3.5 w-3.5 text-slate-400" /> {t.nasaFooter}
                </p>
              </div>

              {/* 5-Year Historical Risk Trend */}
              {result.historical_trend && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                  <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-1 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-amber-500" /> {t.trendHeader}</h3>
                  <p className="text-[11px] text-slate-404 mb-4 font-bold">{t.trendSub}</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={result.historical_trend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#cbd5e1' }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#cbd5e1' }} domain={[0, 100]} />
                      <ReferenceLine y={65} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Trigger Line', fill: '#ef4444', fontSize: 10, position: 'right' }} />
                      <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, color: '#0f172a', fontSize: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                      <Line type="monotone" dataKey="risk_score" name="Risk Score" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-5 gap-2 mt-3 text-center">
                    {result.historical_trend.map(y => (
                      <div key={y.year} className={`rounded-xl p-2 border ${y.payout_triggered ? 'bg-red-50 border-red-200 text-red-755 shadow-sm font-semibold' : 'bg-emerald-50 border-emerald-200 text-emerald-755 shadow-sm font-semibold'}`}>
                        <p className="text-xs text-slate-500 font-bold">{y.year}</p>
                        <p className="text-sm font-black">{y.risk_score}</p>
                        <p className="text-[9px] text-slate-505 truncate font-semibold">{y.events[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Growth Stages Weather mapping cards */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                <h3 className="text-xs font-bold tracking-widest text-slate-800 uppercase mb-4 flex items-center gap-2"><Sprout className="h-4 w-4 text-emerald-600" /> {t.growthStagesTitle}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {result.weather_data.map((d, i) => {
                    const deficit = ((d.historical_rain_mm - d.forecasted_rain_mm) / d.historical_rain_mm * 100).toFixed(0)
                    const stressed = deficit > 30
                    return (
                      <div key={i} className={`rounded-xl border p-3 shadow-sm ${stressed ? 'bg-red-50/50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                        <p className="text-xs text-slate-405 mb-1 font-bold">{d.month} — {d.growth_stage}</p>
                        <p className="text-lg font-black text-slate-800">{d.forecasted_rain_mm}<span className="text-xs text-slate-404 font-semibold ml-1">mm</span></p>
                        <div className="flex items-center gap-1 mt-1">{stressed ? <><AlertTriangle className="h-3 w-3 text-red-500" /><span className="text-[11px] text-red-655 font-bold">{deficit}% deficit</span></> : <><CheckCircle className="h-3 w-3 text-emerald-600" /><span className="text-[11px] text-emerald-655 font-bold">{deficit}% deficit</span></>}</div>
                        <p className="text-[11px] text-slate-500 mt-1 font-bold">{d.forecasted_temp_c}°C | {d.humidity_pct}% RH</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SOIL & CROPS */}
          {activeRightTab === 'soil' && result && (
            <div className="space-y-6 transition-all duration-300 text-left">
              {/* Soil card */}
              <SoilHealthCard soilHealth={result.soil_health} soilType={soilType} t={t} />

              {/* Economic & Hydrology peripheral feed card */}
              <MandiWRISCard cropType={cropType} lang={lang} />

              {/* Comparative alternative crop grid */}
              {result.risk_score > 50 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                  <h3 className="text-xs font-bold tracking-widest text-slate-850 uppercase mb-2 flex items-center gap-2"><Sprout className="h-4 w-4 text-emerald-600" /> Comparative Crop Risk Analysis</h3>
                  <p className="text-[11px] text-slate-404 mb-4 font-bold">Risk is elevated for your default crop choice. Consider these climate-hardy alternative species for this block:</p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-xl border border-red-200 bg-red-50/20 p-3.5 text-center shadow-inner">
                      <p className="text-xs font-bold text-slate-700">{CROP_TRANSLATIONS[lang]?.[cropType] || cropType} (Current)</p>
                      <p className="text-xl font-black text-red-655 mt-1">{result.risk_score}%</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold mt-1.5 inline-block">High Vulnerability</span>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50/20 p-3.5 text-center">
                      <p className="text-xs font-bold text-slate-700">{cropType === 'Rice' ? (CROP_TRANSLATIONS[lang]?.Maize || 'Maize') : (CROP_TRANSLATIONS[lang]?.Wheat || 'Wheat')}</p>
                      <p className="text-xl font-black text-amber-655 mt-1">{Math.round(result.risk_score * 0.6)}%</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold mt-1.5 inline-block font-semibold">Moderate Risk</span>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/20 p-3.5 text-center">
                      <p className="text-xs font-bold text-slate-700">Millets / Sorghum</p>
                      <p className="text-xl font-black text-emerald-655 mt-1">{Math.round(result.risk_score * 0.25)}%</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold mt-1.5 inline-block font-semibold">Climate hardy</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: GOVT SCHEMES */}
          {activeRightTab === 'schemes' && result && (
            <div className="space-y-6 transition-all duration-300 text-left">
              {/* Matched schemes */}
              <GovtSchemesPanel schemes={result.govt_schemes} t={t} />

              {/* India heatmap */}
              <IndiaHeatmap stateRisks={stateRisks} t={t} />
            </div>
          )}

          {/* TAB CONTENT: LEDGER & ORACLES */}
          {activeRightTab === 'logs' && result && (
            <div className="space-y-6 transition-all duration-300 text-left">
              {/* Solidity smart contract compilation code */}
              <SolidityViewer cropType={cropType} location={location} triggered={result.parametric_trigger} payout={result.claim_settlement?.total_payout || 45000} />

              {/* SMS alert simulated dispatch logs */}
              <AlertDispatch messages={result.alert_messages} onTriggerAlert={triggerPushNotification} isMuted={isMuted} />

              {/* Archived history list */}
              <AuditHistoryLogs history={historyList} onSelectAudit={handleSelectAudit} t={t} />
            </div>
          )}
          
        </section>
      </main>

      {/* Premium Modal */}
      {showPremium && result && <PremiumModal premium={result.premium_breakdown} cropType={cropType} hectares={2} sumPerHa={50000} onClose={() => setShowPremium(false)} t={t} />}

      {/* HIGH-FIDELITY CERTIFICATE-STYLE GOVERNMENT PRINTABLE REPORT */}
      {result && (
        <div className="hidden print:block p-6 bg-white text-slate-900 text-left font-sans max-w-4xl mx-auto border-[10px] border-double border-slate-800 rounded-none relative" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          {/* Govt Crest Watermark representation */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0">
            <Shield className="w-80 h-80 text-slate-900" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center border-b-4 border-slate-850 pb-4">
              <h1 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Government of India • भारत सरकार</h1>
              <h2 className="text-sm font-black tracking-wide text-slate-900 mt-1">MINISTRY OF AGRICULTURE & FARMERS WELFARE</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">कृषि एवं किसान कल्याण मंत्रालय</p>
              
              <h3 className="text-lg font-black text-emerald-800 uppercase tracking-wider mt-4">PARAMETRIC WEATHER-INDEX CROP AUDIT CERTIFICATE</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">मौसम-सूचकांक फसल जोखिम लेखापरीक्षा प्रमाण पत्र</p>
            </div>

            {/* Audit Details Grid */}
            <div className="grid grid-cols-2 gap-6 text-xs font-semibold leading-relaxed border-b border-slate-200 pb-4">
              <div className="space-y-2">
                <p><span className="text-slate-500 uppercase text-[9px] block">Certificate / Audit ID</span> <span className="font-mono font-bold text-emerald-800 text-sm">{result.assessment_id}</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">Landholder Name (कृषक नाम)</span> <span className="text-slate-900">{user.name}</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">Linked Aadhaar (आधार संख्या)</span> <span className="font-mono">XXXX-XXXX-9284</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">Farm Coordinate Block (भूखंड निर्देशांक)</span> <span className="font-mono text-slate-700">{lat.toFixed(4)}° N, {lng.toFixed(4)}° E</span></p>
              </div>
              <div className="space-y-2 text-right">
                <p><span className="text-slate-500 uppercase text-[9px] block">Date of Issue (जारी करने की तिथि)</span> <span className="text-slate-900">{new Date(result.timestamp).toLocaleDateString('en-IN')}</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">Insured Crop Species (बीमाकृत फसल)</span> <span className="text-slate-900">{CROP_TRANSLATIONS[lang]?.[cropType] || cropType}</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">Cultivated Land Cover (कृषि योग्य भूमि)</span> <span className="text-slate-900">2.0 Hectares (Ha)</span></p>
                <p><span className="text-slate-500 uppercase text-[9px] block">State Jurisdiction (राज्य क्षेत्र)</span> <span className="text-slate-950 font-bold">{location}</span></p>
              </div>
            </div>

            {/* Actuarial Metrics table */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">PARAMETRIC ACTUARIAL AUDIT MATRIX</h4>
              <div className="rounded-xl border border-slate-300 overflow-hidden bg-slate-50/50">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-200/80 border-b border-slate-350 text-slate-700 font-bold uppercase tracking-wider">
                      <th className="py-2 px-3">Weather Parameter</th>
                      <th className="py-2 px-3 text-center">Breach Trigger Threshold</th>
                      <th className="py-2 px-3 text-center">Actual Measured Deficit</th>
                      <th className="py-2 px-3 text-right">Settlement Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300 text-slate-800 font-semibold">
                    <tr>
                      <td className="py-2.5 px-3">Precipitation Deficit (Rainfall Index)</td>
                      <td className="py-2.5 px-3 text-center">&gt; 40.0% Deficit</td>
                      <td className="py-2.5 px-3 text-center font-bold text-red-700">
                        {Math.round(result.weather_data.reduce((a, d) => a + ((d.historical_rain_mm - d.forecasted_rain_mm) / d.historical_rain_mm) * 100, 0) / result.weather_data.length)}% Deficit
                      </td>
                      <td className="py-2.5 px-3 text-right font-black text-red-700">
                        {result.parametric_trigger ? 'TRIGGERED' : 'INACTIVE'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">Crop Failure Probability Index</td>
                      <td className="py-2.5 px-3 text-center">&gt; 65 Risk Score</td>
                      <td className="py-2.5 px-3 text-center font-bold">{result.risk_score} Score</td>
                      <td className="py-2.5 px-3 text-right font-bold">
                        {result.risk_score > 65 ? 'EXCEEDED' : 'NORMAL'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3">Parametric DBT Claim Payout</td>
                      <td className="py-2.5 px-3 text-center">—</td>
                      <td className="py-2.5 px-3 text-center font-mono">—</td>
                      <td className="py-2.5 px-3 text-right font-black text-emerald-700 text-sm">
                        ₹{(result.claim_settlement?.total_payout || 45000).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signature & Seal Blocks */}
            <div className="grid grid-cols-2 gap-12 pt-6 text-center text-xs font-semibold leading-relaxed">
              <div className="space-y-1">
                <div className="h-px bg-slate-400 mx-auto w-3/4 mb-1" />
                <p className="text-slate-800 uppercase text-[9px] tracking-wider font-bold">Underwriting Officer</p>
                <p className="text-[9px] text-slate-400">KrishiShield Parametric Escrow Authority</p>
              </div>

              <div className="space-y-1">
                <div className="h-px bg-slate-400 mx-auto w-3/4 mb-1" />
                <p className="text-slate-800 uppercase text-[9px] tracking-wider font-bold">Chief Meteorological Officer</p>
                <p className="text-[9px] text-slate-400">India Meteorological Department (IMD)</p>
              </div>
            </div>

            {/* Disclaimer & stamp */}
            <div className="pt-4 text-center text-[9px] text-slate-450 leading-relaxed font-semibold">
              <p>This is a computer-generated weather-index audit report card issued in compliance with PMFBY parametric insurance terms.</p>
              <p className="font-mono mt-1 text-slate-550">Indian Bank DBT Settlement Transaction Hash: {result.claim_settlement?.txn_hash || '0x7f3a91b2c4d5e6f7890a1b2c3d4e5f6a7b8c9d0e'}</p>
            </div>
          </div>
        </div>
      )}

      {/* KRISHI AI CHATBOT COPILOT FLOATING BUTTON & BOX */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        {!chatOpen ? (
          <button onClick={() => setChatOpen(true)} className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-transform hover:scale-105 active:scale-95 border border-emerald-500/20">
            <MessageSquare className="h-6 w-6" />
          </button>
        ) : (
          <div className="w-80 sm:w-96 h-[420px] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col transition-all text-left">
            {/* Chat header */}
            <div className="bg-emerald-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
                <div>
                  <h3 className="text-xs font-bold text-slate-805">Krishi AI Crop Advisor</h3>
                  <p className="text-[9px] text-emerald-650 font-bold uppercase tracking-wider">Groq LLaMA 3.3 Active</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-404 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100"><X className="h-4 w-4" /></button>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-600/5 font-bold' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm font-semibold'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-400 rounded-2xl p-3 text-xs flex items-center gap-2 rounded-bl-none shadow-sm font-semibold">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" /> Consultating LLaMA...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick questions list */}
            <div className="px-4 py-1.5 border-t border-slate-200 bg-white flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none shadow-inner">
              {[
                'How to handle dry spell?',
                'Best crops for Loamy?',
                'Aadhaar DBT status?'
              ].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }} className="text-[9px] bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1 text-slate-650 transition shrink-0 font-bold font-sans">
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 flex gap-2 bg-white">
              <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                placeholder="Type your agricultural query..." />
              <button type="submit" disabled={chatLoading} className="bg-emerald-600 hover:bg-emerald-555 text-white rounded-lg px-3 py-2 transition disabled:opacity-50 hover:scale-105 active:scale-95">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  )
}
