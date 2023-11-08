import { z } from 'zod';

import { BusinessLocationStatus } from '../types';

export const CreateBusinessLocationSchema = z.object({
  streetAddress: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  city: z.string(),
  state: z.string(),
  status: z.nativeEnum(BusinessLocationStatus),
  country: z.string(),
  agentId: z.string().optional(),
  businessId: z.string(),
  images: z.array(z.string()),
});

export type CreateBusinessLocationData = z.infer<
  typeof CreateBusinessLocationSchema
>;
