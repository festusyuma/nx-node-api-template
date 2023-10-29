import Redis from 'ioredis';

import { redisClient } from '../core';

export const setItem = (key: string, val: string | number) =>
  redisClient().set(key, val);

export const getItem = (key: string) => redisClient().get(key);

export const expireItem = (key: string, seconds: number) =>
  redisClient().expire(key, seconds);

export const addToSet = (key: string, score: number | string, item: string) =>
  redisClient().zadd(key, score, item);

export const removeSetItems = (
  key: string,
  start: number | string,
  end: number | string
) => redisClient().zremrangebyscore(key, start, end);

export const removeSetItem = (key: string, item: string) =>
  redisClient().zrem(key, item);

export const getSetItems = (
  key: string,
  start: number | string,
  end: number | string
) => redisClient().zrangebyscore(key, start, end);

interface CacheManager {
  set<T>(key: string, value: T, expiration: number): Promise<void>;
  get<T>(key: string): Promise<T>;
  delete(key: string): Promise<void>;
  getList<T>(key: string): Promise<Array<T>>;
}

export class Cache {
  private readonly redis: Redis;

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl);
  }
}
