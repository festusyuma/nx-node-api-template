/*
  Warnings:

  - Made the column `signageId` on table `SignagePermit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SignagePermit" DROP CONSTRAINT "SignagePermit_signageId_fkey";

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "SignagePermit" ALTER COLUMN "signageId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SignagePermit" ADD CONSTRAINT "SignagePermit_signageId_fkey" FOREIGN KEY ("signageId") REFERENCES "Signage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
