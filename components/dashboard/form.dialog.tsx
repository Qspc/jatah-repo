import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { KelompokProps } from "@/types/kelompok";
import {
    createKelompok,
    getAllKelompok,
    updateKelompok,
} from "@/controller/kelompok.service";
import { Card, CardHeader } from "../ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import ErrorMessage from "../layout/error.mesage";
import RequiredSign from "../layout/required";
import { AsramaProps } from "@/types/arama";
import { SingleValue } from "react-select";
import { OptionProps } from "@/types/global";
import Select from "react-select";
import { createAsrama, updateAsrama } from "@/controller/asrama.service";

interface props {
    req?: string;
    data?: any;
    buttonTrigger: React.ReactNode;
}
interface FormProps {
    id?: number;
    nama: string;
    kelompok_id: SingleValue<OptionProps>;
}

export default function AsramaDialog({
    req = "create",
    data,
    buttonTrigger,
}: props) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormProps>({
        defaultValues: {
            id: data?.id,
            nama: data?.nama || "",
            kelompok_id: data?.kelompok_id || null,
        },
    });
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const { data: allKelompok, isLoading } = useQuery({
        queryKey: ["kelompok"],
        queryFn: async () => {
            const res = await getAllKelompok();
            return res;
        },
    });
    watch("nama", data?.nama);
    // watch("kelompok_id",data?.nama)

    const selectValue =
        allKelompok?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const onSubmit = async (data: FormProps) => {
        try {
            return alert(JSON.stringify(data));
            const newdata = {
                ...data,
                kelompok_id: data.kelompok_id?.value,
            };
            if (req === "edit") {
                if (!data.id) {
                    return toast.error("ID asrama tidak ditemukan");
                }
                // const res = await updateAsrama(newdata);
                // console.log({ res });
            } else {
                // const res = await createAsrama(newdata);
            }
            queryClient.invalidateQueries({
                queryKey: ["asrama"],
                exact: false,
            });
            setOpen(false);
            return toast.success(
                `Asrama berhasil ${
                    req === "edit" ? "diperbaharui" : "ditambahkan"
                } `
            );
        } catch (error) {
            toast.error("Gagal menambahkan data");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{buttonTrigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {req === "edit" ? "Ubah data" : "Tambahkan"} Asrama
                    </DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">
                                    Nama Asrama
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("nama", {
                                        required: "Nama Asrama belum diisi",
                                    })}
                                    type="text"
                                    placeholder="Asrama A"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.nama && (
                                    <ErrorMessage
                                        error={errors.nama?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama_kategori">
                                    Nama Kelompok
                                </label>
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
                                {errors.kelompok_id && (
                                    <ErrorMessage
                                        error={errors.kelompok_id?.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-2">
                            <button type="submit" className="button-primary ">
                                {req === "edit" ? "Update" : "Tambah"}
                            </button>
                            <DialogClose>
                                <div
                                    onClick={() => reset()}
                                    className="button-delete"
                                >
                                    Batal
                                </div>
                            </DialogClose>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
