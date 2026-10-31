import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getBarang } from "@/lib/admin/barang/data";
import { ButtonDeleteBarang } from "./button";
import { FormEditBarang } from "./form-edit-barang";

export default async function TabelBarang({ query, currentPage }: { query: string, currentPage: number }) {
    const barang = await getBarang(query, currentPage);

    if (!barang || barang.length === 0) {
        return <p>Tidak ada data barang.</p>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">No</TableHead>
                    <TableHead>Nama Barang</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {barang.map((barang, index) => (
                    <TableRow key={barang.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{barang.namaBarang}</TableCell>
                        <TableCell>{barang.satuan}</TableCell>
                        <TableCell>
                            {barang.isActive == "true" ? (
                                <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                    Aktif
                                </span>
                            ) : (
                                <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                    Tidak Aktif
                                </span>
                            )}
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <FormEditBarang key={barang.id} Barangs={barang} />
                            <ButtonDeleteBarang key={barang.id} id={barang.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}