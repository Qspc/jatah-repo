"use client";
import { getKelompokById } from "@/controller/kelompok.service";
import LandingDialog from "../landing/form.dialog";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { LoadingButton } from "../layout/loading";

export default function PengaturanKelompok({ id }: any) {
    const { data: kelompok, isLoading } = useQuery({
        queryKey: ["kelompok", id],
        queryFn: async () => {
            const res = await getKelompokById(Number(id));
            return res;
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Kelompok</li>
            </ul>
            <div className="flex items-center justify-between w-1/2">
                {isLoading ? (
                    <Skeleton className="w-1/4 h-8 rounded-full" />
                ) : (
                    <div className="capitalize">{kelompok?.nama} </div>
                )}
                <div className="flex items-center gap-2">
                    <button
                        disabled={isLoading}
                        className="flex items-center gap-2 button-primary "
                    >
                        {isLoading && <LoadingButton />} edit
                    </button>
                    <button
                        disabled={isLoading}
                        className="flex items-center gap-2 button-delete "
                    >
                        {isLoading && <LoadingButton />} hapus
                    </button>
                </div>
            </div>
        </div>
    );
}
