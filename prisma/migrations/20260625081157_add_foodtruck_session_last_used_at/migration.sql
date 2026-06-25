-- AlterTable
ALTER TABLE "FoodTruckSession" ADD COLUMN     "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "FoodTruckSession_lastUsedAt_idx" ON "FoodTruckSession"("lastUsedAt");
