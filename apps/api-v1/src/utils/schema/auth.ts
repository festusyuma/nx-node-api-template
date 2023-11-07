import { z } from 'zod';

import { UserRoleTypes } from './types';

export const UserSchema = z.object({
  id: z.string().email(),
  email: z.string().email(),
  username: z.string(),
  role: z.string(),
});

export type UserData = z.infer<typeof UserSchema>;
