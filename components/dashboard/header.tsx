"use client";
import { LoadingButton } from "../layout/loading";
import { useState } from "react";
import { processJatah } from "@/controller/jatah.service";
import { toast } from "sonner";
import { DialogConfirmation } from "../ui/dialog-confirmation";

interface props {
    isLoading: boolean;
    id?: string | string[];
}

export default function DashboardHeader({ isLoading, id }: props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleJatah = async () => {
        setLoading(true);
        try {
            await processJatah({ user_id: Number(id) });
            setOpen(false);
            toast.success("Jatah berhasil dibagikan");
            setLoading(false);
        } catch (error) {
            toast.error("Gagal memproses data");
        }
    };

    return (
        <div className="flex items-center justify-between ">
            <div className="main-title">dashboard</div>
            <div className="flex items-center gap-2">
                <DialogConfirmation
                    openChange={setOpen}
                    open={open}
                    actionTitle="Ya, Lanjutkan"
                    title="Bagikan Jatah Semua santri"
                    description="Apakah anda yakin ingin membagi jatah semua santri?"
                    handleAction={handleJatah}
                    buttonTrigger={
                        <div className="flex items-center gap-1 button-primary ">
                            {isLoading || (loading && <LoadingButton />)}
                            Bagikan semua Jatah
                        </div>
                    }
                />
                {/* <button
                    onClick={handleJatah}
                    disabled={isLoading || loading}
                    className="flex items-center gap-1 button-primary "
                >
                    {isLoading || (loading && <LoadingButton />)}
                    Bagikan semua Jatah
                </button> */}
            </div>
        </div>
    );
}
