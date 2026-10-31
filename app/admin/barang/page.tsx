import { FormTambahBarang } from "@/components/admin/barang/form-tambah-barang";
import { Suspense } from "react";
import TabelBarang from "@/components/admin/barang/table-barang";
import { getBarangPages } from "@/lib/admin/barang/data";
import Pagination from "@/components/pagination";
import Search from "@/components/search";

type BarangPageProps = {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
};

export default function BarangPage({ searchParams }: BarangPageProps) {
    return (
        <main className="max-w-7xl px-4 py-16 mt-10 mx-auto">
            <div className="flex flex-row justify-between items-center gap-6">
                <h1 className="text-lg font-bold">
                    Daftar Barang
                </h1>
            </div>

            <Suspense fallback={<div>Loading halaman barang...</div>}>
                <BarangContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}

async function BarangContent({ searchParams }: BarangPageProps) {
    const params = await searchParams;

    const query = params.query || "";
    const currentPage = Number(params.page) || 1;

    return (
        <>
            <div className="flex items-center justify-between gap-1 mb-5">
                <Suspense fallback={<p>Loading...</p>}>
                    <Search />
                </Suspense>

                <FormTambahBarang />
            </div>

            <Suspense
                key={query + currentPage}
                fallback={<div>Loading data...</div>}
            >
                <TabelBarang
                    query={query}
                    currentPage={currentPage}
                />
            </Suspense>

            <div className="flex justify-center mt-4">
                <Suspense fallback={<p>Loading pagination...</p>}>
                    <PaginationWrapper query={query} />
                </Suspense>
            </div>
        </>
    );
}

async function PaginationWrapper({ query }: { query: string }) {
    const totalPages = await getBarangPages(query);

    return <Pagination totalPages={totalPages} />;
}