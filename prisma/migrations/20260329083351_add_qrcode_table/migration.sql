-- CreateTable
CREATE TABLE "GuestQrCode" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "qrCodeId" TEXT NOT NULL,

    CONSTRAINT "GuestQrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestQrCode_reference_key" ON "GuestQrCode"("reference");
