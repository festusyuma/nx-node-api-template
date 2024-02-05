-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELED');

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "paymentTypeId" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "reference" TEXT NOT NULL,
    "paymentLink" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "agencyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
