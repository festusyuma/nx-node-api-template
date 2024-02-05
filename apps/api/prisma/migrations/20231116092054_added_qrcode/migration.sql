-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "qrCode" UUID NOT NULL DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
