import { z } from 'zod';

export const schema = {
  PORT: z.coerce.number().optional(),
} as const;

export const objectSchema = z.object(schema);
