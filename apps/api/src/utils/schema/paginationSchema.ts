import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  size: z.coerce.number().int().min(1).optional().default(10),
  totalPages: z.coerce.number().int().min(1).optional(),
  totalItems: z.coerce.number().int().min(1).optional(),
});

export type PaginationData = z.infer<typeof paginationSchema>;
