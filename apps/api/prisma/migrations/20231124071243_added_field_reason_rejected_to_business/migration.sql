-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "reasonRejected" TEXT;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
