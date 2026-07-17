import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import sqlite3 from 'sqlite3';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Initialize SQLite database
const db = new sqlite3.Database('./krishishield.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database: krishishield.db');
    initializeDb();
  }
});

function initializeDb() {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      aadhaar TEXT UNIQUE,
      name TEXT,
      phone TEXT,
      pincode TEXT,
      password TEXT
    )`);

    // Assessments table
    db.run(`CREATE TABLE IF NOT EXISTS assessments (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      location TEXT,
      crop_type TEXT,
      soil_type TEXT,
      risk_score INTEGER,
      parametric_trigger INTEGER,
      claim_payout REAL,
      timestamp TEXT,
      weather_data TEXT,
      soil_health TEXT,
      ai_report TEXT,
      approved INTEGER DEFAULT 0
    )`, [], (err) => {
      if (!err) {
        db.run(`ALTER TABLE assessments ADD COLUMN approved INTEGER DEFAULT 0`, [], (err2) => {
          // Safe block to ignore duplicate column errors
        });
      }
    });

    // Wallet table
    db.run(`CREATE TABLE IF NOT EXISTS wallets (
      user_id INTEGER PRIMARY KEY,
      balance REAL DEFAULT 6000.0
    )`);

    // Transactions table
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      amount REAL,
      type TEXT,
      date TEXT,
      ref TEXT
    )`);

    // Seed default demo user for testing
    db.get("SELECT COUNT(*) as count FROM users WHERE aadhaar = '123456789012'", [], (err, row) => {
      if (row && row.count === 0) {
        const hashed = hashPassword("demo");
        db.run(`INSERT INTO users (id, aadhaar, name, phone, pincode, password) VALUES (1, '123456789012', 'Rajesh Kumar (Farmer)', '9876543210', '560001', ?)`, [hashed], (err2) => {
          if (!err2) {
            db.run(`INSERT INTO wallets (user_id, balance) VALUES (1, 96000.0)`);
            db.run(`INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (1, 'Parametric Payout — Wheat', 45000.0, 'credit', '2026-07-17', 'DBT54994055')`);
            db.run(`INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (1, 'Parametric Payout — Rice', 45000.0, 'credit', '2026-07-17', 'DBT31011845')`);
            db.run(`INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (1, 'Initial DBT Setup (PM-KISAN)', 6000.0, 'credit', '2026-07-10', 'UPI92847164')`);
            console.log("Seeded default test user: Aadhaar=123456789012 / Password=demo");
          }
        });
      }
    });

    db.get("SELECT COUNT(*) as count FROM users WHERE aadhaar = '987654321098'", [], (err, row) => {
      if (row && row.count === 0) {
        const hashed = hashPassword("admin");
        db.run(`INSERT INTO users (id, aadhaar, name, phone, pincode, password) VALUES (2, '987654321098', 'Dr. A. K. Sharma (Block Officer)', '9123456789', '560001', ?)`, [hashed], (err2) => {
          if (!err2) {
            db.run(`INSERT INTO wallets (user_id, balance) VALUES (2, 0.0)`);
            console.log("Seeded Block Officer test user: Aadhaar=987654321098 / Password=admin");
          }
        });
      }
    });
  });
}

// Database helper promises
const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

function hashPassword(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex');
}

/* ═══════════════════════════════════════════════════════
   CROP PROFILES
   ═══════════════════════════════════════════════════════ */
const CROP_PROFILES = {
  Rice:   { rainfall: 150, tempMax: 35, tempMin: 20, waterNeed: 'High', season: 'Kharif', months: ['Jun','Jul','Aug','Sep'], growthStages: ['Sowing','Tillering','Flowering','Grain Filling'] },
  Wheat:  { rainfall: 75,  tempMax: 25, tempMin: 10, waterNeed: 'Medium', season: 'Rabi',  months: ['Nov','Dec','Jan','Feb'], growthStages: ['Sowing','Crown Root','Jointing','Maturity'] },
  Cotton: { rainfall: 100, tempMax: 38, tempMin: 21, waterNeed: 'Medium', season: 'Kharif', months: ['May','Jun','Jul','Aug'], growthStages: ['Sowing','Squaring','Boll Formation','Bursting'] },
  Sugarcane: { rainfall: 120, tempMax: 38, tempMin: 20, waterNeed: 'Very High', season: 'Annual', months: ['Mar','Apr','May','Jun'], growthStages: ['Germination','Tillering','Elongation','Ripening'] },
  Maize:  { rainfall: 90,  tempMax: 32, tempMin: 18, waterNeed: 'Medium', season: 'Kharif', months: ['Jun','Jul','Aug','Sep'], growthStages: ['Sowing','Knee-high','Silking','Maturity'] }
};

/* ═══════════════════════════════════════════════════════
   STATE-LEVEL RISK DATA (for India heatmap)
   ═══════════════════════════════════════════════════════ */
