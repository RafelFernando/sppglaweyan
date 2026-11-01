import { Suspense } from "react";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import TabelSaldoAwalBarang from "@/components/admin/saldo-awal-barang/table-saldo-awal";
import { getBarangSaldoAwalPages } from "@/lib/admin/saldo-awal-barang/data";
import FilterSaldoAwal from "@/components/admin/saldo-awal-barang/filter-saldo-awal";

type SearchParams = {
    query?: string;
    page?: string;
    status?: string;
};

type SaldoAwalPageProps = {
    searchParams: Promise<SearchParams>;
};

export default function SaldoAwalPage({
    searchParams,
}: SaldoAwalPageProps) {
    return (
        <main className="max-w-7xl px-4 py-16 mt-10 mx-auto">
            <h1 className="text-lg font-bold mb-5">
                Daftar Saldo Awal Barang
            </h1>

            <Suspense fallback={<div>Loading halaman saldo awal...</div>}>
                <SaldoAwalContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}

async function SaldoAwalContent({
    searchParams,
}: SaldoAwalPageProps) {
    const params = await searchParams;

    const query = params.query || "";
    const currentPage = Math.max(1, Number(params.page) || 1);
    const status = ["semua", "belum", "sudah"].includes(params.status || "")
        ? params.status || "semua"
        : "semua";

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="flex-1">
                    <Suspense fallback={<p>Loading search...</p>}>
                        <Search />
                    </Suspense>
                </div>

                <Suspense fallback={<p>Loading filter...</p>}>
                    <FilterSaldoAwal />
                </Suspense>
            </div>

            <Suspense
                key={`${query}-${currentPage}-${status}`}
                fallback={<div>Loading data barang...</div>}
            >
                <TabelSaldoAwalBarang
                    query={query}
                    currentPage={currentPage}
                    status={status}
                />
            </Suspense>

            <div className="flex justify-center mt-4">
                <Suspense fallback={<p>Loading pagination...</p>}>
                    <PaginationWrapper query={query} status={status} />
                </Suspense>
            </div>
        </>
    );
}

async function PaginationWrapper({
    query,
    status,
}: {
    query: string;
    status: string;
}) {
    const totalPages = await getBarangSaldoAwalPages(query, status);

    return <Pagination totalPages={totalPages} />;
}