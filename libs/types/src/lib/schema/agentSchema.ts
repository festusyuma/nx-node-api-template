import { z } from 'zod';

export const CreateAgentSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  roleId: z.string().uuid(),
  lastName: z.string(),
  firstName: z.string(),
  userId: z.string().uuid(),
  agencyId: z.string().uuid(),
});

export const UpdateAgentSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
});

export type CreateAgentData = z.infer<typeof CreateAgentSchema>;
export type UpdateAgentData = z.infer<typeof UpdateAgentSchema>;
