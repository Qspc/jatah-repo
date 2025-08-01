"use client";
import { getKelompokById } from "@/controller/kelompok.service";
import LandingDialog from "../landing/form.dialog";
import { useQuery } from "@tanstack/react-query";

export default function PengaturanKelompok({ id }: any) {
    const { data: kelompok, isLoading } = useQuery({
        queryKey: ["kelompok", id],
        queryFn: async () => {
            const res = await getKelompokById(Number(id));
            return res;
        },
    });

    if (isLoading) return <div>loading</div>;

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Kelompok</li>
            </ul>
            <div className="flex items-center justify-between w-1/2">
                <div>{kelompok?.nama} </div>
                <div className="flex items-center gap-2">
                    <button className="button-primary">edit</button>
                    <button className="button-delete">hapus</button>
                </div>
            </div>
        </div>
    );
}
