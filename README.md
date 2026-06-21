# 🌍 Seismic Globe

Live global earthquake visualizer. Real-time USGS data plotted on an interactive 3D globe.

## Features
- Live USGS earthquake feed (past 24h or 7 days)
- Tap any dot for magnitude, depth, location, felt reports, alert level
- Filter by magnitude category
- Momentum-based drag spin, pinch to zoom
- Pulsing rings on M4.5+ events
- Share & USGS deep-link buttons

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel --prod
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com/new
3. Import your repo — Vercel auto-detects the config
4. Click **Deploy** — done

## Project structure
```
seismic-globe/
├── public/
│   └── index.html        # The full app (single file)
├── api/
│   └── earthquakes.js    # Serverless proxy for USGS API
├── vercel.json           # Routing + headers config
├── package.json
└── .gitignore
```

## Local dev
```bash
npm install
npm run dev               # runs vercel dev on localhost:3000
```

## How it works
The `/api/earthquakes` serverless function proxies the USGS GeoJSON feed,
adding proper CORS headers and 5-minute CDN caching so the globe loads
fast anywhere in the world without browser CORS issues.
