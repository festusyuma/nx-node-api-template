-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Signage" ALTER COLUMN "zone" SET DEFAULT 'NORMAL',
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;
