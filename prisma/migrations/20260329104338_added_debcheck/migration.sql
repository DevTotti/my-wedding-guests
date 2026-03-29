-- CreateTable
CREATE TABLE "health" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'healthy',
    "details" TEXT,

    CONSTRAINT "health_pkey" PRIMARY KEY ("id")
);
