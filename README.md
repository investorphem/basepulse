# BasePulse ⚡️  
**A Farcaster Miniapp for Onchain Activity Signaling on Base**

BasePulse is a Farcaster Miniapp built on **Base** that enables users to generate **real, verifiable onchain interactions** through a single tap.  
Each interaction triggers batched smart contract calls, creating measurable onchain activity while remaining gas-efficient and human-like.

---

## 🚀 What BasePulse Does

- Users interact through a **Farcaster Miniapp (Frame)**
- Each tap:
  - Randomly selects **5 interaction contracts**
  - Executes them via a **Batch Executor**
  - Emits onchain events per contract
- All interactions are:
  - Onchain
  - Public
  - Verifiable
  - Non-simulated

This design intentionally mirrors **organic user behavior** rather than spam transactions.


---

## 🧠 Architecture Overview

### 1. Farcaster Miniapp (Frontend)
- Built with **Next.js App Router**
- Uses Farcaster Frame standards
- Users interact directly inside Farcaster clients

### 2. Transaction Handler (Backend)
- Server-side transaction execution
- Selects **5 random contracts per interaction**
- Sends transaction to a Batch Executor

### 3. Batch Executor (Smart Contract)
- Accepts an array of contract addresses
- Executes `recordInteraction()` on each target
- Emits a `BatchExecuted` event

### 4. Interaction Contracts
- Each contract:
  - Stores interaction counts
  - Emits detailed events
  - Restricts calls to the authorized executor

---

## 📦 Onchain Components (Base)

- **Batch Executor Contract**
  - Handles batched execution
  - Configurable for different batch sizes (5, 6, etc.)

- **Interaction Contracts**
  - 30+ deployed contracts
  - Each interaction increments onchain state
  - All contracts are callable and verified on BaseScan

---

## 🔄 Interaction Flow

1. User taps **Signal** in Farcaster
2. Miniapp triggers backend route
3. Backend:
   - Randomly selects 5 contracts
   - Sends a single transaction to the executor
4. Executor:
   - Calls each contract
   - Emits events
5. Onchain activity is recorded and indexed

---

## 📊 Trackable Metrics

This repository and app generate the following measurable signals:

- ✅ Smart contract deployments
- ✅ Contract-to-contract calls
- ✅ Repeated user-triggered transactions
- ✅ Event emissions
- ✅ BaseScan activity
- ✅ GitHub repository commits
- ✅ Farcaster Miniapp usage

---

## 🛠 Tech Stack

- **Base**
- **Solidity (0.8.20+)**
- **Next.js**
- **Farcaster Frames**
- **Viem**
- **TypeScript**

---

## 🌐 Farcaster Miniapp Compliance

- Includes `/.well-known/farcaster.json`
- HTTPS hosted
- Uses Frame-compatible responses
- No wallet-draining or hidden execution
- User-initiated actions only

---

## 🧪 Status

- Contracts deployed and callable
- Miniapp live and functional
- Randomized interaction logic implemented
- Ready for scaling additional contracts and executors

---

## 📌 Purpose of This Repository

This repository serves as:
- A production Farcaster Miniapp
- A Base ecosystem contribution

---

## 👤 Author

Built by a Base ecosystem builder focused on:
- Onchain activity
- Farcaster-native distribution
- Transparent, measurable impact

---

## 📝 License

MIT
