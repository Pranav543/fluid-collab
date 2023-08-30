/*
  Warnings:

  - You are about to drop the column `description` on the `Tier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tier" DROP COLUMN "description",
ADD COLUMN     "benifits" TEXT[];