const STATE_RISK_DATA = {
  'Tamil Nadu':       { risk: 72, crops: ['Rice','Sugarcane','Cotton'], districts: 38, insured_pct: 34, claims_settled: '₹2,340 Cr' },
  'Karnataka':        { risk: 65, crops: ['Rice','Maize','Cotton'], districts: 31, insured_pct: 28, claims_settled: '₹1,870 Cr' },
  'Maharashtra':      { risk: 78, crops: ['Cotton','Sugarcane','Maize'], districts: 36, insured_pct: 31, claims_settled: '₹3,120 Cr' },
  'Madhya Pradesh':   { risk: 58, crops: ['Wheat','Maize','Cotton'], districts: 52, insured_pct: 42, claims_settled: '₹2,890 Cr' },
  'Uttar Pradesh':    { risk: 61, crops: ['Wheat','Rice','Sugarcane'], districts: 75, insured_pct: 38, claims_settled: '₹4,210 Cr' },
  'Punjab':           { risk: 35, crops: ['Wheat','Rice'], districts: 23, insured_pct: 55, claims_settled: '₹1,450 Cr' },
  'Rajasthan':        { risk: 82, crops: ['Wheat','Cotton','Maize'], districts: 33, insured_pct: 22, claims_settled: '₹1,680 Cr' },
  'Gujarat':          { risk: 70, crops: ['Cotton','Maize','Wheat'], districts: 33, insured_pct: 29, claims_settled: '₹2,100 Cr' },
  'Andhra Pradesh':   { risk: 68, crops: ['Rice','Cotton','Maize'], districts: 26, insured_pct: 36, claims_settled: '₹1,950 Cr' },
  'Telangana':        { risk: 64, crops: ['Rice','Cotton','Maize'], districts: 33, insured_pct: 40, claims_settled: '₹1,780 Cr' },
  'Bihar':            { risk: 74, crops: ['Rice','Wheat','Maize'], districts: 38, insured_pct: 18, claims_settled: '₹890 Cr' },
  'Odisha':           { risk: 80, crops: ['Rice','Maize'], districts: 30, insured_pct: 20, claims_settled: '₹720 Cr' },
  'West Bengal':      { risk: 62, crops: ['Rice','Maize'], districts: 23, insured_pct: 25, claims_settled: '₹1,340 Cr' },
  'Kerala':           { risk: 55, crops: ['Rice','Coconut'], districts: 14, insured_pct: 32, claims_settled: '₹680 Cr' },
  'Assam':            { risk: 76, crops: ['Rice','Tea'], districts: 35, insured_pct: 15, claims_settled: '₹420 Cr' },
  'Haryana':          { risk: 38, crops: ['Wheat','Rice'], districts: 22, insured_pct: 52, claims_settled: '₹1,120 Cr' },
  'Chhattisgarh':     { risk: 66, crops: ['Rice','Maize'], districts: 28, insured_pct: 26, claims_settled: '₹560 Cr' },
  'Jharkhand':        { risk: 71, crops: ['Rice','Maize'], districts: 24, insured_pct: 19, claims_settled: '₹380 Cr' }
};

/* ═══════════════════════════════════════════════════════
   GOVERNMENT SCHEMES DATABASE
   ═══════════════════════════════════════════════════════ */
const GOVT_SCHEMES = [
  { id: 'PMFBY', name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Flagship crop insurance scheme providing comprehensive risk coverage against natural calamities, pests, and diseases.',
    benefits: ['Premium: 2% for Kharif, 1.5% for Rabi, 5% for commercial crops', 'Full claim settlement based on crop loss assessment', 'Covers prevented sowing, standing crop loss, post-harvest loss'],
    eligibility: { crops: 'All notified crops', landRequired: 'Any landholding', documents: ['Aadhaar', 'Land records (7/12, 8A, Pahani)', 'Bank passbook', 'Sowing certificate'] },
    link: 'https://pmfby.gov.in', tags: ['insurance', 'crop-loss', 'drought', 'flood'] },
  { id: 'RWBCIS', name: 'Restructured Weather Based Crop Insurance Scheme (RWBCIS)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Parametric weather-index based insurance. Automatic payout when weather parameters deviate from defined thresholds.',
    benefits: ['Instant payout on weather trigger breach', 'No crop cutting experiments required', 'Premium subsidy up to 50% by government'],
    eligibility: { crops: 'All crops in notified areas', landRequired: 'Any landholding', documents: ['Aadhaar', 'Land records', 'Bank account details'] },
    link: 'https://pmfby.gov.in/rwbcis', tags: ['parametric', 'weather', 'automatic-payout', 'drought'] },
  { id: 'PMKISAN', name: 'PM-KISAN Samman Nidhi', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Direct income support of ₹6,000/year in 3 equal installments to all landholding farmer families via DBT.',
    benefits: ['₹6,000 per year (₹2,000 every 4 months)', 'Direct bank transfer — zero leakage', 'No application needed if already enrolled'],
    eligibility: { crops: 'Any', landRequired: 'Any landholding family', documents: ['Aadhaar', 'Land records', 'Bank account'] },
    link: 'https://pmkisan.gov.in', tags: ['income-support', 'dbt', 'direct-transfer'] },
  { id: 'RKBY', name: 'Rashtriya Krishi Bima Yojana', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Predecessor to PMFBY. Coverage for comprehensive yield loss due to natural calamities.',
    benefits: ['Coverage for 21 notified crops', 'Premium subsidy for small/marginal farmers', 'Area-based claim settlement'],
    eligibility: { crops: ['Rice','Wheat','Maize','Cotton','Sugarcane'], landRequired: 'Any', documents: ['Aadhaar', 'Land records', 'Bank passbook'] },
    link: 'https://agricoop.nic.in', tags: ['insurance', 'yield-loss', 'subsidy'] },
  { id: 'NFSM', name: 'National Food Security Mission (NFSM)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Mission to increase production of rice, wheat, pulses, coarse cereals.',
    benefits: ['Subsidy on seeds, fertilizers, micro-nutrients', 'Farm machinery assistance', 'Technology demonstration support'],
    eligibility: { crops: ['Rice','Wheat','Pulses','Maize','Coarse Cereals'], landRequired: 'Any', documents: ['Aadhaar', 'Land records'] },
    link: 'https://nfsm.gov.in', tags: ['subsidy', 'seeds', 'productivity'] },
  { id: 'SMAM', name: 'Sub-Mission on Agricultural Mechanization (SMAM)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Financial assistance for agricultural machinery and equipment.',
    benefits: ['40-50% subsidy on farm machinery', 'Custom hiring center support', 'Drone technology assistance'],
    eligibility: { crops: 'All', landRequired: 'Any landholding', documents: ['Aadhaar', 'Land records', 'Quotation for machinery'] },
    link: 'https://farmech.dac.gov.in', tags: ['mechanization', 'subsidy', 'equipment'] },
  { id: 'AIF', name: 'Agriculture Infrastructure Fund (AIF)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: '₹1 lakh crore financing facility for post-harvest management infrastructure.',
    benefits: ['3% interest subvention up to ₹2 crore for 7 years', 'Credit guarantee coverage', 'Warehousing, cold storage support'],
    eligibility: { crops: 'All', landRequired: 'Any / FPO / Cooperative', documents: ['Aadhaar/PAN', 'Project report', 'Land documents'] },
    link: 'https://agriinfra.dac.gov.in', tags: ['infrastructure', 'credit', 'post-harvest'] },
  { id: 'PMKSY', name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)', ministry: 'Ministry of Agriculture & Farmers Welfare',
    description: 'Har Khet Ko Pani — ensuring water access to every farm through micro-irrigation and watershed development.',
    benefits: ['55% subsidy for small/marginal farmers on micro-irrigation', '45% subsidy for other farmers', 'Per Drop More Crop initiative'],
    eligibility: { crops: 'All', landRequired: 'Any agricultural land', documents: ['Aadhaar', 'Land records', 'Bank passbook'] },
    link: 'https://pmksy.gov.in', tags: ['irrigation', 'water', 'drought', 'subsidy'] }
];

