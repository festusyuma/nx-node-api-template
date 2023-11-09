import { z } from 'zod';

export const schema = {
  BASE_ROUTE: z.string().optional(),
  PORT: z.coerce.number().optional(),
  AWS_REGION: z.string().optional(),
  CHANNEL_TABLE: z.string(),
  MESSAGE_TABLE: z.string(),
  CHANNEL_MEMBER_TABLE: z.string(),
  PROFILE_TABLE: z.string(),
} as const;

export const objectSchema = z.object(schema);
