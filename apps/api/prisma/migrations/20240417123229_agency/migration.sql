-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_agencyId_fkey";

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "agencyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
