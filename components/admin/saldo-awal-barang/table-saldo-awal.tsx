
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getBarangSaldoAwal } from "@/lib/admin/saldo-awal-barang/data";
import { ButtonDeleteSaldoAwal } from "./button";
import { FormEditSaldoAwalBarang } from "./form-edit-saldo-awal";
import { FormTambahSaldoAwalBarang } from "./form-tambah-saldo-awal";

export default async function TabelSaldoAwalBarang({
    query,
    currentPage,
    status
}: {
    query: string;
    currentPage: number;
    status: string;
}) {
    const barang = await getBarangSaldoAwal(query, currentPage, status);

    if (barang.length === 0) {
        return <p>Tidak ada data barang.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-16">No</TableHead>
                    <TableHead>Nama Barang</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Tanggal Saldo Awal</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Harga Satuan</TableHead>
                    <TableHead>Nilai</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {barang.map((item, index) => {
                    const saldoAwal = item.saldoAwal;

                    return (
                        <TableRow key={item.id}>
                            <TableCell>
                                {(currentPage - 1) * 5 + index + 1}
                            </TableCell>

                            <TableCell>
                                {item.namaBarang}
                            </TableCell>

                            <TableCell>
                                {item.satuan ?? "-"}
                            </TableCell>

                            <TableCell>
                                {saldoAwal
                                    ? new Date(saldoAwal.tanggal).toLocaleDateString(
                                          "id-ID",
                                          {
                                              day: "2-digit",
                                              month: "long",
                                              year: "numeric",
                                          }
                                      )
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                {saldoAwal
                                    ? saldoAwal.jumlah.toLocaleString("id-ID")
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                {saldoAwal
                                    ? `Rp ${saldoAwal.harga.toLocaleString("id-ID")}`
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                {saldoAwal
                                    ? `Rp ${saldoAwal.nilai.toLocaleString("id-ID")}`
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    {saldoAwal ? (
                                        <>
                                            <FormEditSaldoAwalBarang
                                                saldoAwal={{
                                                    ...saldoAwal,
                                                    barang: item,
                                                }}
                                                barang={[{
                                                    id: item.id,
                                                    namaBarang: item.namaBarang,
                                                    satuan: item.satuan,
                                                }]}
                                            />

                                            <ButtonDeleteSaldoAwal
                                                id={saldoAwal.id}
                                            />
                                        </>
                                    ) : (
                                        <FormTambahSaldoAwalBarang
                                            barang={[{
                                                id: item.id,
                                                namaBarang: item.namaBarang,
                                                satuan: item.satuan,
                                            }]}
                                            defaultBarangId={item.id}
                                        />
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
