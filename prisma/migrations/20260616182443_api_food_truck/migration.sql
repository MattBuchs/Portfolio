-- CreateEnum
CREATE TYPE "FoodTruckRole" AS ENUM ('OWNER', 'MANAGER', 'STAFF');

-- CreateTable
CREATE TABLE "FoodTruckUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTruckWorkspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckWorkspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTruckMembership" (
    "id" TEXT NOT NULL,
    "role" "FoodTruckRole" NOT NULL DEFAULT 'STAFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "FoodTruckMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTruckSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "FoodTruckSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTruckInvite" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "FoodTruckRole" NOT NULL DEFAULT 'STAFF',
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceId" TEXT NOT NULL,
    "invitedById" TEXT NOT NULL,

    CONSTRAINT "FoodTruckInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTruckState" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckUser_email_key" ON "FoodTruckUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckWorkspace_slug_key" ON "FoodTruckWorkspace"("slug");

-- CreateIndex
CREATE INDEX "FoodTruckMembership_workspaceId_idx" ON "FoodTruckMembership"("workspaceId");

-- CreateIndex
CREATE INDEX "FoodTruckMembership_userId_idx" ON "FoodTruckMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckMembership_userId_workspaceId_key" ON "FoodTruckMembership"("userId", "workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckSession_tokenHash_key" ON "FoodTruckSession"("tokenHash");

-- CreateIndex
CREATE INDEX "FoodTruckSession_userId_idx" ON "FoodTruckSession"("userId");

-- CreateIndex
CREATE INDEX "FoodTruckSession_expiresAt_idx" ON "FoodTruckSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckInvite_tokenHash_key" ON "FoodTruckInvite"("tokenHash");

-- CreateIndex
CREATE INDEX "FoodTruckInvite_workspaceId_idx" ON "FoodTruckInvite"("workspaceId");

-- CreateIndex
CREATE INDEX "FoodTruckInvite_email_idx" ON "FoodTruckInvite"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckState_workspaceId_key" ON "FoodTruckState"("workspaceId");

-- AddForeignKey
ALTER TABLE "FoodTruckMembership" ADD CONSTRAINT "FoodTruckMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "FoodTruckUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckMembership" ADD CONSTRAINT "FoodTruckMembership_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckSession" ADD CONSTRAINT "FoodTruckSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "FoodTruckUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckInvite" ADD CONSTRAINT "FoodTruckInvite_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckInvite" ADD CONSTRAINT "FoodTruckInvite_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "FoodTruckUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckState" ADD CONSTRAINT "FoodTruckState_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
