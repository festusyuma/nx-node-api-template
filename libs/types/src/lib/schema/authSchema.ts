import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const recoverUsernameSchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type LoginData = z.infer<typeof loginSchema>;
export type recoverUsernameData = z.infer<typeof recoverUsernameSchema>;
export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;
