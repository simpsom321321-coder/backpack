export default async function handler(req, res) {
  try {
    const r = await fetch('https://api.backpack.exchange/wapi/v1/staking/stats', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'BagmanTracker/1.0'
      }
    });
    if (!r.ok) {
      res.status(r.status).json({ error: 'upstream ' + r.status });
      return;
    }
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=2, stale-while-revalidate=10');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: String(e && e.message || e) });
  }
}