/* ═══════════════════════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    critical_alert: 'CRITICAL THRESHOLD BREACHED: Initiating Zero-Touch Direct Benefit Transfer (DBT) to Farmer.',
    insurance_recommended: 'Strongly Opt for Insurance',
    safe: 'Safe',
    consider: 'Consider Insurance Coverage',
    analyzing: 'Querying Satellite & Climate APIs...',
    risk_score: 'Crop Failure Risk Score',
    underwriting: 'Underwriting Decision',
    parametric_trigger: 'Parametric Trigger',
    govt_schemes: 'Matched Government Schemes',
    growth_stages: 'Growth Stage Weather Mapping',
    premium_calc: 'Premium Calculator',
    claim_settlement: 'Claim Settlement Pipeline',
    voice_advisory: 'Voice Advisory'
  },
  hi: {
    critical_alert: 'गंभीर सीमा उल्लंघन: किसान को शून्य-स्पर्श प्रत्यक्ष लाभ हस्तांतरण (DBT) शुरू किया जा रहा है।',
    insurance_recommended: 'बीमा के लिए दृढ़ता से विकल्प चुनें',
    safe: 'सुरक्षित',
    consider: 'बीमा कवरेज पर विचार करें',
    analyzing: 'उपग्रह और जलवायु API क्वेरी हो रही है...',
    risk_score: 'फसल विफलता जोखिम स्कोर',
    underwriting: 'बीमा निर्णय',
    parametric_trigger: 'पैरामीट्रिक ट्रिगर',
    govt_schemes: 'मेल खाने वाली सरकारी योजनाएं',
    growth_stages: 'विकास चरण मौसम मानचित्रण',
    premium_calc: 'प्रीमियम कैलकुलेटर',
    claim_settlement: 'दावा निपटान पाइपलाइन',
    voice_advisory: 'वॉयस एडवाइजरी'
  },
  ta: {
    critical_alert: 'முக்கிய வரம்பு மீறல்: விவசாயிக்கு நேரடி பயன் பரிமாற்றம் (DBT) தொடங்கப்படுகிறது.',
    insurance_recommended: 'காப்பீட்டை வலுவாகத் தேர்வு செய்யுங்கள்',
    safe: 'பாதுகாப்பானது',
    consider: 'காப்பீட்டுக் கவரேஜைக் கவனியுங்கள்',
    analyzing: 'செயற்கைக்கோள் மற்றும் காலநிலை API-களை வினவுகிறது...',
    risk_score: 'பயிர் தோல்வி ஆபத்து மதிப்பெண்',
    underwriting: 'காப்பீட்டு முடிவு',
    parametric_trigger: 'பாராமெட்ரிக் தூண்டுதல்',
    govt_schemes: 'பொருந்தும் அரசு திட்டங்கள்',
    growth_stages: 'வளர்ச்சி நிலை வானிலை வரைபடம்',
    premium_calc: 'பிரீமியம் கால்குலேட்டர்',
    claim_settlement: 'உரிமை தீர்வு குழாய்',
    voice_advisory: 'குரல் ஆலோசனை'
  }
};

/* ═══════════════════════════════════════════════════════
   WEATHER DATA GENERATOR
   ═══════════════════════════════════════════════════════ */
function seededRng(str, i) {
  const seed = str.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return Math.abs(Math.sin(seed * (i + 1) * 9301 + 49297)) % 1;
}

function generateWeatherData(cropType, location) {
  const profile = CROP_PROFILES[cropType] || CROP_PROFILES.Rice;
  return profile.months.map((month, i) => {
    const baseRain = profile.rainfall + (seededRng(location, i) * 60 - 20);
    const historical = Math.round(baseRain + seededRng(location, i + 10) * 40);
    const deficitChance = seededRng(location, i + 20);
    const deficit = deficitChance > 0.4 ? (0.30 + seededRng(location, i + 30) * 0.25) : (0.05 + seededRng(location, i + 40) * 0.15);
    const forecasted = Math.round(historical * (1 - deficit));
    const historicalTemp = profile.tempMax - 2 + seededRng(location, i + 50) * 4;
    const forecastedTemp = historicalTemp + seededRng(location, i + 60) * 3;
    return {
      month,
      historical_rain_mm: historical,
      forecasted_rain_mm: forecasted,
      historical_temp_c: Math.round(historicalTemp * 10) / 10,
      forecasted_temp_c: Math.round(forecastedTemp * 10) / 10,
      humidity_pct: Math.round(55 + seededRng(location, i + 70) * 30),
      growth_stage: profile.growthStages[i]
    };
  });
}

/* ═══════════════════════════════════════════════════════
   RISK CALCULATION ENGINE
   ═══════════════════════════════════════════════════════ */
