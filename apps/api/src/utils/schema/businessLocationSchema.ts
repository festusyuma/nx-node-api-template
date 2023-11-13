import { z } from 'zod';

import { BusinessLocationStatus } from '../types';

export const CreateBusinessLocationSchema = z.object({
  streetAddress: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  city: z.string(),
  state: z.string(),
  status: z.nativeEnum(BusinessLocationStatus).optional(),
  country: z.string(),
  agentId: z.string().optional(),
  businessId: z.string(),
  images: z.array(z.string()),
});

export const UpdateBusinessLocationSchema = z.object({
  streetAddress: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.nativeEnum(BusinessLocationStatus).optional(),
  country: z.string().optional(),
  agentId: z.string().optional(),
  businessId: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const VerifyBusinessLocationSchema = z.object({
  status: z.nativeEnum(BusinessLocationStatus),
});

export type CreateBusinessLocationData = z.infer<
  typeof CreateBusinessLocationSchema
>;

export type UpdateBusinessLocationData = z.infer<
  typeof UpdateBusinessLocationSchema
>;
export type VerifyBusinessLocationData = z.infer<
  typeof VerifyBusinessLocationSchema
>;
