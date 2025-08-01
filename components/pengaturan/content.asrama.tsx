"use client";
import { getAllAsrama } from "@/controller/asrama.service";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
import { LoadingButton } from "../layout/loading";
import { Skeleton } from "../ui/skeleton";

export default function PengaturanAsrama({ id }: any) {
    const { data: allAsrama, isLoading } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const data = await getAllAsrama(Number(id));
            return data;
        },
    });
    const selectValue =
        allAsrama?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Asrama</li>
            </ul>
            <div>
                <button
                    disabled={isLoading}
                    className="flex items-center gap-2 button-primary "
                >
                    {" "}
                    {isLoading && <LoadingButton />} Asrama Baru +
                </button>
            </div>
            <div className="flex items-center justify-between w-1/2">
                {isLoading ? (
                    <Skeleton className="w-1/2 h-8 " />
                ) : (
                    <Select
                        className="w-1/2"
                        defaultValue={selectValue[0]}
                        options={selectValue}
                        // onChange={handleChange}
                    />
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
