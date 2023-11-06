import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string(),
});

export const UpdateAgencySchema = z.object({
  name: z.string(),
});

export type CreateAgencyData = z.infer<typeof CreateAgencySchema>;
export type UpdateAgencyData = z.infer<typeof UpdateAgencySchema>;
