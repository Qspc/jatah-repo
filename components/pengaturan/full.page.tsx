"use client";
import { useParams } from "next/navigation";
import PengaturanEdit from "./form.edit";
import { useQuery } from "@tanstack/react-query";
import { getAllKelompok, getKelompokById } from "@/controller/kelompok.service";

export default function PengaturanPage() {
    const params = useParams();
    const { data: kelompok, isSuccess } = useQuery({
        queryKey: ["kelompok", params?.id],
        queryFn: async () => {
            const res = await getKelompokById(Number(params.id));
            return res;
        },
    });

    return (
        <div className="flex flex-col w-full gap-10">
            <div className="main-title">Pengaturan</div>
            {isSuccess && <PengaturanEdit data={kelompok[0]} />}
        </div>
    );
}
