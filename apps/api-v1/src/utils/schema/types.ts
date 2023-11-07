export type { CreateAgencyData, UpdateAgencyData } from './agencySchema';
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
export type { CreateOtpData } from './OtpSchema';
export type { CreateUserData, UpdateUserData } from './userSchema';

export type OTPDetailsData = {
  timestamp: Date;
  client: string;
  success: boolean;
  message: string;
  otpId: string;
  userId: string;
};
