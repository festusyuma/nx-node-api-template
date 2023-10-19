-- CreateEnum
CREATE TYPE "BusinessLocationStatus" AS ENUM ('UNVERIFIED', 'PENDING', 'VERIFIED');

-- CreateEnum
CREATE TYPE "BusinessDocumentStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyId" TEXT NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "additionalData" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessDocument" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "files" TEXT[],
    "reasonRejected" TEXT,
    "status" "BusinessDocumentStatus" NOT NULL DEFAULT 'PENDING',
    "businessId" TEXT NOT NULL,

    CONSTRAINT "BusinessDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessLocation" (
    "id" TEXT NOT NULL,
    "images" TEXT[],
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "agentId" TEXT,
    "status" "BusinessLocationStatus" NOT NULL DEFAULT 'UNVERIFIED',

    CONSTRAINT "BusinessLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_key_key" ON "Role"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_userId_key" ON "Agent"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessDocument" ADD CONSTRAINT "BusinessDocument_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessLocation" ADD CONSTRAINT "BusinessLocation_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessLocation" ADD CONSTRAINT "BusinessLocation_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
