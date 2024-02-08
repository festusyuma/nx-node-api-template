/*
  Warnings:

  - You are about to drop the column `description` on the `SignagePermit` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SignagePermit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "SignagePermit" DROP COLUMN "description",
DROP COLUMN "name";
