-- AlterTable
ALTER TABLE "FoodTruckOrder" ADD COLUMN     "paymentMethods" TEXT[] DEFAULT ARRAY[]::TEXT[];
