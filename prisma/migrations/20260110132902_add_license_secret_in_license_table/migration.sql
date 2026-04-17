/*
  Warnings:

  - Added the required column `licenseSecret` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "licenseSecret" TEXT NOT NULL;
