-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasCheckout" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Tier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_tiers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_tiers_AB_unique" ON "_tiers"("A", "B");

-- CreateIndex
CREATE INDEX "_tiers_B_index" ON "_tiers"("B");

-- AddForeignKey
ALTER TABLE "_tiers" ADD CONSTRAINT "_tiers_A_fkey" FOREIGN KEY ("A") REFERENCES "Tier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tiers" ADD CONSTRAINT "_tiers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
