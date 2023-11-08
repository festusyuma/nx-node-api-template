import { z } from 'zod';

export enum VERIFY_OTP_TYPE {
  RESET = 'RESET',
  RECOVER_USERNAME = 'RECOVER_USERNAME',
}
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

export const changePasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export const verifyOTPSchema = z.object({
  token: z.string(),
  otp: z.string(),
  client: z.string().email(),
  type: z.nativeEnum(VERIFY_OTP_TYPE),
});

export type LoginData = z.infer<typeof loginSchema>;
export type recoverUsernameData = z.infer<typeof recoverUsernameSchema>;
export type forgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type verifyOTPData = z.infer<typeof verifyOTPSchema>;
export type changePasswordData = z.infer<typeof changePasswordSchema>;
