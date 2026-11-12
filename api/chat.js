import { randomUUID } from 'crypto';
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

const ERROR_LOG_KEY = 'tmoodbot:errors';
const ERROR_LOG_SIZE = 50;

const recordError = async (label, err) => {
  const ref = randomUUID().slice(0, 8);
  console.error(`${label} (ref ${ref}):`, err);
  if (!redis) return ref;
  try {
    await redis.lpush(ERROR_LOG_KEY, {
      ref,
      time: new Date().toISOString(),
      name: err?.constructor?.name ?? err?.name,
      message: err?.message,
      status: err?.status,
      code: err?.code,
      openaiRequestId: err?.requestID,
    });
    await redis.ltrim(ERROR_LOG_KEY, 0, ERROR_LOG_SIZE - 1);
  } catch (redisErr) {
    console.error(
      'Could not save error to Redis:',
      redisErr,
    );
  }
  return ref;
};

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
      const ref = await recordError(
        'OpenAI rate limit hit',
        err,
      );
      return res.status(429).json({
        error: `Rate limit reached. Try again in a moment. (ref ${ref})`,
      });
    }
    const ref = await recordError('API Chat Error', err);
    res.status(500).json({
      error: `Something went wrong. Try again later. (ref ${ref})`,
    });
  }
}
