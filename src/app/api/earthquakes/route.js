const FEEDS = {
  day: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  week: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") === "week" ? "week" : "day";
  const url = FEEDS[range];

  try {
    const upstream = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 300 }
    });

    if (!upstream.ok) {
      return Response.json({ error: "USGS fetch failed" }, { status: upstream.status });
    }

    const data = await upstream.json();

    return Response.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60"
      }
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch earthquake data", detail: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
