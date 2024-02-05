/*
  Warnings:

  - You are about to drop the column `paymentLink` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentLink";
