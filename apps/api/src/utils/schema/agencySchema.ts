import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string(),
  paymentLink: z.string().optional(),
});

export const UpdateAgencySchema = z.object({
  name: z.string().optional(),
  paymentLink: z.string().optional(),
});

export type CreateAgencyData = z.infer<typeof CreateAgencySchema>;
export type UpdateAgencyData = z.infer<typeof UpdateAgencySchema>;
