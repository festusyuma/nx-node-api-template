/*
  Warnings:

  - You are about to drop the column `size` on the `Signage` table. All the data in the column will be lost.
  - You are about to drop the column `size_type` on the `Signage` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SignageSize" AS ENUM ('UP_TO_1_0', 'UP_TO_3_0', 'UP_TO_5_0', 'UP_TO_7_0', 'UP_TO_10_0', 'UP_TO_13_0', 'UP_TO_25_0', 'ABOVE_25_0');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SignageZone" ADD VALUE 'RURAL';
ALTER TYPE "SignageZone" ADD VALUE 'LOCAL_INTERNATIONAL_AIRPORT';

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Signage" DROP COLUMN "size",
DROP COLUMN "size_type";
