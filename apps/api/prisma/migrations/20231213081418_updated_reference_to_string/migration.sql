-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "reference" DROP DEFAULT,
ALTER COLUMN "reference" SET DATA TYPE TEXT;
