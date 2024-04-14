-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "agentId" UUID;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
