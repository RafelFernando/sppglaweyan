import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

const getWhere = (query: string, status: string) => ({
    isActive: "true",

    namaBarang: {
        contains: query,
        mode: "insensitive" as const,
    },

    ...(status === "belum"
        ? { saldoAwal: null }
        : status === "sudah"
          ? { saldoAwal: { isNot: null } }
          : {}),
});

export const getBarangSaldoAwal = async (
    query: string = "",
    currentPage: number = 1,
    status: string = "semua"
) => {
    const page = Math.max(1, Number(currentPage) || 1);

    return prisma.barang.findMany({
        where: getWhere(query, status),

        include: {
            saldoAwal: true,
        },

        orderBy: {
            namaBarang: "asc",
        },

        skip: (page - 1) * ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
    });
};

export const getBarangSaldoAwalPages = async (
    query: string = "",
    status: string = "semua"
) => {
    const totalData = await prisma.barang.count({
        where: getWhere(query, status),
    });

    return Math.ceil(totalData / ITEMS_PER_PAGE);
};