/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `guests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guests_reference_key" ON "guests"("reference");
