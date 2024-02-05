import { z } from 'zod';

export const CreateBusinessSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  additionalData: z.any(),
});

export const UpdateBusinessSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  additionalData: z.any(),
});
export type CreateBusinessData = z.infer<typeof CreateBusinessSchema>;
export type UpdateBusinessData = z.infer<typeof UpdateBusinessSchema>;
