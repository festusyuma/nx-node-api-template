-- CreateEnum
CREATE TYPE "SignagePermitStatus" AS ENUM ('NOT_APPLICABLE', 'EXPIRED', 'ACTIVE');

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "SignagePermit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "SignagePermitStatus" NOT NULL DEFAULT 'NOT_APPLICABLE',
    "paymentTypeId" UUID NOT NULL,
    "signageId" UUID,
    "expiryDate" TIMESTAMP(3),
    "paymentId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SignagePermit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SignagePermit_paymentId_key" ON "SignagePermit"("paymentId");

-- AddForeignKey
ALTER TABLE "SignagePermit" ADD CONSTRAINT "SignagePermit_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignagePermit" ADD CONSTRAINT "SignagePermit_signageId_fkey" FOREIGN KEY ("signageId") REFERENCES "Signage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignagePermit" ADD CONSTRAINT "SignagePermit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
