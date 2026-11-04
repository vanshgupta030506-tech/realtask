export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.SARVAM_API_KEY) return res.status(500).json({ error: 'SARVAM_API_KEY is not configured in Vercel.' });
  try {
    const { messages = [] } = req.body || {};
    const response = await fetch('https://api.sarvam.ai/v1/chat/completions', { method: 'POST', headers: { 'Content-Type': 'application/json', 'api-subscription-key': process.env.SARVAM_API_KEY }, body: JSON.stringify({ model: 'sarvam-105b', messages, max_tokens: 500, temperature: 0.4 }) });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || 'Sarvam request failed' });
    return res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'I could not generate a reply.' });
  } catch (error) { return res.status(500).json({ error: 'Unable to reach the assistant right now.' }); }
}
