import { z } from 'zod';

export const createPaymentTypeSchema = z.object({
  agencyId: z.string().uuid(),
  name: z.string(),
  amount: z.coerce.number(),
});

export const updatePaymentTypeSchema = z.object({
  agencyId: z.string().uuid(),
  name: z.string(),
  amount: z.coerce.number(),
});

export type CreatePaymentTypeData = z.infer<typeof createPaymentTypeSchema>;
export type UpdatePaymentTypeData = z.infer<typeof updatePaymentTypeSchema>;
