-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "AgencyAdmin" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "agencyId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "AgencyAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgencyAdmin_userId_key" ON "AgencyAdmin"("userId");

-- AddForeignKey
ALTER TABLE "AgencyAdmin" ADD CONSTRAINT "AgencyAdmin_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgencyAdmin" ADD CONSTRAINT "AgencyAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
