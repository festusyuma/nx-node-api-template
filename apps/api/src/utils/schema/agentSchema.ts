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
  agencyId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type CreateAgentData = z.infer<typeof CreateAgentSchema>;
export type UpdateAgentData = z.infer<typeof UpdateAgentSchema>;
