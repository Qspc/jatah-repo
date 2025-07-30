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
import { createKelompok } from "@/controller/kelompok.service";
import { Card, CardHeader } from "../ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import ErrorMessage from "../layout/error.mesage";
import RequiredSign from "../layout/required";

export default function LandingDialog() {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<KelompokProps>();
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: KelompokProps) => {
        try {
            // return alert(JSON.stringify(newData));
            const res = await createKelompok(data);
            queryClient.invalidateQueries({
                queryKey: ["kelompok"],
                exact: false,
            });
            setOpen(false);
            return toast.success("Kelompok berhasil ditambahkan");
        } catch (error) {
            toast.error("Gagal menambahkan data");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Card className="flex flex-row items-center justify-center transition-colors border-2 border-gray-300 border-dashed cursor-pointer group min-w-96 max-h-28">
                    <CardHeader className="flex flex-col gap-1.5 w-full items-center justify-center">
                        <div
                            className="flex cursor-pointer flex-col items-center justify-center w-full group-hover:bg-white group-hover:text-palette-500 text-white bg-palette rounded-[12px] p-1 transition-colors"
                            aria-label="Add new content"
                        >
                            <span className="mb-1 text-3xl">＋</span>
                            <span className="text-[16px] font-medium">
                                Tambah Baru
                            </span>
                        </div>
                    </CardHeader>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambahkan Kelompok</DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">
                                    Nama Kelompok
                                    <RequiredSign />
                                </label>
                                <input
                                    {...register("nama", {
                                        required: "Name Kelompok belum diisi",
                                    })}
                                    type="text"
                                    placeholder="nama kelompok"
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
                                    Nama Kategori
                                </label>
                                <input
                                    {...register("nama_kategori")}
                                    type="text"
                                    placeholder="asrama"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                                {errors.nama && (
                                    <ErrorMessage
                                        error={errors.nama?.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-2">
                            <button type="submit" className="button-primary ">
                                Tambah
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
