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
import { VERIFY_OTP_TYPE } from './authSchema';
export { CreateBusinessDocumentData } from './businessDocumentSchema';
export type {
  CreateBusinessLocationData,
  UpdateBusinessLocationData,
  VerifyBusinessLocationData,
} from './businessLocationSchema';
export type { CreateBusinessData, UpdateBusinessData } from './businessSchema';
export type { CreateOtpData, UpdateOtpData } from './OtpSchema';
export type { PaginationData } from './paginationSchema';
export type { CreateUserData, UpdateUserData } from './userSchema';

export type OTPDetailsData = {
  timestamp: Date;
  client: string;
  success: boolean;
  message: string;
  otpId: string;
  type: VERIFY_OTP_TYPE;
  userId: string;
};
