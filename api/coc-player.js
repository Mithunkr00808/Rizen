export default async function handler(req, res) {
  const cocApiKey = process.env.COC_API_KEY || process.env.VITE_COC_API_KEY;
  const playerTag = process.env.VITE_COC_PLAYER_TAG || '#PV00PGUJ2';

  if (!cocApiKey) {
    console.error('[coc-player] Missing COC_API_KEY env var');
    return res.status(500).json({ error: 'CoC API key not configured on server' });
  }

  const formattedTag = playerTag.replace('#', '%23');
  const targetUrl = `https://cocproxy.royaleapi.dev/v1/players/${formattedTag}`;

  console.log(`[coc-player] Fetching: ${targetUrl}`);

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${cocApiKey}`,
        'Accept': 'application/json',
      },
    });

    const text = await response.text();
    console.log(`[coc-player] Response status: ${response.status}, body: ${text.slice(0, 200)}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: `CoC API error: ${response.status}`, detail: text });
    }

    res.status(200).json(JSON.parse(text));
  } catch (err) {
    console.error('[coc-player] Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch from CoC API', detail: err.message });
  }
}
