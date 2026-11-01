
'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ButtonSimpanBarang } from "../barang/button"
import { useActionState } from "react"
import { addSaldoAwalBarang } from "@/lib/admin/saldo-awal-barang/action"

type BarangOption = {
    id: string
    namaBarang: string
    satuan: string | null
}

type Props = {
    barang: BarangOption[]
    defaultBarangId: string
}

export function FormTambahSaldoAwalBarang({
    barang,
    defaultBarangId,
}: Props) {
    const [state, formAction] = useActionState(
        addSaldoAwalBarang,
        null
    )

    const selectedBarang = barang.find(
        (item) => item.id === defaultBarangId
    )

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="bg-blue-400 text-white hover:bg-blue-600"
                    >
                        Tambah
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Tambah Saldo Awal Barang</DialogTitle>
                    <DialogDescription>
                        Masukkan saldo awal untuk barang ini.
                    </DialogDescription>
                </DialogHeader>

                {state?.message && (
                    <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-800">
                        {state.message}
                    </div>
                )}

                <form action={formAction}>
                    <FieldGroup>
                        <Field>
                            <Label>Nama Barang</Label>

                            <Input
                                value={selectedBarang?.namaBarang ?? ""}
                                readOnly
                            />

                            <input
                                type="hidden"
                                name="barangId"
                                value={defaultBarangId}
                            />

                            <p className="text-sm text-red-500">
                                {state?.error?.barangId?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="tanggal">Tanggal</Label>
                            <Input
                                id="tanggal"
                                name="tanggal"
                                type="date"
                                required
                            />
                            <p className="text-sm text-red-500">
                                {state?.error?.tanggal?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="jumlah">Jumlah Saldo Awal</Label>
                            <Input
                                id="jumlah"
                                name="jumlah"
                                type="number"
                                step="1"
                                min="1"
                                placeholder="Contoh: 100"
                                required
                            />
                            <p className="text-sm text-red-500">
                                {state?.error?.jumlah?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="harga">Harga Beli Satuan (Rp)</Label>
                            <Input
                                id="harga"
                                name="harga"
                                type="number"
                                step="1"
                                min="0"
                                placeholder="Contoh: 15000"
                                required
                            />
                            <p className="text-sm text-red-500">
                                {state?.error?.harga?.[0]}
                            </p>
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose
                            render={
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            }
                        />
                        <ButtonSimpanBarang />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
