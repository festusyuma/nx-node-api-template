-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "isAssigned" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
