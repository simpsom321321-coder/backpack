export default async function handler(req, res) {
  try {
    const startTime = req.query.startTime || Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
    const url = `https://api.backpack.exchange/api/v1/klines?symbol=BP_USDC&interval=1h&startTime=${startTime}`;
    const r = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'BagmanTracker/1.0' }
    });
    if (!r.ok) {
      res.status(r.status).json({ error: 'upstream ' + r.status });
      return;
    }
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
}
