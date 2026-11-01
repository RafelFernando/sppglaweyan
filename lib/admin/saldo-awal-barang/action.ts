'use server';

import { SaldoAwalBarangSchema } from "@/lib/admin/saldo-awal-barang/zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addSaldoAwalBarang = async (
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields = SaldoAwalBarangSchema.safeParse(
        Object.fromEntries(formData)
    );

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { barangId, tanggal, jumlah, harga } = validatedFields.data;

    try {
        const nilai = jumlah * harga;

        await prisma.saldoAwalBarang.create({
            data: {
                barangId,
                tanggal,
                jumlah,
                harga,
                nilai:nilai,
            },
        });
    } catch (error) {
        console.log(error);
        return { message: "Gagal menambahkan saldo awal barang" };
    }

    revalidatePath("/admin/saldo-awal-barang");
    redirect("/admin/saldo-awal-barang");
};

export const updateSaldoAwalBarang = async (
    id: string,
    prevState: unknown,
    formData: FormData
) => {
    const rawData = {
        barangId: formData.get("barangId"),
        tanggal: formData.get("tanggal"),
        jumlah: formData.get("jumlah"),
        harga: formData.get("harga"),
    };

    const validatedFields = SaldoAwalBarangSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { barangId, tanggal, jumlah, harga } = validatedFields.data;

    try {
        const nilai = jumlah * harga;

        await prisma.saldoAwalBarang.update({
            where: { id },
            data: {
                barangId,
                tanggal,
                jumlah,
                harga,
                nilai,
            },
        });
    } catch (error) {
        console.log(error);
        return { message: "Gagal memperbarui saldo awal barang" };
    }

    revalidatePath("/admin/saldo-awal-barang");
    redirect("/admin/saldo-awal-barang");
};

export const deleteSaldoAwalBarang = async (id: string) => {
    try {
        await prisma.saldoAwalBarang.delete({
            where: { id },
        });

        revalidatePath("/admin/saldo-awal");

        return {
            success: true,
            message: "Saldo awal barang berhasil dihapus",
        };
    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "Gagal menghapus saldo awal barang",
        };
    }
};