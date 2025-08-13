"use client";
import { deleteKelompok, getKelompokById } from "@/controller/kelompok.service";
import LandingDialog from "../landing/form.dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { LoadingButton } from "../layout/loading";
import { DialogConfirmation } from "../ui/dialog-confirmation";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePengaturan } from "./use.context";
interface props {
    id: string | string[] | undefined;
}
export default function PengaturanKelompok({ id = "1" }: props) {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setKelompok } = usePengaturan();
    const { data: kelompok, isLoading } = useQuery({
        queryKey: ["kelompok", id],
        queryFn: async () => {
            const res = await getKelompokById(Number(id));
            setKelompok(res.nama_kategori);
            return res;
        },
        enabled: !!id,
    });

    const handleDelete = async () => {
        try {
            if (!id) {
                return toast.error("ID kelompok tidak ditemukan");
            }

            // return alert("berhaisl");
            const res = await deleteKelompok(Number(id));
            setOpen(false);
            toast.success("Kelompok berhaisl dihapus");
            router.push("/landing");
            queryClient.invalidateQueries({
                queryKey: ["kelompok"],
                exact: false,
            });
        } catch (error) {
            toast.error("Gagal menghapus kelompok");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <ul className="space-y-1 text-gray-800 list-disc list-inside">
                <li className="font-semibold text-[24px]">Kelompok</li>
            </ul>
            <div className="flex items-center justify-between w-full md:w-1/2">
                {isLoading ? (
                    <Skeleton className="w-1/4 h-8 rounded-full" />
                ) : (
                    <div className="capitalize">{kelompok?.nama} </div>
                )}
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-16 h-12 rounded-2xl" />
                        <Skeleton className="w-24 h-12 rounded-2xl" />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <LandingDialog
                            req="edit"
                            data={kelompok}
                            buttonTrigger={
                                <div className="flex items-center gap-2 button-primary ">
                                    edit
                                </div>
                            }
                        />
                        <DialogConfirmation
                            buttonTrigger={
                                <div className="flex items-center gap-2 button-delete ">
                                    hapus
                                </div>
                            }
                            open={open}
                            openChange={setOpen}
                            handleAction={handleDelete}
                            title={`Anda yakin ingin menghapus ${kelompok?.nama}?`}
                            description={`Dengan menghapus ${kelompok?.nama}, semua data yang terkait seperti data santri, data asrama dan data lainnya akan ikut terhapus secara permanen.`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
