-- CreateTable
CREATE TABLE "PlanPricing" (
    "id" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "currentPrice" DOUBLE PRECISION NOT NULL,
    "isOnSale" BOOLEAN NOT NULL DEFAULT false,
    "saleEndDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanPricing_plan_key" ON "PlanPricing"("plan");
