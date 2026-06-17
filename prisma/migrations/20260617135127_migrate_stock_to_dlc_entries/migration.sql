/*
  Warnings:

  - You are about to drop the column `dlc` on the `FoodTruckStockItem` table. All the data in the column will be lost.
  - You are about to drop the column `qty` on the `FoodTruckStockItem` table. All the data in the column will be lost.

*/

-- AlterTable - Add new dlcEntries column first
ALTER TABLE "FoodTruckStockItem" 
ADD COLUMN "dlcEntries" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN "alertDaysThreshold" INTEGER NOT NULL DEFAULT 3;

-- Migrate data from qty/dlc to dlcEntries
UPDATE "FoodTruckStockItem"
SET "dlcEntries" = CASE
  WHEN "dlc" IS NOT NULL AND "qty" > 0 THEN jsonb_build_array(jsonb_build_object('dlc', to_char("dlc", 'YYYY-MM-DD'), 'qty', "qty"))
  WHEN "qty" > 0 THEN jsonb_build_array(jsonb_build_object('dlc', '', 'qty', "qty"))
  ELSE '[]'::jsonb
END;

-- AlterTable - Drop old columns and alter category
ALTER TABLE "FoodTruckStockItem" 
DROP COLUMN "dlc",
DROP COLUMN "qty",
ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "category" DROP DEFAULT;

-- AlterTable - Add missing columns to other tables
ALTER TABLE "FoodTruckOrder" ADD COLUMN "scheduledTime" TEXT;

ALTER TABLE "FoodTruckProduct" ADD COLUMN "description" TEXT;

-- CreateTable
CREATE TABLE "FoodTruckStockMovement" (
    "id" TEXT NOT NULL,
    "stockItemId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodTruckStockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodTruckStockMovement_stockItemId_idx" ON "FoodTruckStockMovement"("stockItemId");

-- AddForeignKey
ALTER TABLE "FoodTruckStockMovement" ADD CONSTRAINT "FoodTruckStockMovement_stockItemId_fkey" FOREIGN KEY ("stockItemId") REFERENCES "FoodTruckStockItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
