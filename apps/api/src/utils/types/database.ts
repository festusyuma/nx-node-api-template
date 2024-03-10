import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const BusinessLocationStatus = {
  UNVERIFIED: 'UNVERIFIED',
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
} as const;
export type BusinessLocationStatus =
  typeof BusinessLocationStatus[keyof typeof BusinessLocationStatus];
export const BusinessStatus = {
  UNVERIFIED: 'UNVERIFIED',
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;
export type BusinessStatus = typeof BusinessStatus[keyof typeof BusinessStatus];
export const BusinessDocumentStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;
export type BusinessDocumentStatus =
  typeof BusinessDocumentStatus[keyof typeof BusinessDocumentStatus];
export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  LOCKED: 'LOCKED',
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];
export const TransactionStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
} as const;
export type TransactionStatus =
  typeof TransactionStatus[keyof typeof TransactionStatus];
export const SignageType = {
  FLAT_SIZE: 'FLAT_SIZE',
  LED: 'LED',
  DIRECTIONAL_SIGN: 'DIRECTIONAL_SIGN',
  SKY_SIGN: 'SKY_SIGN',
  CANOPY_SIGN: 'CANOPY_SIGN',
  NEON: 'NEON',
  STREET_LAMP_POLE: 'STREET_LAMP_POLE',
  BOUNDARY_WALL_SIGN: 'BOUNDARY_WALL_SIGN',
  PROJECTING_SIGN: 'PROJECTING_SIGN',
  ROOF_SIGN: 'ROOF_SIGN',
  NON_PROFIT_SIGN: 'NON_PROFIT_SIGN',
  FREE_STANDING: 'FREE_STANDING',
  OTHERS: 'OTHERS',
} as const;
export type SignageType = typeof SignageType[keyof typeof SignageType];
export const SignagePermitStatus = {
  NOT_APPLICABLE: 'NOT_APPLICABLE',
  EXPIRED: 'EXPIRED',
  ACTIVE: 'ACTIVE',
} as const;
export type SignagePermitStatus =
  typeof SignagePermitStatus[keyof typeof SignagePermitStatus];
export const SignageSizeType = {
  INCH: 'INCH',
  SQM: 'SQM',
} as const;
export type SignageSizeType =
  typeof SignageSizeType[keyof typeof SignageSizeType];
export const SignageStatus = {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
} as const;
export type SignageStatus = typeof SignageStatus[keyof typeof SignageStatus];
export const SignageZone = {
  NORMAL: 'NORMAL',
  RESTRICTIVE: 'RESTRICTIVE',
  HIGH_STREET: 'HIGH_STREET',
  RURAL: 'RURAL',
  LOCAL_INTERNATIONAL_AIRPORT: 'LOCAL_INTERNATIONAL_AIRPORT',
} as const;
export type SignageZone = typeof SignageZone[keyof typeof SignageZone];
export const SignageSize = {
  UP_TO_1_0: 'UP_TO_1_0',
  UP_TO_3_0: 'UP_TO_3_0',
  UP_TO_5_0: 'UP_TO_5_0',
  UP_TO_7_0: 'UP_TO_7_0',
  UP_TO_10_0: 'UP_TO_10_0',
  UP_TO_13_0: 'UP_TO_13_0',
  UP_TO_25_0: 'UP_TO_25_0',
  ABOVE_25_0: 'ABOVE_25_0',
} as const;
export type SignageSize = typeof SignageSize[keyof typeof SignageSize];
export type Agency = {
  id: Generated<string>;
  name: string;
  paymentLink: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type Agent = {
  id: Generated<string>;
  lastName: string;
  firstName: string;
  userId: string;
  agencyId: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type Business = {
  id: Generated<string>;
  name: string;
  phoneNumber: string;
  email: string;
  qrCode: Generated<string>;
  status: Generated<BusinessStatus>;
  reasonRejected: string | null;
  additionalData: Generated<unknown>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type BusinessDocument = {
  id: Generated<string>;
  type: string;
  files: string[];
  reasonRejected: string | null;
  status: Generated<BusinessDocumentStatus>;
  businessId: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type BusinessLocation = {
  id: Generated<string>;
  images: string[];
  latitude: string;
  longitude: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  businessId: string;
  agentId: string | null;
  status: Generated<BusinessLocationStatus>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type Otp = {
  id: Generated<string>;
  otp: string;
  expirationTime: Generated<Timestamp>;
  verified: boolean | null;
  verifiedAt: Timestamp | null;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type PaymentType = {
  id: Generated<string>;
  agencyId: string;
  name: string;
  amount: number;
};
export type Role = {
  id: Generated<string>;
  name: string;
  key: string;
};
export type Signage = {
  id: Generated<string>;
  type: SignageType;
  size: Generated<SignageSize>;
  size_type: Generated<SignageSizeType>;
  zone: Generated<SignageZone>;
  imageUrl: string | null;
  latitude: string;
  longitude: string;
  streetAddress: string;
  city: string | null;
  state: string | null;
  country: string | null;
  businessId: string;
  status: Generated<SignageStatus>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type SignagePermit = {
  id: Generated<string>;
  status: Generated<SignagePermitStatus>;
  paymentTypeId: string;
  signageId: string;
  expiryDate: Timestamp | null;
  paymentId: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type Transaction = {
  id: Generated<string>;
  paymentTypeId: string;
  businessId: string;
  reference: string;
  status: Generated<TransactionStatus>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type User = {
  id: Generated<string>;
  username: string;
  email: string;
  password: string;
  status: Generated<UserStatus>;
  roleId: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type DB = {
  Agency: Agency;
  Agent: Agent;
  Business: Business;
  BusinessDocument: BusinessDocument;
  BusinessLocation: BusinessLocation;
  Otp: Otp;
  PaymentType: PaymentType;
  Role: Role;
  Signage: Signage;
  SignagePermit: SignagePermit;
  Transaction: Transaction;
  User: User;
};
