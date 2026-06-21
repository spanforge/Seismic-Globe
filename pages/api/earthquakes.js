const FEEDS = {
  day: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  week: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const range = req.query.range === "week" ? "week" : "day";
  const url = FEEDS[range];

  try {
    const upstream = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000)
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: "USGS fetch failed" });
    }

    const data = await upstream.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({
      error: "Failed to fetch earthquake data",
      detail: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
