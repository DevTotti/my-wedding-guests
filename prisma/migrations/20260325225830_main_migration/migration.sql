/*
  Warnings:

  - The primary key for the `admins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `admins` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `guests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `guests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `security_pins` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `security_pins` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "admins" DROP CONSTRAINT "admins_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guests" DROP CONSTRAINT "guests_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "guests_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "security_pins" DROP CONSTRAINT "security_pins_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "security_pins_pkey" PRIMARY KEY ("id");
