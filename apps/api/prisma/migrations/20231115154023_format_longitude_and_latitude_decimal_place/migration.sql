/*
  Warnings:

  - You are about to alter the column `latitude` on the `BusinessLocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,5)`.
  - You are about to alter the column `longitude` on the `BusinessLocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,5)`.

*/
-- AlterTable
ALTER TABLE "BusinessLocation" ALTER COLUMN "latitude" SET DATA TYPE DECIMAL(10,5),
ALTER COLUMN "longitude" SET DATA TYPE DECIMAL(10,5);

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';
