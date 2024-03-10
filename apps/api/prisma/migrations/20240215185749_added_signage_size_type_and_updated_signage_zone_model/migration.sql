-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Signage" ADD COLUMN     "size" "SignageSize" NOT NULL DEFAULT 'UP_TO_1_0',
ADD COLUMN     "size_type" "SignageSizeType" NOT NULL DEFAULT 'INCH';
