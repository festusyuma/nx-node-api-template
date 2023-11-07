import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  size: z.number().int().min(1).optional().default(10),
  totalPages: z.number().int().min(1).optional(),
  totalItems: z.number().int().min(1).optional(),
});

export type PaginationData = z.infer<typeof paginationSchema>;
