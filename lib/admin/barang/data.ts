import { prisma } from '@/lib/prisma';

const ITEMS_PER_PAGE = 5;

export const getBarang = async (query: string, currentPage: number) => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        // await new Promise(resolve => setTimeout(resolve, 3000));
        const contacts = await prisma.barang.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                OR: [
                    {
                        namaBarang: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                    {
                        satuan: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                    {
                        isActive: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                ],
            },
        });
        return contacts;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch contacts");
    }
};

export const getBarangPages = async (query: string) => {
    try {
        const contacts = await prisma.barang.count({
            where: {
                OR: [
                    {
                        namaBarang: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                    {
                        satuan: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                    {
                        isActive: {
                            contains: query,
                            mode: "insensitive"
                        },
                    },
                ],
            },
        });
        const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch contacts");
    }
};