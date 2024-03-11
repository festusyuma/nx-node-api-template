import { z } from 'zod';

import { SignagePermitStatus } from '../types';

export const createSignagePermitSchema = z.object({
  paymentTypeId: z.string().uuid(),
  signageId: z.string().uuid(),
  paymentId: z.string(),
});

export const updateSignagePermitSchema = z.object({
  status: z.nativeEnum(SignagePermitStatus).optional(),
});
export type CreateSignagePermitData = z.infer<typeof createSignagePermitSchema>;
export type UpdateSignagePermitData = z.infer<typeof updateSignagePermitSchema>;
