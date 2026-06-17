-- Remove default cuid() from FoodTruckOrder.id
-- This allows client applications to provide custom order IDs
-- Existing orders will keep their current IDs
ALTER TABLE "FoodTruckOrder" ALTER COLUMN "id" DROP DEFAULT;
