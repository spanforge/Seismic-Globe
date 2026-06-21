// api/earthquakes.js
// Vercel serverless function — proxies USGS GeoJSON feed
// Avoids browser CORS restrictions and adds caching headers

const FEEDS = {
  day:  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  week: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson',
};

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const range = req.query.range === 'week' ? 'week' : 'day';
  const url = FEEDS[range];

  try {
    const upstream = await fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'USGS fetch failed' });
    }

    const data = await upstream.json();

    // Cache for 5 minutes on CDN, 1 minute on browser
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(data);

  } catch (err) {
    console.error('USGS proxy error:', err.message);
    return res.status(502).json({ error: 'Failed to fetch earthquake data', detail: err.message });
  }
}
