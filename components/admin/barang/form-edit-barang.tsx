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
import { ButtonSimpanBarang } from "./button";
import { updateBarang } from "@/lib/admin/barang/action"
import { useActionState, useEffect } from "react";
import { IoPencil } from "react-icons/io5";
import { Barang } from "@/lib/generated/prisma/client";
import { toast } from "@/components/ui/toast";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function FormEditBarang({ Barangs }: { Barangs: Barang }) {
    const [state, formAction] = useActionState(
        updateBarang.bind(null, Barangs.id),
        null
    );
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
            <DialogTrigger render={<Button type="button" variant="outline" size="sm" className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer">
                <IoPencil className="size-5" />
            </Button>} />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Tambah Barang</DialogTitle>
                    <DialogDescription>
                        Masukan Barang yang ingin ditambahkan
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
                            <Label htmlFor="namaBarang">Nama Barang</Label>
                            <Input id="namaBarang" name="namaBarang" defaultValue={Barangs.namaBarang ?? ""} placeholder="Contoh : Tepung" />
                            <p className="text-sm text-red-500">
                                {state?.errors?.namaBarang}
                            </p>
                        </Field>

                        <Field>
                            <Label htmlFor="satuan">Satuan Barang</Label>
                            <Select id="satuan" name="satuan" defaultValue={Barangs.satuan ?? ""}>
                                {/* Tombol pemicu dropdown */}
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Satuan" />
                                </SelectTrigger>

                                {/* Konten menu melayang */}
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pilih Satuan</SelectLabel>
                                        {/* Opsi pilihan individual */}
                                        <SelectItem value="pcs">pcs</SelectItem>
                                        <SelectItem value="kg">kg</SelectItem>
                                        <SelectItem value="botol">botol</SelectItem>
                                        <SelectItem value="botol">liter</SelectItem>
                                        <SelectItem value="biji">biji</SelectItem>
                                        <SelectItem value="dirigen">dirigen</SelectItem>
                                        <SelectItem value="pack">pack</SelectItem>
                                        <SelectItem value="lonjor">lonjor</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field>
                            <Label htmlFor="isActive">Status</Label>
                            <Select id="isActive" name="isActive" defaultValue={Barangs.isActive ?? ""}>
                                {/* Tombol pemicu dropdown */}
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pilih Status</SelectLabel>
                                        {/* Opsi pilihan individual */}
                                        <SelectItem value="true">Aktif</SelectItem>
                                        <SelectItem value="false">Tidak Aktif</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Batal</Button>} />
                        <ButtonSimpanBarang />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
