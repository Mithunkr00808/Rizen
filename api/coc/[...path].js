export default async function handler(req, res) {
  // Reconstruct the CoC API path from the catch-all segment
  const pathSegments = req.query.path || [];
  const cocPath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  const cocApiKey = process.env.VITE_COC_API_KEY;
  if (!cocApiKey) {
    return res.status(500).json({ error: 'CoC API key not configured on server' });
  }

  // Forward query string (e.g. pagination params)
  const queryString = new URLSearchParams(
    Object.entries(req.query).filter(([k]) => k !== 'path')
  ).toString();

  const targetUrl = `https://cocproxy.royaleapi.dev/v1/${cocPath}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Authorization': `Bearer ${cocApiKey}`,
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('CoC proxy error:', err);
    res.status(500).json({ error: 'Failed to fetch from CoC API' });
  }
}
