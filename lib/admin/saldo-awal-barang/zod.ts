import { object, string, coerce } from "zod";

export const SaldoAwalBarangSchema = object({
    barangId: string().min(1, "Barang harus dipilih"),

    tanggal: coerce.date({
        error: "Tanggal tidak valid",
    }),
 
    jumlah: coerce
        .number()
        .positive("Jumlah harus lebih dari 0"),

    harga: coerce
        .number()
        .min(0, "Harga tidak boleh negatif"),
});