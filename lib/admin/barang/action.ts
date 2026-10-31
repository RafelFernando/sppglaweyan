'use server';

import { BarangSchema } from "@/lib/admin/barang/zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addBarang = async (prevState: unknown, formData: FormData) => {
    const validatedFields = BarangSchema.safeParse(Object.fromEntries(formData));
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { namaBarang, satuan, isActive } = validatedFields.data;
    try {
        await prisma.barang.create({
            data: {
                namaBarang: namaBarang,
                satuan: satuan,
                isActive: isActive
            },
        });
    } catch (error) {
        console.log(error);
        return { message: "Gagal tambah produk" };
    }
    revalidatePath("/admin/barang");
    redirect("/admin/barang");
}

export const updateBarang = async (
    id: string,
    prevState: unknown,
    formData: FormData
) => {
    const rawData = {
        namaBarang: formData.get("namaBarang"),
        satuan: formData.get("satuan"),
        isActive: formData.get("isActive")
    };

    const validatedFields = BarangSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.barang.update({
            where: { id },
            data: {
                namaBarang: validatedFields.data.namaBarang,
                satuan: validatedFields.data.satuan,
                isActive: validatedFields.data.isActive
            },
        });
    } catch (error) {
        console.log(error);
        return { message: "Gagal update barang" };
    }
    revalidatePath("/admin/barang");
    redirect("/admin/barang");
};

export const deleteBarang = async (id: string) => {
    try {
        await prisma.barang.delete({
            where: { id },
        });

        revalidatePath("/admin/barang");
        return { success: true, message: "Barang berhasil dihapus" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Gagal menghapus barang" };
    }
};