import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().email(),
  email: z.string().email(),
  username: z.string(),
  role: z.string(),
  agentId: z.string().uuid(),
  agencyId: z.string().uuid(),
});

export type UserData = z.infer<typeof UserSchema>;
