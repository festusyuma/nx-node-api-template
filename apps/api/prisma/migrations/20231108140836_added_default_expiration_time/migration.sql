/*
  Warnings:

  - Made the column `expirationTime` on table `Otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET NOT NULL,
ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