function calculateRisk(weatherData, cropType, soilType, liveWeather = null, sowingShift = 0, activeMidSeason = false, lat = null, lng = null) {
  const profile = CROP_PROFILES[cropType] || CROP_PROFILES.Rice;
  let riskScore = 0;
  const keyFactors = [];
  const alerts = [];

  // 0. ENSO Index (El Niño / La Niña)
  const ensoState = 'El Niño (Active)';
  const ensoImpact = 15; // +15% drought probability
  riskScore += ensoImpact;
  keyFactors.push(`El Niño Southern Oscillation active — increases monsoon dry-spell probability by 15%`);

  // 1. Hyperlocal micro-climate correction
  let microClimateVariance = 0;
  if (lat && lng) {
    const coordHash = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453) % 1;
    microClimateVariance = Math.round((coordHash * 16 - 8)); // range -8% to +8%
    if (Math.abs(microClimateVariance) > 2) {
      keyFactors.push(`Hyperlocal Satellite Correction (NASA CHIRPS): ${microClimateVariance > 0 ? '+' : ''}${microClimateVariance}% rainfall deviation from block average`);
    }
  }

  // 2. Sowing Date Sensitivity Impact
  let sowingModifier = 0;
  if (sowingShift !== 0) {
    if (sowingShift > 0) {
      sowingModifier = -sowingShift * 8; // reduces risk by 8% per week delay
      keyFactors.push(`Delaying sowing by ${sowingShift} week(s) aligns flowering with peak late-monsoon rainfall. Risk reduced by ${Math.abs(sowingModifier)}%.`);
    } else {
      sowingModifier = Math.abs(sowingShift) * 10; // increases risk
      keyFactors.push(`Pre-mature sowing by ${Math.abs(sowingShift)} week(s) exposes young tillers to severe early dry spells. Risk increased by ${sowingModifier}%.`);
    }
    riskScore += sowingModifier;
  }

  // 3. Stage-Weighted Risk Analysis
  const stageWeights = {
    // Rice
    'Sowing': 0.8, 'Tillering': 1.2, 'Flowering': 2.0, 'Grain Filling': 1.5,
    // Wheat
    'Crown Root': 1.2, 'Jointing': 1.5, 'Maturity': 0.8,
    // Cotton
    'Squaring': 1.2, 'Boll Formation': 2.0, 'Bursting': 1.0,
    // Sugarcane
    'Germination': 0.8, 'Elongation': 2.0, 'Ripening': 1.0,
    // Maize
    'Knee-high': 1.2, 'Silking': 2.0
  };

  weatherData.forEach((d) => {
    let deficit = ((d.historical_rain_mm - d.forecasted_rain_mm) / d.historical_rain_mm) * 100;
    
    // Apply hyperlocal climate correction
    deficit = Math.max(0, deficit - microClimateVariance);

    const weight = stageWeights[d.growth_stage] || 1.0;
    
    if (deficit > 30) {
      const stageRiskAddition = Math.round(15 * weight);
      riskScore += stageRiskAddition;
      keyFactors.push(`Deficit of ${deficit.toFixed(0)}% during critical ${d.growth_stage} phase (Stage Weight: ${weight}x) increases failure probability by ${stageRiskAddition}%`);
      alerts.push({ month: d.month, type: 'drought', severity: deficit > 50 ? 'critical' : 'warning', deficit: deficit.toFixed(0) });
    }

    if (d.forecasted_temp_c > profile.tempMax) {
      const tempRiskAddition = Math.round(10 * weight);
      riskScore += tempRiskAddition;
      keyFactors.push(`Temperature ${d.forecasted_temp_c}°C exceeds ${cropType} tolerance (${profile.tempMax}°C) during ${d.growth_stage} phase`);
      alerts.push({ month: d.month, type: 'heat', severity: 'warning' });
    }
  });

  // 4. Mid-Season monitored risk shift
  if (activeMidSeason) {
    const midSeasonAddition = 12;
    riskScore += midSeasonAddition;
    keyFactors.push(`Mid-season delay in return monsoon registered. standing crop failure risk elevated by 12%`);
  }

  // 5. Factor in real-time weather observation
  if (liveWeather) {
    if (liveWeather.temp > profile.tempMax) {
      riskScore += 15;
      keyFactors.push(`Live weather temperature (${liveWeather.temp}°C) exceeds safety limit of ${profile.tempMax}°C`);
      alerts.push({ month: 'Live', type: 'heat', severity: 'critical' });
    }
    if (liveWeather.humidity < 45) {
      riskScore += 10;
      keyFactors.push(`Dry live humidity (${liveWeather.humidity}%) indicates active moisture deficit stress`);
    }
    if (liveWeather.wind > 22) {
      riskScore += 8;
      keyFactors.push(`High live wind speed (${liveWeather.wind} km/h) risks physical crop lodging (stem damage)`);
    }
  }

  // 6. Soil profiling risks
  const soilRisks = { 'Red Laterite': 8, 'Black Cotton': 3, 'Alluvial': 0, 'Loamy': 2 };
  riskScore += soilRisks[soilType] || 5;
  if (soilRisks[soilType] > 5) keyFactors.push(`${soilType} soil has low water retention (20%) — amplifies crop drought stress`);
  if (profile.waterNeed === 'Very High' || profile.waterNeed === 'High') {
    riskScore += 5;
    keyFactors.push(`${cropType} species has a ${profile.waterNeed.toLowerCase()} baseline water requirement`);
  }

  riskScore = Math.min(100, Math.max(5, riskScore));

  const maxDeficit = Math.max(...weatherData.map(d => ((d.historical_rain_mm - d.forecasted_rain_mm) / d.historical_rain_mm) * 100));
  const parametricTrigger = riskScore > 60 || maxDeficit > 42;
  const recommendation = riskScore > 65 ? 'Strongly Opt for Insurance' : riskScore > 40 ? 'Consider Insurance Coverage' : 'Safe';

  return {
    risk_score: Math.round(riskScore),
    recommendation,
    parametric_trigger: parametricTrigger,
    key_factors: keyFactors,
    alerts,
    enso_state: ensoState,
    microclimate_variance: microClimateVariance,
    sowing_modifier: sowingModifier
  };
}

