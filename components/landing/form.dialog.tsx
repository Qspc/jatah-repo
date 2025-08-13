import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { KelompokProps } from "@/types/kelompok";
import { createKelompok, updateKelompok } from "@/controller/kelompok.service";
import { Card, CardHeader } from "../ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import ErrorMessage from "../layout/error.mesage";
import RequiredSign from "../layout/required";

interface props {
    req?: string;
    data?: KelompokProps;
    buttonTrigger: any;
}

export default function LandingDialog({
    req = "create",
    data,
    buttonTrigger,
}: props) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<KelompokProps>({
        defaultValues: {
            id: data?.id,
            nama: data?.nama || "",
            nama_kategori: data?.nama_kategori || "",
        },
    });
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: KelompokProps) => {
        try {
            // return alert(JSON.stringify(data));
            if (req === "edit") {
                if (!data.id) {
                    return toast.error("ID kelompok tidak ditemukan");
                }
                const res = await updateKelompok(data);
                console.log({ res });
            } else {
                const res = await createKelompok(data);
            }
            queryClient.invalidateQueries({
                queryKey: ["kelompok"],
                exact: false,
            });
            setOpen(false);
            return toast.success(
                `Kelompok berhasil ${
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
                    <DialogTitle>Tambahkan Kelompok</DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1 ">
                                <div className="flex flex-col">
                                    <label htmlFor="nama">
                                        Nama Kelompok atau Lembaga
                                        <RequiredSign />
                                    </label>
                                </div>
                                <input
                                    {...register("nama", {
                                        required: "Nama Kelompok belum diisi",
                                    })}
                                    type="text"
                                    placeholder="Pesantren, Asrama, Yayasan, dll"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.nama && (
                                    <ErrorMessage
                                        error={errors.nama?.message}
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <div className="flex flex-col">
                                    <label htmlFor="nama_kategori">
                                        Nama Kategori
                                    </label>
                                    <span className="text-xs font-light">
                                        Kelompok tempat pembagian jatah yang
                                        akan diberi, contoh: Asrama, Kamar,
                                        Kelas, Angkatan, dll
                                    </span>
                                </div>
                                <input
                                    {...register("nama_kategori")}
                                    type="text"
                                    placeholder="asrama"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.nama_kategori && (
                                    <ErrorMessage
                                        error={errors.nama_kategori?.message}
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
