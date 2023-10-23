import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string(),
});

export type CreateAgencyData = z.infer<typeof CreateAgencySchema>;
