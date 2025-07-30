import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { Card, CardHeader } from "../ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { AsramaProps } from "@/types/arama";
import { createAsrama, getAllAsrama } from "@/controller/asrama.service";
import { OptionProps } from "@/types/global";
import { useParams } from "next/navigation";
import { getAllKelompok } from "@/controller/kelompok.service";
import Select from "react-select";

export default function DashboardDialog({ trigger }: any) {
    const params = useParams();
    const { register, control, handleSubmit } = useForm<AsramaProps>();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { data: allKelompok, isLoading } = useQuery({
        queryKey: ["kelompok"],
        queryFn: async () => {
            const res = await getAllKelompok();
            return res;
        },
    });
    const selectValue =
        allKelompok?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const onSubmit = async (data: AsramaProps) => {
        try {
            const newData = {
                ...data,
                kelompok_id: data.kelompok_id.value,
            };
            // return alert(JSON.stringify(data));
            const res = await createAsrama(newData);
            queryClient.invalidateQueries({
                queryKey: ["asrama"],
                exact: false,
            });
            setOpen(false);
            return toast.success("Asrama berhasil ditambahkan");
        } catch (error) {
            toast.error("Gagal menambahkan data");
        }
    };

    if (isLoading) return <>loading</>;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambahkan Asrama</DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex gap-2 items-center *:w-1/3">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">Nama</label>
                                <input
                                    {...register("nama", { required: true })}
                                    type="text"
                                    placeholder="nama"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="kelompok_id">kelompok</label>
                                <Controller
                                    name="kelompok_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={selectValue}
                                            // defaultValue={selectValue[0]}
                                            onChange={(option: OptionProps) =>
                                                field.onChange(option)
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <button>Tambah</button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
