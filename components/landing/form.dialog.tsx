import {
    Dialog,
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

export default function LandingDialog() {
    const { register, control, handleSubmit } = useForm<KelompokProps>();
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
                <Card className="flex flex-row items-center cursor-pointer justify-center min-w-96 max-h-28 border-dashed border-2 border-gray-300 hover:border-[#3C3C43] transition-colors">
                    <CardHeader className="flex flex-col gap-1.5 w-full items-center justify-center">
                        <div
                            className="flex cursor-pointer flex-col items-center justify-center w-full text-[#3C3C43] hover:bg-gray-100 rounded-[12px] transition-colors"
                            aria-label="Add new content"
                        >
                            <span className="mb-2 text-3xl">＋</span>
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
                                <label htmlFor="nama_kategori">Alamat</label>
                                <input
                                    {...register("nama_kategori", {})}
                                    type="text"
                                    placeholder="nama_kategori"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
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
