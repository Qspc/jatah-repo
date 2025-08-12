"use client";
import { deleteSantri, getAllSantri } from "@/controller/santri.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { LoadingButton } from "../layout/loading";
import { Skeleton } from "../ui/skeleton";
import SantriDialog from "../santri/form.dialog";
import { OptionProps } from "@/types/global";
import { useState } from "react";
import { DialogConfirmation } from "../ui/dialog-confirmation";
import { toast } from "sonner";
interface props {
    id?: string | string[];
}
export default function PengaturanSantri({ id = "1" }: props) {
    const [value, setValue] = useState<OptionProps>();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data: allSantri, isLoading } = useQuery({
        queryKey: ["santri", id],
        queryFn: async () => {
            const data = await getAllSantri(Number(id));
            setValue({ label: data[0]?.nama, value: data[0]?.id });
            return data;
        },
    });
    const selectValue =
        allSantri?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const handleDelete = async () => {
        try {
            if (!value) {
                setOpen(false);
                return toast.error("ID santri tidak ditemukan");
            }

            // return alert(JSON.stringify(value));
            const res = await deleteSantri(Number(value?.value));
            setOpen(false);
            toast.success("Santri berhasil dihapus");
            queryClient.invalidateQueries({
                queryKey: ["santri"],
                exact: false,
            });
        } catch (error) {
            toast.error("Gagal menghapus santri");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Santri</li>
            </ul>
            <div>
                <SantriDialog
                    id={id}
                    buttonTrigger={
                        <div className="flex items-center gap-2 button-primary ">
                            {isLoading && <LoadingButton />} Santri Baru +
                        </div>
                    }
                />
            </div>
            <div className="flex items-center justify-between w-1/2">
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
                <div className="flex items-center gap-2">
                    <SantriDialog
                        req="edit"
                        id={id}
                        buttonTrigger={
                            <div
                                className={`flex items-center ${
                                    !value && "cursor-not-allowed"
                                } gap-2 button-primary `}
                            >
                                {isLoading && <LoadingButton />} edit
                            </div>
                        }
                        data={
                            allSantri?.find(
                                (item: any) => item.id === value?.value
                            ) ?? null
                        }
                    />
                    <DialogConfirmation
                        buttonTrigger={
                            <div
                                className={`flex items-center ${
                                    !value && "cursor-not-allowed"
                                } gap-2 button-delete `}
                            >
                                {isLoading && <LoadingButton />} hapus
                            </div>
                        }
                        open={open}
                        openChange={setOpen}
                        handleAction={handleDelete}
                        title={`Anda yakin ingin menghapus ${value?.label}?`}
                        cancelTitle="Periksa lagi"
                        description={
                            <>
                                Dengan menghapus ini, semua data yang berkaitan
                                dengan{" "}
                                <span className="font-bold">
                                    {value?.label}
                                </span>{" "}
                                akan menghilang.
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
