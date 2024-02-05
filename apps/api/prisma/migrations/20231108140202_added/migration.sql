-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" DROP NOT NULL,
ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
