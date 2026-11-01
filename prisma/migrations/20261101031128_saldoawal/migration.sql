/*
  Warnings:

  - You are about to alter the column `jumlah` on the `SaldoAwalBarang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,3)` to `Integer`.
  - You are about to alter the column `harga` on the `SaldoAwalBarang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Integer`.
  - You are about to alter the column `nilai` on the `SaldoAwalBarang` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Integer`.
  - Added the required column `updatedAt` to the `SaldoAwalBarang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaldoAwalBarang" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "jumlah" SET DATA TYPE INTEGER,
ALTER COLUMN "harga" SET DATA TYPE INTEGER,
ALTER COLUMN "nilai" SET DATA TYPE INTEGER;
