import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.string().uuid(),
});

export type CreateUserData = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string().optional(),
  roleId: z.string().uuid(),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
