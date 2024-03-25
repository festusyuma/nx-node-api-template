import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string(),
  adminFirstName: z.string(),
  adminLastName: z.string(),
  email: z.string(),
  username: z.string()
});

export type CreateAgencyData = z.infer<typeof CreateAgencySchema>;
