/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "PaymentType" ADD CONSTRAINT "PaymentType_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
