import { z } from 'zod';

import { BusinessStatus } from '../types';

export const CreateBusinessSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  additionalData: z.any(),
});

export const UpdateBusinessSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email().optional(),
  additionalData: z.any().optional(),
  status: z.nativeEnum(BusinessStatus).optional(),
});
export type CreateBusinessData = z.infer<typeof CreateBusinessSchema>;
export type UpdateBusinessData = z.infer<typeof UpdateBusinessSchema>;
