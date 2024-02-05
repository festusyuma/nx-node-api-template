-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "paymentLink" TEXT;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
