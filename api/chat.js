import { chatHandler } from '../lib/chatHandler';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed' });
  }

  try {
    const reply = await chatHandler(req.body?.messages);
    res.status(200).json({ reply });
  } catch (err) {
    if (err?.statusCode === 400) {
      return res.status(400).json({ error: err.message });
    }
    if (err?.status === 429) {
      console.error('OpenAI rate limit hit:', err.message);
      return res
        .status(429)
        .json({
          error:
            'Rate limit reached. Try again in a moment.',
        });
    }
    console.error('API Chat Error:', err);
    res
      .status(500)
      .json({ error: 'Internal server error' });
  }
}
