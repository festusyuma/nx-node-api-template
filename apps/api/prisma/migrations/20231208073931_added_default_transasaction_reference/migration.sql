/*
  Warnings:

  - The `reference` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "reference",
ADD COLUMN     "reference" UUID NOT NULL DEFAULT gen_random_uuid();
