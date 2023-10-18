import Redis from "ioredis";

let redis: Redis;

export function redisClient() {
  if (!redis) {
    try {
      redis = new Redis(process.env.REDIS_URL ?? "");
    } catch (e) {
      console.error("error connection redis: ", e);
    }
  }

  return redis;
}
