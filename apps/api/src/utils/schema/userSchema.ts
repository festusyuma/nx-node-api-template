import { z } from 'zod';

import { UserStatus } from '../types';

export const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.string(),
});

export type CreateUserData = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  status: z.nativeEnum(UserStatus).optional(),
  roleId: z.string().uuid().optional(),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
