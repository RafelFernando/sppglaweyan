import { FormTambahBarang } from "@/components/admin/barang/form-tambah-barang";
import { Suspense } from "react";
import TabelBarang from "@/components/admin/barang/table-barang";
import { getBarangPages } from "@/lib/admin/barang/data";
import Pagination from "@/components/pagination";
import Search from "@/components/search";

export default async function KategoriProdukPage({
    searchParams
}: {
    searchParams: Promise<{ query?: string; page?: string }>;
}) {
    const query = (await searchParams)?.query || "";
    const currentPage = Number((await searchParams)?.page) || 1;
    const totalPages = await getBarangPages(query);
    return (
        <main className="max-w-7xl px-4 py-16 mt-10 mx-auto">
            <div className="flex flex-row justify-between items-center gap-6">
                <h1 className="text-lg font-bold">
                    Daftar Barang
                </h1>
            </div>

            <div className="flex items-center justify-between gap-1 mb-5">
                <Search />
                <FormTambahBarang />
            </div>

            <Suspense key={query + currentPage} fallback={<div>Loading data...</div>}>
                <TabelBarang query={query} currentPage={currentPage} />
            </Suspense>

            <div className="flex justify-center mt-4">
                <Pagination totalPages={totalPages} />
            </div>
        </main>
    );
}