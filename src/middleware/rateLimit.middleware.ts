import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redis } from '../lib/redis';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});

export const rateLimitMiddleware = async (req: Request) => {
  try {
    const ip =
      req.headers.get('x-forwarded-for') || 'unknown';

    await rateLimiter.consume(ip);

    return true;
  } catch (error) {
    throw new Error('Too many requests');
  }
};