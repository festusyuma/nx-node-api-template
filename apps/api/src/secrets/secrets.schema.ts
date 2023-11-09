import { z } from 'zod';

export const schema = {
  BASE_ROUTE: z.string().optional(),
  PORT: z.coerce.number().optional(),
  DATABASE_URL: z.string(),
  AWS_REGION: z.string().optional(),
  SECRET_KEY: z.string(),
  REDIS_URL: z.string(),
} as const;

export const objectSchema = z.object(schema);
