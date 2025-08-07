import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    createSantri,
    getAllSantri,
    updateSantri,
} from "@/controller/santri.service";
import { SantryProps } from "@/types/santri";
import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { Controller } from "react-hook-form";
import { dateFormatApi } from "../convert/num";
import supabase from "@/lib/db";
import React, { useEffect, useState } from "react";
import RequiredSign from "../layout/required";
import ErrorMessage from "../layout/error.mesage";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAsrama } from "@/controller/asrama.service";
import { OptionProps } from "@/types/global";
import { toast } from "sonner";

interface FormProps {
    id?: number;
    nama: string;
    alamat: string;
    deskripsi: string;
    jatah: number;
    saldo: number;
    tanggal_menabung?: string | null;
    asrama_id: SingleValue<OptionProps>;
}
interface props {
    data?: any;
    buttonTrigger?: React.ReactNode;
    req?: string;
    id: string | string[];
}
export default function SantriDialog({
    data,
    buttonTrigger,
    req = "create",
    id,
}: props) {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormProps>();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: allAsrama } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const res = await getAllAsrama(Number(id));
            return res;
        },
    });
    const selectValue =
        allAsrama?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const selectedAsrama = watch("asrama_id");

    const onSubmit = async (data: FormProps) => {
        try {
            if (!data.asrama_id) return;
            const newData = {
                ...data,
                tanggal_menabung: data.saldo ? dateFormatApi(new Date()) : null,
                saldo: +data.saldo,
                jatah: +data.jatah,
                asrama_id: data?.asrama_id?.value,
            };
            // return alert(JSON.stringify(newData));
            if (req === "edit") {
                if (!data.id) {
                    return toast.error("ID santri tidak ditemukan");
                }
                const res = await updateSantri(newData);
            } else {
                const res = await createSantri(newData);
            }
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["santri"],
                exact: false,
            });
            return toast.success(
                `Santri berhasil ${
                    req === "edit" ? "diperbaharui" : "ditambahkan"
                } `
            );
        } catch (error) {
            toast.error("Gagal memproses data");
        }
    };

    useEffect(() => {
        const getData = async () => {
            setValue("id", data?.id);
            setValue("nama", data?.nama);
            setValue("alamat", data?.alamat);
            setValue("saldo", data?.saldo);
            setValue("deskripsi", data?.deskripsi);
            setValue("jatah", data?.jatah);
            const selected = allAsrama?.find(
                (item: any) => item.id === data?.asrama_id
            );
            setValue("asrama_id", {
                label: selected?.nama,
                value: selected?.id,
            });
        };
        getData();
    }, [data]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{buttonTrigger} </DialogTrigger>
            <DialogContent className="max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>
                        {req === "edit" ? "Ubah data" : "Tambahkan"} Santri
                    </DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="grid grid-cols-2 grid-rows-4 gap-4">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">
                                    Nama Santri
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("nama", {
                                        required: "Nama santri belum diisi",
                                    })}
                                    type="text"
                                    placeholder="M Fadli"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.nama && (
                                    <ErrorMessage
                                        error={errors.nama?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="alamat">
                                    Alamat
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("alamat", {
                                        required: "Alamat belum diisi",
                                    })}
                                    type="text"
                                    placeholder="Bogor"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.alamat && (
                                    <ErrorMessage
                                        error={errors.alamat?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col row-span-3 gap-1 ">
                                <label htmlFor="deskripsi">Keterangan</label>
                                <textarea
                                    {...register("deskripsi", {})}
                                    placeholder="Deskripsi..."
                                    className="w-full h-full px-1 py-2 pl-2 text-black bg-transparent border rounded resize-none border-palette"
                                />
                                {errors.deskripsi && (
                                    <ErrorMessage
                                        error={errors.deskripsi?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="jatah">
                                    Jatah
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("jatah", {
                                        required: "Jatah belum diisi",
                                    })}
                                    type="number"
                                    placeholder="5000"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.jatah && (
                                    <ErrorMessage
                                        error={errors.jatah?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col col-start-2 gap-1 ">
                                <label htmlFor="saldo">Tabungan</label>
                                <input
                                    {...register("saldo")}
                                    type="number"
                                    placeholder="150000"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.saldo && (
                                    <ErrorMessage
                                        error={errors.saldo?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col col-start-2 gap-1 ">
                                <label htmlFor="nama_kategori">
                                    Nama Asrama
                                    <RequiredSign />
                                </label>
                                {/* <Controller
                                    name="asrama_id"
                                    control={control}
                                    rules={{
                                        required: "Asrama belum dipilih.",
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <div className="flex flex-col gap-1">
                                            <Select
                                                options={selectValue}
                                                onChange={(selected) => {
                                                    setValue(
                                                        "asrama_id",
                                                        selected,
                                                        { shouldValidate: true }
                                                    );
                                                }}
                                                value={selectedAsrama}
                                                placeholder={`Pilih...`}
                                            />
                                            {error && (
                                                <ErrorMessage
                                                    error={error.message}
                                                />
                                            )}
                                        </div>
                                    )}
                                /> */}
                                <Controller
                                    name="asrama_id"
                                    control={control}
                                    rules={{
                                        required: "Asrama belum dipilih.",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            value={selectValue.find(
                                                (option: any) =>
                                                    option.value === field.value
                                            )}
                                            options={selectValue}
                                            onChange={(option) => {
                                                field.onChange(option);
                                            }}
                                        />
                                    )}
                                />
                                {errors.asrama_id && (
                                    <ErrorMessage
                                        error={errors.asrama_id?.message}
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
