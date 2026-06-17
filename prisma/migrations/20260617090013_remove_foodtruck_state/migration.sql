/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FoodTruckOrderLine` table. All the data in the column will be lost.
  - You are about to drop the `FoodTruckState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodTruckChecklistItem" DROP CONSTRAINT "FoodTruckChecklistItem_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckFinance" DROP CONSTRAINT "FoodTruckFinance_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckOrder" DROP CONSTRAINT "FoodTruckOrder_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckOrderLine" DROP CONSTRAINT "FoodTruckOrderLine_orderId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckProduct" DROP CONSTRAINT "FoodTruckProduct_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckState" DROP CONSTRAINT "FoodTruckState_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "FoodTruckStockItem" DROP CONSTRAINT "FoodTruckStockItem_workspaceId_fkey";

-- AlterTable
ALTER TABLE "FoodTruckOrderLine" DROP COLUMN "createdAt";

-- DropTable
DROP TABLE "FoodTruckState";

-- CreateIndex
CREATE INDEX "FoodTruckFinance_workspaceId_idx" ON "FoodTruckFinance"("workspaceId");

-- AddForeignKey
ALTER TABLE "FoodTruckProduct" ADD CONSTRAINT "FoodTruckProduct_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckOrder" ADD CONSTRAINT "FoodTruckOrder_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckOrderLine" ADD CONSTRAINT "FoodTruckOrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "FoodTruckOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckStockItem" ADD CONSTRAINT "FoodTruckStockItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckChecklistItem" ADD CONSTRAINT "FoodTruckChecklistItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckFinance" ADD CONSTRAINT "FoodTruckFinance_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
