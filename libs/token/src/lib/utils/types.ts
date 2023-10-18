export interface JwtGenerationPayload<T> {
  data: T;
  identifier: string;
}

export enum OtpTypes {
  CUSTOMER_SIGNUP = "customerSignup",
  AUTHENTICATE = "authenticate",
  EMAIL_VERIFICATION = "emailVerification",
  PHONE_VERIFICATION = "phoneVerification",
  WITHDRAWAL = "withdrawal",
}