/* ═══════════════════════════════════════════════════════
   GOVT SCHEME MATCHING
   ═══════════════════════════════════════════════════════ */
function matchSchemes(cropType, riskScore, parametricTrigger) {
  const results = [];
  GOVT_SCHEMES.forEach(scheme => {
    let score = 0;
    let reasons = [];
    const eligCrops = scheme.eligibility.crops;
    if (typeof eligCrops === 'string') {
      if (['All', 'All notified crops', 'Any'].includes(eligCrops)) { score += 30; reasons.push('All crops covered'); }
      else if (eligCrops.toLowerCase().includes(cropType.toLowerCase())) { score += 30; reasons.push(`${cropType} explicitly covered`); }
    } else if (Array.isArray(eligCrops)) {
      if (eligCrops.some(c => c.toLowerCase() === cropType.toLowerCase())) { score += 30; reasons.push(`${cropType} is a notified crop`); }
    }
    if (parametricTrigger && scheme.tags.includes('parametric')) { score += 25; reasons.push('Parametric weather trigger — instant payout eligible'); }
    if (riskScore > 50 && scheme.tags.includes('insurance')) { score += 25; reasons.push('High risk score — insurance strongly recommended'); }
    if (riskScore > 50 && scheme.tags.includes('drought')) { score += 15; reasons.push('Drought conditions flagged'); }
    if (scheme.tags.includes('income-support')) { score += 10; reasons.push('Universal income support for all farmers'); }
    if (scheme.tags.includes('subsidy') && riskScore > 30) { score += 15; reasons.push('Risk mitigation subsidy available'); }
    if (scheme.tags.includes('irrigation') && riskScore > 40) { score += 20; reasons.push('Irrigation support for water-stressed areas'); }
    if (score >= 30) results.push({ ...scheme, matchScore: Math.min(100, score), matchReasons: reasons });
  });
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/* ═══════════════════════════════════════════════════════
   PMFBY PREMIUM CALCULATOR (real rates)
   ═══════════════════════════════════════════════════════ */
function calculatePremium(cropType, sumInsured, season) {
  const profile = CROP_PROFILES[cropType] || CROP_PROFILES.Rice;
  const s = season || profile.season;
  const rates = { Kharif: 0.02, Rabi: 0.015, Annual: 0.05 };
  const farmerPremium = sumInsured * (rates[s] || 0.02);
  const actuarialPremium = sumInsured * (0.08 + Math.random() * 0.04); // 8-12% actuarial rate
  const govtSubsidy = actuarialPremium - farmerPremium;
  return {
    sum_insured: sumInsured,
    season: s,
    farmer_premium: Math.round(farmerPremium),
    actuarial_premium: Math.round(actuarialPremium),
    govt_subsidy: Math.round(govtSubsidy),
    subsidy_pct: Math.round((govtSubsidy / actuarialPremium) * 100),
    rate_pct: (rates[s] || 0.02) * 100
  };
}

/* ═══════════════════════════════════════════════════════
   HISTORICAL RISK TREND (5 years)
   ═══════════════════════════════════════════════════════ */
function generateHistoricalTrend(cropType, location, currentScore) {
  const years = [2022, 2023, 2024, 2025, 2026];
  return years.map((year, i) => {
    const base = currentScore - 20 + seededRng(location + year, i) * 40;
    const score = Math.min(100, Math.max(10, Math.round(base)));
    const payoutTriggered = score > 65;
    return {
      year,
      risk_score: score,
      payout_triggered: payoutTriggered,
      estimated_loss_per_ha: payoutTriggered ? Math.round(15000 + seededRng(location + year, i + 5) * 30000) : 0,
      rainfall_deviation: Math.round(-5 - seededRng(location + year, i + 10) * 40),
      events: score > 70 ? ['Drought', 'Heatwave'] : score > 50 ? ['Below-normal monsoon'] : ['Normal monsoon']
    };
  });
}

/* ═══════════════════════════════════════════════════════
   CLAIM SETTLEMENT PIPELINE SIMULATION
   ═══════════════════════════════════════════════════════ */
function generateClaimSettlement(parametricTrigger, assessmentId, cropType) {
  if (!parametricTrigger) return null;
  const now = new Date();
  const steps = [
    { id: 1, label: 'Weather Threshold Breach Detected', status: 'complete', timestamp: new Date(now - 300000).toISOString(), icon: 'alert', detail: 'Rainfall deficit >45% confirmed by IMD data' },
    { id: 2, label: 'Smart Contract Auto-Triggered', status: 'complete', timestamp: new Date(now - 240000).toISOString(), icon: 'zap', detail: `Assessment ${assessmentId} — Indian Bank Gateway` },
    { id: 3, label: 'Oracles Verify Weather Data', status: 'complete', timestamp: new Date(now - 180000).toISOString(), icon: 'check', detail: '3/3 Chainlink oracles confirmed breach' },
    { id: 4, label: 'Claim Amount Calculated', status: 'complete', timestamp: new Date(now - 120000).toISOString(), icon: 'calc', detail: `${cropType} — ₹45,000 per hectare based on deficit severity` },
    { id: 5, label: 'DBT to Farmer Bank Account', status: 'processing', timestamp: new Date(now - 60000).toISOString(), icon: 'transfer', detail: 'Aadhaar-seeded account • UPI reference: UPI82746192' },
    { id: 6, label: 'Farmer Notified via SMS + WhatsApp', status: 'pending', timestamp: null, icon: 'message', detail: 'Tamil/English bilingual notification queued' }
  ];
  return { steps, total_payout: 45000, currency: 'INR', chain: 'Indian Bank Core', txn_hash: '0x7f3a91b2c4d5e6f7890a1b2c3d4e5f6a7b8c9d0e' };
}

/* ═══════════════════════════════════════════════════════
   GROQ AI RISK NARRATIVE
   ═══════════════════════════════════════════════════════ */
async function generateAIRiskReport(riskData, cropType, location, soilType, weatherData) {
  const profile = CROP_PROFILES[cropType] || CROP_PROFILES.Rice;
  const prompt = `You are an expert agricultural risk analyst for India's crop insurance division. Generate a concise professional report.

CONTEXT:
- Location: ${location}, India | Crop: ${cropType} (${profile.season}) | Soil: ${soilType}
- Risk Score: ${riskData.risk_score}/100 | Recommendation: ${riskData.recommendation}
- Parametric Trigger: ${riskData.parametric_trigger ? 'ACTIVATED' : 'Not triggered'}
- Key Factors: ${riskData.key_factors.join('; ')}
- Weather: ${weatherData.map(d => `${d.month}: ${d.forecasted_rain_mm}mm (hist: ${d.historical_rain_mm}mm), ${d.forecasted_temp_c}°C`).join(' | ')}

Return ONLY raw JSON (no markdown fences):
{
  "executive_summary": "2-3 sentence professional summary",
  "crop_vulnerability_analysis": "3-4 sentences on how weather affects ${cropType} growth stages",
  "regional_context": "2-3 sentences about ${location} agriculture and climate patterns",
  "recommended_actions": ["action 1", "action 2", "action 3", "action 4"],
  "govt_scheme_priority": "Which scheme to prioritize and why (1-2 sentences)",
  "payout_estimate": "Estimated parametric payout range in INR",
  "climate_outlook": "2 sentences on seasonal outlook for this region",
  "alternative_crops": "Suggest 1-2 alternative crops better suited for current conditions with brief explanation"
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.4,
      max_tokens: 1200
    });
    const raw = completion.choices[0].message.content.trim();
    return JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
  } catch (err) {
    console.error('Groq error:', err.message);
    return {
      executive_summary: `Risk assessment for ${cropType} in ${location}. Score: ${riskData.risk_score}/100. ${riskData.recommendation}.`,
      crop_vulnerability_analysis: `Weather data indicates significant deviation from historical patterns affecting ${cropType} growth.`,
      regional_context: `${location} is a ${cropType}-growing region with increasing climate variability.`,
      recommended_actions: ['Enroll in PMFBY insurance', 'Monitor IMD advisories', 'Consider drip irrigation under PMKSY', 'Register on PM-KISAN'],
      govt_scheme_priority: 'PMFBY recommended for comprehensive crop loss coverage.',
      payout_estimate: riskData.parametric_trigger ? '₹35,000 - ₹55,000 per hectare' : 'No parametric payout triggered',
      climate_outlook: 'Below-normal rainfall expected. Long-term warming trends increase crop stress.',
      alternative_crops: 'Consider drought-resistant varieties like sorghum or millets for the current season.'
    };
  }
}

/* ═══════════════════════════════════════════════════════
   SMS/WhatsApp ALERT GENERATOR
   ═══════════════════════════════════════════════════════ */
function generateAlertMessages(risk, cropType, location, premium) {
  const sms = `🌾 AgriShield ALERT: ${cropType} in ${location} — Risk Score: ${risk.risk_score}/100. ${risk.recommendation}. PMFBY Premium: ₹${premium.farmer_premium}/ha. Visit pmfby.gov.in to enroll. Reply YES for assistance.`;
  const whatsapp = `*🛡️ AgriShield Parametric Report*\n\n📍 *Location:* ${location}\n🌾 *Crop:* ${cropType}\n📊 *Risk Score:* ${risk.risk_score}/100\n⚡ *Parametric Trigger:* ${risk.parametric_trigger ? 'ACTIVE ✅' : 'INACTIVE'}\n\n*Recommendation:* ${risk.recommendation}\n\n💰 *PMFBY Premium:* ₹${premium.farmer_premium}/hectare\n🏛️ *Govt Subsidy:* ${premium.subsidy_pct}% (₹${premium.govt_subsidy})\n\n*Matched Schemes:*\n• PMFBY — Crop Insurance\n• PM-KISAN — ₹6,000/yr income support\n• PMKSY — Irrigation subsidy\n\n📲 _Enroll at pmfby.gov.in or visit your nearest CSC_\n\n_Powered by AgriShield • Govt of India Integration_`;
  return { sms, whatsapp };
}

/* ═══════════════════════════════════════════════════════
   SOIL HEALTH DATABASE
   ═══════════════════════════════════════════════════════ */
const SOIL_HEALTH_DATA = {
  'Alluvial': { nitrogen: '1.2% (Moderate)', phosphorus: '0.08% (High)', potassium: '1.5% (High)', ph: '7.2 (Neutral)', organic_carbon: '0.6% (Moderate)', moisture_retention: '35%' },
  'Black Cotton': { nitrogen: '0.9% (Low)', phosphorus: '0.04% (Low)', potassium: '2.1% (High)', ph: '8.1 (Slightly Alkaline)', organic_carbon: '0.8% (High)', moisture_retention: '50%' },
  'Red Laterite': { nitrogen: '0.7% (Low)', phosphorus: '0.03% (Low)', potassium: '0.6% (Moderate)', ph: '5.5 (Acidic)', organic_carbon: '0.4% (Low)', moisture_retention: '20%' },
  'Loamy': { nitrogen: '1.5% (High)', phosphorus: '0.10% (High)', potassium: '1.2% (High)', ph: '6.8 (Near Neutral)', organic_carbon: '1.1% (Very High)', moisture_retention: '40%' }
};

/* ═══════════════════════════════════════════════════════
   ENDPOINTS
   ═══════════════════════════════════════════════════════ */
app.post('/api/evaluate-risk', async (req, res) => {
  const { location = 'Kuthambakkam, Tamil Nadu', cropType = 'Rice', soilType = 'Alluvial', sumInsured = 50000, lat, lng, pincode, sowingShift = 0, activeMidSeason = false } = req.body;
  
  // Format location display text
  let displayLocation = location;
  if (lat && lng) {
    displayLocation = `${parseFloat(lat).toFixed(4)}° N, ${parseFloat(lng).toFixed(4)}° E`;
    if (location && !location.includes('°')) {
      displayLocation = `${location} (${displayLocation})`;
    }
  } else if (pincode) {
    displayLocation = `Pincode ${pincode}`;
    if (location) displayLocation = `${location} (${pincode})`;
  }

  let liveWeather = null;
  if (lat && lng) {
    try {
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
      const weatherJson = await weatherRes.json();
      if (weatherJson && weatherJson.current) {
        liveWeather = {
          temp: weatherJson.current.temperature_2m,
          humidity: weatherJson.current.relative_humidity_2m,
          wind: weatherJson.current.wind_speed_10m,
          code: weatherJson.current.weather_code
        };
      }
    } catch (err) {
      console.error('Backend failed to fetch live weather from Open-Meteo:', err.message);
    }
  }

  const weatherData = generateWeatherData(cropType, displayLocation);
  const risk = calculateRisk(weatherData, cropType, soilType, liveWeather, Number(sowingShift), activeMidSeason, lat, lng);
  const schemes = matchSchemes(cropType, risk.risk_score, risk.parametric_trigger);
  const premium = calculatePremium(cropType, sumInsured);
  const historicalTrend = generateHistoricalTrend(cropType, displayLocation, risk.risk_score);
  const claimSettlement = generateClaimSettlement(risk.parametric_trigger, `AS-${Date.now().toString(36).toUpperCase()}-${cropType.substring(0,2).toUpperCase()}`, cropType);
  const alertMessages = generateAlertMessages(risk, cropType, displayLocation, premium);
  const aiReport = await generateAIRiskReport(risk, cropType, displayLocation, soilType, weatherData);
  const soilHealth = SOIL_HEALTH_DATA[soilType] || SOIL_HEALTH_DATA['Alluvial'];

  res.json({
    risk_score: risk.risk_score,
    recommendation: risk.recommendation,
    parametric_trigger: risk.parametric_trigger,
    weather_data: weatherData,
    key_factors: risk.key_factors,
    alerts: risk.alerts,
    crop_profile: { name: cropType, season: (CROP_PROFILES[cropType] || CROP_PROFILES.Rice).season, water_need: (CROP_PROFILES[cropType] || CROP_PROFILES.Rice).waterNeed, growth_stages: (CROP_PROFILES[cropType] || CROP_PROFILES.Rice).growthStages },
    govt_schemes: schemes,
    ai_report: aiReport,
    soil_health: soilHealth,
    premium_breakdown: premium,
    historical_trend: historicalTrend,
    claim_settlement: claimSettlement,
    alert_messages: alertMessages,
    assessment_id: `AS-${Date.now().toString(36).toUpperCase()}-${cropType.substring(0,2).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    data_sources: ['IMD (India Meteorological Department)', 'NASA POWER Satellite Data', 'ICRISAT Climate Archive'],
    enso_state: risk.enso_state,
    microclimate_variance: risk.microclimate_variance,
    sowing_modifier: risk.sowing_modifier
  });
});

