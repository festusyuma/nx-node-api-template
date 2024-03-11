import { z } from 'zod';

import {
  SignageSize,
  SignageSizeType,
  SignageStatus,
  SignageType,
  SignageZone,
} from '../types';

export const createSignageSchema = z.object({
  businessId: z.string(),
  type: z.nativeEnum(SignageType),
  size: z.nativeEnum(SignageSize),
  imageUrl: z.string().optional(),
  size_type: z.nativeEnum(SignageSizeType).optional().default('INCH'),
  zone: z.nativeEnum(SignageZone).optional().default('NORMAL'),
  longitude: z.string(),
  latitude: z.string(),
  streetAddress: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.nativeEnum(SignageStatus).optional().default('PENDING'),
});

export const createBulkSignageSchema = z.object({
  signages: z
    .object({
      businessId: z.string(),
      type: z.nativeEnum(SignageType),
      size: z.nativeEnum(SignageSize),
      imageUrl: z.string().optional(),
      size_type: z.nativeEnum(SignageSizeType).optional().default('INCH'),
      zone: z.nativeEnum(SignageZone).optional().default('NORMAL'),
      longitude: z.string(),
      latitude: z.string(),
      streetAddress: z.string(),
      city: z.string().optional(),
      state: z.string().optional(),
      status: z.nativeEnum(SignageStatus).optional().default('PENDING'),
    })
    .array(),
});

export const updateSignageSchema = z.object({
  type: z.nativeEnum(SignageType).optional(),
  size: z.nativeEnum(SignageSize).optional(),
  imageUrl: z.string().optional(),
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
export type CreateBulkSignageData = z.infer<typeof createBulkSignageSchema>;
export type UpdateSignageData = z.infer<typeof updateSignageSchema>;
