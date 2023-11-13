import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  size: z.coerce.number().int().min(1).optional().default(10),
  totalPages: z.coerce.number().int().min(0).optional().default(0),
  totalItems: z.coerce.number().int().min(0).optional().default(0),
});

export type PaginationData = z.infer<typeof paginationSchema>;
