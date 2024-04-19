/*
  Warnings:

  - You are about to drop the column `phonenumber` on the `Agency` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" DROP COLUMN "phonenumber",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
