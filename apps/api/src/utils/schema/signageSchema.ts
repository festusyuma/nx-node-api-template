import { z } from 'zod';

import {
  SignageSizeType,
  SignageStatus,
  SignageType,
  SignageZone,
} from '../types';

export const createSignageSchema = z.object({
  businessId: z.string(),
  type: z.nativeEnum(SignageType),
  size: z.number(),
  size_type: z.nativeEnum(SignageSizeType).optional().default('INCH'),
  zone: z.nativeEnum(SignageZone).optional().default('NORMAL'),
  longitude: z.string(),
  latitude: z.string(),
  streetAddress: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.nativeEnum(SignageStatus).optional().default('PENDING'),
});

export const updateSignageSchema = z.object({
  type: z.nativeEnum(SignageType).optional(),
  size: z.number().optional(),
  size_type: z.nativeEnum(SignageSizeType).optional().default('INCH'),
  zone: z.nativeEnum(SignageZone).optional().default('NORMAL'),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.nativeEnum(SignageStatus).optional().default('PENDING'),
});

export type CreateSignageData = z.infer<typeof createSignageSchema>;
export type UpdateSignageData = z.infer<typeof updateSignageSchema>;
