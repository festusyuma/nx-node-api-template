import { z } from 'zod';

export const CreateOtpSchema = z.object({
  otp: z.string(),
  expirationTime: z.string().datetime(),
  verified: z.boolean().optional(),
  verifiedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type CreateOtpData = z.infer<typeof CreateOtpSchema>;
