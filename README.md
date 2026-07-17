# 🌾 KrishiShield: Next-Gen Parametric Crop Insurance Protocol

KrishiShield is a decentralized, zero-touch parametric weather-index insurance and direct benefit payout platform customized for Indian agriculture under Pradhan Mantri Fasal Bima Yojana (PMFBY) RWBCIS standards. 

It evaluates satellite-based weather deficits and triggers direct benefit transfer (DBT) payouts to farmers instantly using smart contracts and public banking gateways.

---

## 🚀 High-Fidelity Features

1. **🛡️ Growth-Stage-Weighted Risk Engine**: Dynamically factors crop vulnerability across active growth periods (Sowing, Tillering, Flowering, Maturity) rather than uniform season evaluations.
2. **📊 Expected Value (EV) Premium Simulator**: A live mathematical sandbox demonstrating the actuarial benefits of parametric insurance.
3. **Hyperlocal Micro-Climate Calibration**: Offsets regional IMD indices using NASA POWER coordinate anomalies mapped by the farmer.
4. **Complete Multi-Language Engine**: Localized in English, Hindi, Tamil, Telugu, Marathi, and Punjabi.
5. **🖨️ Government-Compliant Printable Certificate**: A single-page PMFBY audit certificate with stamp indicators and signature lines, formatted cleanly with print boundaries.
6. **Mute Audio Toggle**: Head action bar button to silence the synthesized success chord alerts.
7. **Demo Transparency Mode**: Badged warnings explaining mockup feeds (Agmarknet, CGWB WRIS, NPCI DBT gateway) and their production REST API paths.

---

## 💻 Installation & Local Run

### Prerequisites
* [Node.js](https://nodejs.org) (v18+)

### 1. Run the Backend Server
1. Navigate to the `backend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server (runs on Port `3001`):
   ```bash
   node server.js
   ```

### 2. Run the Frontend Client
1. Navigate to the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server (runs on Port `5174`):
   ```bash
   npm run dev
   ```

### 🔐 Pre-Seeded Demo Farmer Login
* **Aadhaar Card Number**: `123456789012`
* **Password**: `demo`

---

## 📁 Repository Structure
```
├── backend/
│   ├── server.js            # Express server & mock weather logic
│   └── database.sqlite      # SQLite db tracking user profiles & ledger
├── frontend/
│   ├── public/              # Tab favicons & assets
│   ├── src/                 # React Pages, Components & Router
│   ├── package.json         # Build tool specifications
│   └── index.html           # Main template configuration
└── .gitignore               # Ignored nodes and database outputs
```
