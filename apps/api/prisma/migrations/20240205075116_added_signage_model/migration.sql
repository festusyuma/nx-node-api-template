-- CreateEnum
CREATE TYPE "SignageType" AS ENUM ('FLAT_SIZE', 'LED', 'DIRECTIONAL_SIGN', 'SKY_SIGN', 'CANOPY_SIGN', 'NEON', 'STREET_LAMP_POLE', 'BOUNDARY_WALL_SIGN', 'PROJECTING_SIGN', 'ROOF_SIGN', 'NON_PROFIT_SIGN', 'FREE_STANDING', 'OTHERS');

-- CreateEnum
CREATE TYPE "SignageSizeType" AS ENUM ('INCH', 'SQM');

-- CreateEnum
CREATE TYPE "SignageStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SignageZone" AS ENUM ('NORMAL', 'RESTRICTIVE', 'HIGH_STREET');

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expirationTime" SET DEFAULT NOW() + interval '10 minutes';

-- CreateTable
CREATE TABLE "Signage" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "SignageType" NOT NULL,
    "size" INTEGER NOT NULL,
    "size_type" "SignageSizeType" NOT NULL DEFAULT 'INCH',
    "zone" "SignageZone" NOT NULL,
    "latitude" DECIMAL(10,5) NOT NULL,
    "longitude" DECIMAL(10,5) NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "SignageStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Signage_pkey" PRIMARY KEY ("id")
);
