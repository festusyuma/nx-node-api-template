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
  Transaction: Transaction;
  User: User;
};
