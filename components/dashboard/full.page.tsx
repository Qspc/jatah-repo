"use client";
import { useParams } from "next/navigation";
import DashboardCard from "./card";
import DashboardChart from "./chart";
import DashboardHeader from "./header";
import { useQuery } from "@tanstack/react-query";
import { getKelompokById } from "@/controller/kelompok.service";
import { useState } from "react";
import { DialogConfirmation } from "../ui/dialog-confirmation";

export default function DashboardPage() {
    const params = useParams();
    const [asrama, setAsrama] = useState("Asrama");
    const { data: kelompok, isLoading } = useQuery({
        queryKey: ["kelompok", params?.id],
        queryFn: async () => {
            const res = await getKelompokById(Number(params.id));
            if (res.nama_kategori) setAsrama(res.nama_kategori);
            return res;
        },
    });

    return (
        <div className="flex flex-col w-full gap-10 ">
            <DashboardHeader id={params.id} isLoading={isLoading} />
            <DashboardCard
                isLoading={isLoading}
                data={kelompok}
                kategori={asrama}
            />
            <DashboardChart isLoading={isLoading} params={Number(params.id)} />
        </div>
    );
}
