/*
  Warnings:

  - You are about to drop the `GuestQrCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "guests" ADD COLUMN     "qrCodeId" TEXT;

-- DropTable
DROP TABLE "GuestQrCode";
