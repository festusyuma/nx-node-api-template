-- CreateEnum
CREATE TYPE "BusinessStatus" AS ENUM ('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "status" "BusinessStatus" NOT NULL DEFAULT 'UNVERIFIED';

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
