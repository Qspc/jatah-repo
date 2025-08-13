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
import { DataSantriProps, SantryProps } from "@/types/santri";
import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { Controller } from "react-hook-form";
import { dateFormatApi, formatToThreeDigit } from "../convert/num";
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
    saldo: number;
}
interface props {
    oldData?: any;
    buttonTrigger?: React.ReactNode;
}
export default function TambahSaldoDialog({ oldData, buttonTrigger }: props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormProps>();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const onSubmit = async (data: FormProps) => {
        try {
            if (!data.saldo) return;
            const newData: DataSantriProps = {
                ...oldData,
                saldo: +oldData?.saldo + +data?.saldo,
                updated_at: new Date().toISOString(),
                tanggal_menabung: dateFormatApi(new Date()),
            };
            // return alert(JSON.stringify(newData));
            const res = await updateSantri(newData);
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["santri"],
                exact: false,
            });
            return toast.success(`Tabungan berhasil ditambahkan`);
        } catch (error) {
            toast.error("Gagal memproses data");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{buttonTrigger} </DialogTrigger>
            <DialogContent className="max-w-[1200px]">
                <DialogHeader>
                    <DialogTitle>Tambah Tabungan</DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-4 ">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="saldo">
                                    Masukkan nominal yang akan ditabung
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("saldo", {
                                        required: "nominal belum diisi.",
                                    })}
                                    type="number"
                                    placeholder="400000"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.saldo && (
                                    <ErrorMessage
                                        error={errors.saldo?.message}
                                    />
                                )}
                            </div>
                            <div className="text-[14px] text-palette-500 ">
                                Tabungan{" "}
                                <span className="font-bold capitalize">
                                    {oldData.nama}
                                </span>{" "}
                                saat ini adalah:{" "}
                                <span className="font-bold">
                                    {oldData?.saldo
                                        ? formatToThreeDigit(
                                              oldData?.saldo,
                                              true
                                          )
                                        : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-2">
                            <button type="submit" className="button-primary ">
                                Tambahkan
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
