"use client";
import { deleteAsrama, getAllAsrama } from "@/controller/asrama.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select, { SingleValue } from "react-select";
import { LoadingButton } from "../layout/loading";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import AsramaDialog from "../dashboard/form.dialog";
import { DialogConfirmation } from "../ui/dialog-confirmation";
import { toast } from "sonner";
import { OptionProps } from "@/types/global";

interface props {
    id: string | string[] | undefined;
}
export default function PengaturanAsrama({ id = "1" }: props) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const [value, setValue] = useState<OptionProps>();
    const { data: allAsrama, isLoading } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const data = await getAllAsrama(Number(id));
            setValue({ label: data[0]?.nama, value: data[0]?.id });
            return data;
        },
    });
    const selectValue =
        allAsrama?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const handleDelete = async () => {
        try {
            if (!value) {
                setOpen(false);
                return toast.error("ID asrama tidak ditemukan");
            }

            // return alert(JSON.stringify(value));
            const res = await deleteAsrama(Number(value?.value));
            setOpen(false);
            toast.success("Asrama berhaisl dihapus");
            queryClient.invalidateQueries({
                queryKey: ["asrama"],
                exact: false,
            });
        } catch (error) {
            toast.error("Gagal menghapus asrama");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Asrama</li>
            </ul>
            <div>
                <AsramaDialog
                    buttonTrigger={
                        <div className="flex items-center gap-2 button-primary ">
                            {isLoading && <LoadingButton />} Asrama Baru +
                        </div>
                    }
                />
            </div>
            <div className="flex items-center justify-between w-full md:w-1/2">
                {isLoading ? (
                    <Skeleton className="w-1/2 h-8 " />
                ) : (
                    <Select
                        className="w-1/2"
                        value={value}
                        defaultValue={selectValue[0]}
                        options={selectValue}
                        onChange={(option) => setValue(option)}
                    />
                )}
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-16 h-12 rounded-2xl" />
                        <Skeleton className="w-24 h-12 rounded-2xl" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <AsramaDialog
                            req="edit"
                            buttonTrigger={
                                <div
                                    className={`flex items-center ${
                                        !value && "cursor-not-allowed"
                                    } gap-2 button-primary `}
                                >
                                    edit
                                </div>
                            }
                            data={
                                allAsrama?.find(
                                    (item: any) => item.id === value?.value
                                ) ?? null
                            }
                        />
                        <DialogConfirmation
                            buttonTrigger={
                                <div
                                    className={`flex ${
                                        !value && "cursor-not-allowed"
                                    } items-center gap-2 button-delete `}
                                >
                                    hapus
                                </div>
                            }
                            open={open}
                            openChange={setOpen}
                            handleAction={handleDelete}
                            title={`Anda yakin ingin menghapus ini?`}
                            description={`Dengan menghapus asrama ini, semua data yang terkait seperti data santri, data asrama dan data lainnya akan ikut terhapus secara permanen.`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
