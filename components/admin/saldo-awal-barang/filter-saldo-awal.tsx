"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FilterSaldoAwal() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const status = searchParams.get("status") || "semua";

    const handleChange = (value: string | null) => {
        if (!value) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set("status", value);
        params.delete("page");

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select value={status} onValueChange={handleChange}>
            <SelectTrigger className="w-57.5">
                <SelectValue placeholder="Filter saldo awal" />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="semua">
                    Semua Barang
                </SelectItem>

                <SelectItem value="belum">
                    Belum Ditambahkan
                </SelectItem>

                <SelectItem value="sudah">
                    Sudah Ditambahkan
                </SelectItem>
            </SelectContent>
        </Select>
    );
}