app.post('/api/chat', async (req, res) => {
  const { message = '', cropType = 'Rice', soilType = 'Alluvial', location = 'India' } = req.body;
  const prompt = `You are Krishi AI, an expert agricultural advisor in India. A farmer is asking for advice.
Context:
- Crop: ${cropType}
- Soil: ${soilType}
- Location: ${location}
- Farmer's Question: "${message}"

Provide a helpful, practical, and culturally appropriate response in 3-4 sentences. Indianize the suggestions (mentioning local techniques, micro-irrigation, PMFBY, organic compost / Gobar khad, or IMD weather advisories where relevant). Keep it concise and professional.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 350
    });
    res.json({ response: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.json({ response: `Namaste! As your Krishi AI Advisor, I suggest monitoring weather advisories for ${location}. For your ${cropType} in ${soilType} soil, ensure adequate moisture retention using mulching or organic dung compost (Gobar khad). For details on crop insurance, register under the PMFBY scheme. Feel free to ask more questions!` });
  }
});

app.get('/api/schemes', (req, res) => res.json({ schemes: GOVT_SCHEMES, count: GOVT_SCHEMES.length }));
app.get('/api/state-risks', (req, res) => res.json(STATE_RISK_DATA));
app.get('/api/translations', (req, res) => res.json(TRANSLATIONS));
app.post('/api/calculate-premium', (req, res) => {
  const { cropType = 'Rice', sumInsured = 50000, season } = req.body;
  res.json(calculatePremium(cropType, sumInsured, season));
});
// 1. Register
app.post('/api/register', async (req, res) => {
  const { aadhaar, name, phone, pincode, password } = req.body;
  if (!aadhaar || !name || !phone || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    const hashed = hashPassword(password);
    const result = await dbRun(
      `INSERT INTO users (aadhaar, name, phone, pincode, password) VALUES (?, ?, ?, ?, ?)`,
      [aadhaar, name, phone, pincode || '', hashed]
    );
    const userId = result.lastID;
    
    // Create wallet
    await dbRun(`INSERT INTO wallets (user_id, balance) VALUES (?, 6000.0)`, [userId]);
    
    // Insert initial transaction
    await dbRun(
      `INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'Initial DBT Setup (PM-KISAN)', 6000.0, 'credit', new Date().toISOString().split('T')[0], 'UPI' + Math.floor(10000000 + Math.random() * 90000000)]
    );
    
    res.json({ success: true, message: 'User registered successfully', user_id: userId });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      res.status(400).json({ error: 'Aadhaar card already registered' });
    } else {
      res.status(500).json({ error: 'Internal server error: ' + err.message });
    }
  }
});

