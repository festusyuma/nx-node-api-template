import { z } from 'zod';

import { TransactionStatus } from '../types';

export const createTransactionSchema = z.object({
  paymentTypeId: z.string().uuid(),
  businessId: z.string().uuid(),
});

export const updateTransactionSchema = z.object({
  paymentTypeId: z.string().uuid().optional(),
  businessId: z.string().uuid().optional(),
  status: z.nativeEnum(TransactionStatus).optional(),
});

const status = z.nativeEnum(TransactionStatus);
export type TransactionStatusData = z.infer<typeof status>;

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionData = z.infer<typeof updateTransactionSchema>;
