import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { chatHandler } from '../lib/chatHandler.js';

const hasRedis = Boolean(
  (process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL) &&
  (process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN),
);

const redis = hasRedis ? Redis.fromEnv() : null;

const limiters = redis
  ? [
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 m'),
        prefix: 'tmoodbod:minute',
      }),
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(50, '1 d'),
        prefix: 'tmoodbot:day',
      }),
    ]
  : [];

if (!redis) {
  console.warn(
    'Rate limiting is off: Upstash Redis variables are not set.',
  );
}

const getClientIp = (req) =>
  req.headers['x-forwarded-for']?.split(',')[0].trim() ||
  'unknown';

const isRateLimited = async (ip) => {
  try {
    for (const limiter of limiters) {
      const { success } = await limiter.limit(ip);
      if (!success) return true;
    }
    return false;
  } catch (err) {
    console.error('Rate limit check failed:', err);
    return false;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed' });
  }

  if (await isRateLimited(getClientIp(req))) {
    return res.status(429).json({
      error:
        "You've asked a lot of questions. Try again in a little while.",
    });
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
      return res.status(429).json({
        error: 'Rate limit reached. Try again in a moment.',
      });
    }
    console.error('API Chat Error:', err);
    res
      .status(500)
      .json({ error: 'Internal server error' });
  }
}
