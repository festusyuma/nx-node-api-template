import { z } from 'zod';

export const CreateAgencySchema = z.object({
  name: z.string(),
  paymentLink: z.string().optional(),
});

export const UpdateAgencySchema = z.object({
  name: z.string().optional(),
  paymentLink: z.string().optional(),
});


export const CreateAgencyWithAdminSchema = z.object({
  name: z.string(),
  paymentLink: z.string().optional(),
  adminFirstName: z.string(),
  adminLastName: z.string(),
  email: z.string(),
  username: z.string()
});

export type CreateAgencyData = z.infer<typeof CreateAgencySchema>;
export type UpdateAgencyData = z.infer<typeof UpdateAgencySchema>;
export type CreateAgencyWithAdminData = z.infer<typeof CreateAgencyWithAdminSchema>
