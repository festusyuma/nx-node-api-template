/*
  Warnings:

  - Added the required column `businessId` to the `Signage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Signage" ADD COLUMN     "businessId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Signage" ADD CONSTRAINT "Signage_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
