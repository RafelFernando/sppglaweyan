/*
  Warnings:

  - Made the column `satuan` on table `Barang` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusLaporan" AS ENUM ('DRAFT', 'FINAL');

-- AlterTable
ALTER TABLE "Barang" ALTER COLUMN "satuan" SET NOT NULL;

-- CreateTable
CREATE TABLE "SaldoAwalBarang" (
    "id" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "jumlah" DECIMAL(18,3) NOT NULL,
    "harga" DECIMAL(18,2) NOT NULL,
    "nilai" DECIMAL(18,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaldoAwalBarang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarangMasuk" (
    "id" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "jumlah" DECIMAL(18,3) NOT NULL,
    "hargaBeli" DECIMAL(18,2) NOT NULL,
    "totalHarga" DECIMAL(18,2) NOT NULL,
    "supplier" TEXT,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarangMasuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BarangKeluar" (
    "id" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "jumlah" DECIMAL(18,3) NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BarangKeluar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaporanHarian" (
    "id" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "status" "StatusLaporan" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaporanHarian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailLaporanHarian" (
    "id" TEXT NOT NULL,
    "laporanId" TEXT NOT NULL,
    "barangId" TEXT NOT NULL,
    "saldoAwal" DECIMAL(18,3) NOT NULL,
    "masuk" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "keluar" DECIMAL(18,3) NOT NULL DEFAULT 0,
    "saldoAkhir" DECIMAL(18,3) NOT NULL,
    "hargaBeliRataRata" DECIMAL(18,2),
    "nilaiAwal" DECIMAL(18,2) NOT NULL,
    "nilaiMasuk" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "nilaiKeluar" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "nilaiAkhir" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "DetailLaporanHarian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaldoAwalBarang_barangId_key" ON "SaldoAwalBarang"("barangId");

-- CreateIndex
CREATE INDEX "BarangMasuk_barangId_tanggal_idx" ON "BarangMasuk"("barangId", "tanggal");

-- CreateIndex
CREATE INDEX "BarangMasuk_tanggal_idx" ON "BarangMasuk"("tanggal");

-- CreateIndex
CREATE INDEX "BarangKeluar_barangId_tanggal_idx" ON "BarangKeluar"("barangId", "tanggal");

-- CreateIndex
CREATE INDEX "BarangKeluar_tanggal_idx" ON "BarangKeluar"("tanggal");

-- CreateIndex
CREATE UNIQUE INDEX "LaporanHarian_tanggal_key" ON "LaporanHarian"("tanggal");

-- CreateIndex
CREATE INDEX "DetailLaporanHarian_barangId_idx" ON "DetailLaporanHarian"("barangId");

-- CreateIndex
CREATE UNIQUE INDEX "DetailLaporanHarian_laporanId_barangId_key" ON "DetailLaporanHarian"("laporanId", "barangId");

-- CreateIndex
CREATE INDEX "Barang_namaBarang_idx" ON "Barang"("namaBarang");

-- CreateIndex
CREATE INDEX "Barang_isActive_idx" ON "Barang"("isActive");

-- AddForeignKey
ALTER TABLE "SaldoAwalBarang" ADD CONSTRAINT "SaldoAwalBarang_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarangMasuk" ADD CONSTRAINT "BarangMasuk_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarangMasuk" ADD CONSTRAINT "BarangMasuk_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarangKeluar" ADD CONSTRAINT "BarangKeluar_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarangKeluar" ADD CONSTRAINT "BarangKeluar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailLaporanHarian" ADD CONSTRAINT "DetailLaporanHarian_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanHarian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailLaporanHarian" ADD CONSTRAINT "DetailLaporanHarian_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "Barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
