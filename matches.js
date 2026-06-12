// Vercel Serverless Function — Football Data Proxy
// এই ফাইল API Key সুরক্ষিত রাখে, browser-এ দেখা যায় না

const API_KEY = "2c9bfbd7330f4e31bedbb40f897af24b";
const BASE = "https://api.football-data.org/v4";

// Competition IDs
// 2000 = FIFA World Cup
// 2001 = UEFA Champions League  
// 2021 = Premier League
// 2014 = La Liga
// 2002 = Bundesliga
// 2019 = Serie A

export default async function handler(req, res) {
  // CORS headers — frontend থেকে call করতে দেয়
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { type = "today" } = req.query;

  try {
    let url = "";
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const dayAfter = new Date(Date.now() + 172800000).toISOString().split("T")[0];

    if (type === "today") {
      // আজকের সব ম্যাচ (multiple competitions)
      url = `${BASE}/matches?dateFrom=${today}&dateTo=${today}`;
    } else if (type === "upcoming") {
      // আগামী ২ দিনের ম্যাচ
      url = `${BASE}/matches?dateFrom=${tomorrow}&dateTo=${dayAfter}`;
    } else if (type === "live") {
      // এখন চলছে এমন ম্যাচ
      url = `${BASE}/matches?status=IN_PLAY,PAUSED`;
    } else if (type === "worldcup") {
      // FIFA World Cup 2026
      url = `${BASE}/competitions/2000/matches?status=SCHEDULED,IN_PLAY,FINISHED&limit=20`;
    }

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    // Rate limit headers থেকে throttle করা
    const remaining = response.headers.get("X-Requests-Available-Minute");
    const waitTime = response.headers.get("X-RequestCounter-Reset");

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ 
        error: errText,
        remaining,
      });
    }

    const data = await response.json();

    // Cache: আজকের ম্যাচ ৫ মিনিট, upcoming ১৫ মিনিট
    const cacheTime = type === "today" ? 300 : 900;
    res.setHeader("Cache-Control", `public, s-maxage=${cacheTime}, stale-while-revalidate=60`);

    return res.status(200).json({
      ...data,
      _meta: { type, remaining, generated: new Date().toISOString() }
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
