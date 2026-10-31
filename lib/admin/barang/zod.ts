import { object, string } from "zod";

export const BarangSchema = object({
    namaBarang: string().min(1, "Name must be at least 1 characters long"),
    satuan: string().min(1, "Name must be at least 1 characters long"),
    isActive: string().min(1, "Name must be at least 1 characters long"),
})