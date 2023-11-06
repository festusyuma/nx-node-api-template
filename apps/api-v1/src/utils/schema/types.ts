export type { CreateAgencyData, UpdateAgencyData } from './agencySchema';
export type {} from './agentSchema';
export type { CreateAgentData, UpdateAgentData } from './agentSchema';
export type {
  changePasswordData,
  forgotPasswordData,
  LoginData,
  recoverUsernameData,
  verifyOTPData,
} from './authSchema';
export { VERIFY_OTP_TYPE } from './authSchema';
export { CreateBusinessDocumentData } from './businessDocumentSchema';
export type { CreateBusinessLocationData } from './businessLocationSchema';
export type { CreateBusinessData, UpdateBusinessData } from './businessSchema';
export type { CreateUserData, UpdateUserData } from './userSchema';

export type OTPDetailsData = {
  timestamp: Date;
  client: string;
  success: boolean;
  message: string;
  otp: string;
  userId: string;
};
