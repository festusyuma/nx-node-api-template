import { z } from 'zod';

export const CreateOtpSchema = z.object({
  otp: z.string(),
  expirationTime: z.string().datetime().optional(),
  verified: z.boolean().optional(),
  verifiedAt: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const UpdateOtpSchema = z.object({
  expirationTime: z.string().datetime().optional(),
  verified: z.boolean().optional(),
  verifiedAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type CreateOtpData = z.infer<typeof CreateOtpSchema>;
export type UpdateOtpData = z.infer<typeof UpdateOtpSchema>;
