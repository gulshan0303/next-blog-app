import { prisma } from '../lib/prisma';
import { redis } from '../lib/redis';

afterAll(async () => {
  try {
    if (prisma) {
      await prisma.$disconnect();
    }
  } catch (e) {}

  try {
    if (redis) {
      await redis.quit();
    }
  } catch (e) {}
});
