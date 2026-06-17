-- CreateTable FoodTruckProduct
CREATE TABLE "FoodTruckProduct" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Général',
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable FoodTruckOrder
CREATE TABLE "FoodTruckOrder" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'attente',
    "orderDate" DATE NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable FoodTruckOrderLine
CREATE TABLE "FoodTruckOrderLine" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodTruckOrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable FoodTruckStockItem
CREATE TABLE "FoodTruckStockItem" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Général',
    "qty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'pcs',
    "minQty" DOUBLE PRECISION NOT NULL,
    "dlc" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckStockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable FoodTruckChecklistItem
CREATE TABLE "FoodTruckChecklistItem" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable FoodTruckFinance
CREATE TABLE "FoodTruckFinance" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "financeDate" DATE NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "card" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryApps" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodTruckFinance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoodTruckProduct_workspaceId_idx" ON "FoodTruckProduct"("workspaceId");

-- CreateIndex
CREATE INDEX "FoodTruckOrder_workspaceId_idx" ON "FoodTruckOrder"("workspaceId");
CREATE INDEX "FoodTruckOrder_orderDate_idx" ON "FoodTruckOrder"("orderDate");

-- CreateIndex
CREATE INDEX "FoodTruckOrderLine_orderId_idx" ON "FoodTruckOrderLine"("orderId");

-- CreateIndex
CREATE INDEX "FoodTruckStockItem_workspaceId_idx" ON "FoodTruckStockItem"("workspaceId");

-- CreateIndex
CREATE INDEX "FoodTruckChecklistItem_workspaceId_idx" ON "FoodTruckChecklistItem"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTruckFinance_workspaceId_financeDate_key" ON "FoodTruckFinance"("workspaceId", "financeDate");

-- AddForeignKey
ALTER TABLE "FoodTruckProduct" ADD CONSTRAINT "FoodTruckProduct_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckOrder" ADD CONSTRAINT "FoodTruckOrder_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckOrderLine" ADD CONSTRAINT "FoodTruckOrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "FoodTruckOrder"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckStockItem" ADD CONSTRAINT "FoodTruckStockItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckChecklistItem" ADD CONSTRAINT "FoodTruckChecklistItem_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTruckFinance" ADD CONSTRAINT "FoodTruckFinance_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "FoodTruckWorkspace"("id") ON DELETE CASCADE;
