'use client'

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { deleteBarang } from "@/lib/admin/barang/action";
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { toast } from "@/components/ui/toast";

export function ButtonSimpanBarang() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={"bg-blue-400 text-white hover:bg-blue-600"} disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
        </Button>
    )
}

export const ButtonEditBarang = () => {
    return (
        <Button type="button" variant="outline" size="sm" className={"bg-blue-400 text-white hover:bg-blue-600"}>
            <IoPencil className="size-5" />
        </Button>
    );
}

export const ButtonDeleteBarang = ({ id }: { id: string }) => {
    const handleDelete = async () => {
        if (!confirm("Yakin ingin menghapus barang ini?")) {
            return;
        }

        const result = await deleteBarang(id);
        toast.add({
            type: "success",
            description: result.message,
        });
    };

    return (
        <Button type="button" variant="outline" size="sm" className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer" onClick={handleDelete}>
            <IoTrashOutline className="size-5" />
        </Button>
    );
};