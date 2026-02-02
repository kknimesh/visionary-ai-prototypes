# ClaimAI - AI-Powered Claims Assessment Platform

A modern, AI-powered car insurance claims assessment prototype built with React, TypeScript, and computer vision technology.

![React](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-teal)

---

## Overview

ClaimAI transforms manual insurance claims assessment from a 45-minute process into a 5-minute AI-assisted workflow. The platform uses computer vision to automatically detect vehicle damage, classify severity, estimate repair costs, and provide actionable recommendations.

**Author:** Nimesh Kumar

---

## Key Features

### Dashboard
- **Stats Cards:** Total Claims, Pending Review, Approved Today, Avg. Processing Time
- **Recent Claims Table:** Severity badges, cost estimates, status tracking
- **AI Insights Panel:** Processing improvements, alerts, recommendations
- **Quick Actions:** One-click navigation to common workflows

### 4-Step Claim Wizard
1. **Policy Info:** Policy number, holder name, email, phone
2. **Vehicle Details:** Make, model, year, VIN, accident date, description
3. **Damage Photos:** Drag-drop upload with preview (multi-image support)
4. **AI Analysis:** Real-time computer vision assessment

### AI Damage Assessment
- **Damage Detection:** Identifies and localizes damaged areas in vehicle images
- **Severity Classification:** Minor, moderate, or severe based on visual features
- **Confidence Scoring:** Probabilistic outputs for routing decisions
- **Cost Estimation:** Repair cost estimates per damage area
- **Recommendations:** AI-generated repair suggestions and nearby shop listings

### Additional Pages
- **Claims List:** Filterable list of all claims
- **Claim Detail:** Individual claim view with full history
- **Analytics:** Charts and performance metrics
- **Settings:** Configuration options

---

## Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** shadcn/ui + Tailwind CSS
- **Routing:** React Router v6
- **State Management:** React Query + React Hooks
- **Icons:** Lucide React

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/kknimesh/visionary-ai-prototypes.git

# Navigate to project directory
cd visionary-ai-prototypes

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── App.tsx                           # Main app with routing
├── pages/
│   ├── Dashboard.tsx                 # Stats, claims table, insights
│   ├── NewClaim.tsx                  # 4-step wizard
│   ├── ClaimsList.tsx                # Claims list view
│   ├── ClaimDetail.tsx               # Individual claim
│   ├── Analytics.tsx                 # Charts and metrics
│   └── Settings.tsx                  # Configuration
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx             # Main layout wrapper
│   │   └── Sidebar.tsx               # Navigation sidebar
│   ├── dashboard/
│   │   ├── StatsCard.tsx             # KPI stat cards
│   │   ├── RecentClaimsTable.tsx     # Claims table
│   │   └── AIInsightCard.tsx         # AI insights panel
│   ├── claims/
│   │   ├── ImageUpload.tsx           # Drag-drop upload
│   │   └── AIAnalysisPanel.tsx       # AI results display
│   └── ui/                           # shadcn/ui components
├── hooks/                            # Custom React hooks
└── lib/                              # Utility functions
```

---

## AI/ML Product Vision

### Core AI Capabilities
1. **Damage Detection & Segmentation:** Computer vision models identify damaged areas
2. **Severity Classification:** ML algorithms classify damage severity
3. **Cost Estimation Engine:** Predictive models using historical repair data
4. **Confidence Scoring:** Enables intelligent claim routing
5. **Continuous Learning:** Agent feedback improves models over time

### Confidence-Based Routing

| Confidence Level | Action | Use Case |
|-----------------|--------|----------|
| >90% | Auto-Approve | Routine claims, clear damage |
| 70-90% | Agent Review | Moderate complexity |
| <70% | Escalate | Complex cases, ambiguous damage |

### Human-in-the-Loop Design

| Agent Action | System Response |
|--------------|-----------------|
| Approve Assessment | Logs decision, updates training data |
| Modify Estimate | Captures correction for model retraining |
| Request Review | Routes to senior adjuster |

---

## Demo Walkthrough

1. **Dashboard** - Review stats and recent claims
2. **New Claim** - Click "New Claim" button
3. **Step 1** - Enter policy holder details
4. **Step 2** - Provide vehicle information
5. **Step 3** - Upload damage photos (drag-drop)
6. **Step 4** - View AI analysis results
   - Detected damage areas with severity
   - Confidence scores per damage area
   - Cost estimates and total
   - Repair recommendations
   - Nearby repair shops
7. **Actions** - Approve, Request Review, or Download Report

---

## Business Impact

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Assessment Time | 45 min | 5 min | 90% reduction |
| Claims/Agent/Day | 20 | 60+ | 3x productivity |
| Auto-Approval Rate | 0% | 60%+ | Majority automated |
| Cost Per Claim | $75 | $20 | 73% reduction |

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## License

MIT License

---

## Contact

**Nimesh Kumar**
- GitHub: [github.com/kknimesh](https://github.com/kknimesh)

---

*Built as an AI Product Manager prototype demonstrating computer vision applications in insurance claims processing.*
