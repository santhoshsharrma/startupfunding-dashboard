# Startup Financial funding and Analysis 

An interactive dashboard for exploring Indian startup funding activity — filter deals by sector, stage, and city, and see how capital is distributed across the market.

## What it does

- KPI summary (total capital deployed, deal count, average check size, active investors)
- Deals by stage (Seed through Series C) as a donut chart
- Capital by sector as a horizontal bar chart
- Funding trend over time
- Searchable, sortable deal table with sector/stage/city filters

## Stack

- React 18
- Vite
- Recharts for charts

## Running locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

Configured for Vercel — push to `main` and it deploys automatically. Build settings are in `vercel.json` (build command `npm run build`, output directory `dist`).

## Data

Deal data lives inline in `src/StartupFundDashboard.jsx`, sourced from `startup_fund_cleaned.xlsx`. Some records have missing `date` or `amount` fields; these are handled gracefully in the UI (shown as `—`) rather than dropped.

## Project structure

```
src/
  main.jsx                 # entry point
  App.jsx                  # root component
  StartupFundDashboard.jsx # dashboard: filters, charts, table
index.html
vite.config.js
vercel.json
```
