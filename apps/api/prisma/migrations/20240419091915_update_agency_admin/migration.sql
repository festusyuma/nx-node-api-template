/*
  Warnings:

  - Added the required column `email` to the `Agency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phonenumber` to the `Agency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agency" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phonenumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