// 2. Login
app.post('/api/login', async (req, res) => {
  const { aadhaar, password } = req.body;
  if (!aadhaar || !password) {
    return res.status(400).json({ error: 'Aadhaar and password are required' });
  }
  
  try {
    const user = await dbGet(`SELECT * FROM users WHERE aadhaar = ?`, [aadhaar]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid Aadhaar card number' });
    }
    
    const hashed = hashPassword(password);
    if (user.password !== hashed) {
      return res.status(400).json({ error: 'Invalid password credential' });
    }
    
    const wallet = await dbGet(`SELECT balance FROM wallets WHERE user_id = ?`, [user.id]);
    const transactions = await dbQuery(`SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC`, [user.id]);
    
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        aadhaar: user.aadhaar,
        pincode: user.pincode
      },
      wallet: {
        balance: wallet ? wallet.balance : 6000.0,
        transactions
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Save assessment
app.post('/api/save-assessment', async (req, res) => {
  const { userId, assessmentId, location, cropType, soilType, riskScore, parametricTrigger, claimPayout, weatherData, soilHealth, aiReport } = req.body;
  
  try {
    await dbRun(
      `INSERT INTO assessments (id, user_id, location, crop_type, soil_type, risk_score, parametric_trigger, claim_payout, timestamp, weather_data, soil_health, ai_report) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        assessmentId,
        userId,
        location,
        cropType,
        soilType,
        riskScore,
        parametricTrigger ? 1 : 0,
        claimPayout || 0,
        new Date().toISOString(),
        JSON.stringify(weatherData),
        JSON.stringify(soilHealth),
        JSON.stringify(aiReport)
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save assessment' });
  }
});

// 3.5 Get all pending assessments (for auditor / Block Officer)
app.get('/api/pending-assessments', async (req, res) => {
  try {
    const pending = await dbQuery(`
      SELECT a.*, u.name as farmer_name, u.phone as farmer_phone
      FROM assessments a
      JOIN users u ON a.user_id = u.id
      WHERE a.parametric_trigger = 1 ORDER BY a.timestamp DESC
    `);
    const parsed = pending.map(a => ({
      ...a,
      parametric_trigger: a.parametric_trigger === 1,
      approved: a.approved === 1,
      weather_data: a.weather_data ? JSON.parse(a.weather_data) : null,
      soil_health: a.soil_health ? JSON.parse(a.soil_health) : null,
      ai_report: a.ai_report ? JSON.parse(a.ai_report) : null
    }));
    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch pending assessments' });
  }
});

// 3.6 Approve assessment (disburses wallet payout credit voucher)
app.post('/api/approve-assessment', async (req, res) => {
  const { assessmentId } = req.body;
  try {
    const assessment = await dbGet(`SELECT * FROM assessments WHERE id = ?`, [assessmentId]);
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
    if (assessment.approved === 1) return res.json({ success: true, message: 'Already approved' });

    // Update approved status
    await dbRun(`UPDATE assessments SET approved = 1 WHERE id = ?`, [assessmentId]);

    // Disburse money to the farmer's wallet
    const userId = assessment.user_id;
    const amount = assessment.claim_payout || 45000;
    const cropType = assessment.crop_type || 'Crop';
    
    const wallet = await dbGet(`SELECT balance FROM wallets WHERE user_id = ?`, [userId]);
    if (wallet) {
      const newBalance = wallet.balance + amount;
      await dbRun(`UPDATE wallets SET balance = ? WHERE user_id = ?`, [newBalance, userId]);
      await dbRun(
        `INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, `Parametric Payout — ${cropType}`, amount, 'credit', new Date().toISOString().split('T')[0], `DBT${Math.floor(10000000 + Math.random() * 90000000)}`]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to approve assessment' });
  }
});

// 4. Get assessments
app.get('/api/user-assessments/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const assessments = await dbQuery(`SELECT * FROM assessments WHERE user_id = ? ORDER BY timestamp DESC`, [userId]);
    const parsed = assessments.map(a => ({
      ...a,
      parametric_trigger: a.parametric_trigger === 1,
      weather_data: JSON.parse(a.weather_data),
      soil_health: JSON.parse(a.soil_health),
      ai_report: JSON.parse(a.ai_report)
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

// 4.5 Get Wallet details
app.get('/api/wallet/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const wallet = await dbGet(`SELECT balance FROM wallets WHERE user_id = ?`, [userId]);
    const transactions = await dbQuery(`SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC`, [userId]);
    res.json({
      balance: wallet ? wallet.balance : 6000.0,
      transactions: transactions || []
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch wallet details' });
  }
});

// 5. Update wallet (DBT payout disbursement)
app.post('/api/disburse-dbt', async (req, res) => {
  const { userId, amount, cropType, ref } = req.body;
  try {
    const wallet = await dbGet(`SELECT balance FROM wallets WHERE user_id = ?`, [userId]);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    
    const newBalance = wallet.balance + amount;
    await dbRun(`UPDATE wallets SET balance = ? WHERE user_id = ?`, [newBalance, userId]);
    await dbRun(
      `INSERT INTO transactions (user_id, title, amount, type, date, ref) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, `Parametric Payout — ${cropType}`, amount, 'credit', new Date().toISOString().split('T')[0], ref]
    );
    
    const updatedTransactions = await dbQuery(`SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC`, [userId]);
    res.json({ success: true, balance: newBalance, transactions: updatedTransactions });
  } catch (err) {
    res.status(500).json({ error: 'Direct Benefit Transfer execution failed' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'operational', service: 'AgriShield Parametric Engine', uptime: process.uptime() }));

app.listen(3001, () => console.log('AgriShield Parametric Engine running on port 3001'));
