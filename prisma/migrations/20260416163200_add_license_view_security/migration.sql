-- AlterTable
ALTER TABLE "License" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "viewableUntil" TIMESTAMP(3);
