-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO', 'BUSINESS');

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "licenseKey" TEXT NOT NULL,
    "plan" "Plan" NOT NULL DEFAULT 'FREE',
    "maxUsages" INTEGER NOT NULL,
    "remainingUsages" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "customerName" TEXT,
    "company" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_licenseKey_key" ON "License"("licenseKey");

-- CreateIndex
CREATE UNIQUE INDEX "License_sessionId_key" ON "License"("sessionId");

-- CreateIndex
CREATE INDEX "License_email_idx" ON "License"("email");

-- CreateIndex
CREATE INDEX "License_sessionId_idx" ON "License"("sessionId");

-- CreateIndex
CREATE INDEX "License_licenseKey_idx" ON "License"("licenseKey");
