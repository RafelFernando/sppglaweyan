
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
import { ButtonSimpanSaldoAwal } from "./button"
import { updateSaldoAwalBarang } from "@/lib/admin/saldo-awal-barang/action"
import { useActionState, useEffect } from "react"
import { IoPencil } from "react-icons/io5"
import { toast } from "@/components/ui/toast"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type SaldoAwalBarangProps = {
    id: string
    barangId: string
    tanggal: Date
    jumlah: number
    harga: number
    nilai: number
    barang: {
        id: string
        namaBarang: string
        satuan: string | null
        isActive: string
    }
}

type BarangOption = {
    id: string
    namaBarang: string
    satuan: string | null
}

export function FormEditSaldoAwalBarang({
    saldoAwal,
    barang,
}: {
    saldoAwal: SaldoAwalBarangProps
    barang: BarangOption[]
}) {
    const [state, formAction] = useActionState(
        updateSaldoAwalBarang.bind(null, saldoAwal.id),
        null
    )

    useEffect(() => {
        if (state?.message) {
            toast.add({
                type: "error",
                description: state.message,
            })
        }
    }, [state])

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer"
                    >
                        <IoPencil className="size-5" />
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Edit Saldo Awal Barang</DialogTitle>
                    <DialogDescription>
                        Ubah data saldo awal barang.
                    </DialogDescription>
                </DialogHeader>

                {state?.message && (
                    <div
                        className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-800"
                        role="alert"
                    >
                        {state.message}
                    </div>
                )}

                <form action={formAction}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="barangId">Nama Barang</Label>

                            <Select
                                name="barangId"
                                defaultValue={saldoAwal.barangId}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Barang" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Daftar Barang</SelectLabel>

                                        {barang.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.namaBarang} ({item.satuan})
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <p className="text-sm text-red-500">
                                {state?.errors?.barangId?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="tanggal">Tanggal</Label>
                            <Input
                                id="tanggal"
                                name="tanggal"
                                type="date"
                                defaultValue={
                                    new Date(saldoAwal.tanggal)
                                        .toISOString()
                                        .split("T")[0]
                                }
                            />
                            <p className="text-sm text-red-500">
                                {state?.errors?.tanggal?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="jumlah">Jumlah Saldo Awal</Label>
                            <Input
                                id="jumlah"
                                name="jumlah"
                                type="number"
                                step="0.001"
                                min="0.001"
                                defaultValue={String(saldoAwal.jumlah)}
                                placeholder="Contoh: 100"
                            />
                            <p className="text-sm text-red-500">
                                {state?.errors?.jumlah?.[0]}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="harga">Harga Beli Satuan (Rp)</Label>
                            <Input
                                id="harga"
                                name="harga"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={String(saldoAwal.harga)}
                                placeholder="Contoh: 15000"
                            />
                            <p className="text-sm text-red-500">
                                {state?.errors?.harga?.[0]}
                            </p>
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="mt-4">
                        <DialogClose
                            render={
                                <Button variant="outline">
                                    Batal
                                </Button>
                            }
                        />
                        <ButtonSimpanSaldoAwal />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
