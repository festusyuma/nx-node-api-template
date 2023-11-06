import { z } from 'zod';

export const CreateAgentSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  userId: z.string().uuid(),
  agencyId: z.string().uuid(),
});

export const UpdateAgentSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  userId: z.string().uuid(),
  agencyId: z.string().uuid(),
});

export type CreateAgentData = z.infer<typeof CreateAgentSchema>;
export type UpdateAgentData = z.infer<typeof UpdateAgentSchema>;
