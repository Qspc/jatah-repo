"use client";
import { useParams } from "next/navigation";
import PengaturanEdit from "./form.edit";
import { useQuery } from "@tanstack/react-query";
import { getAllKelompok, getKelompokById } from "@/controller/kelompok.service";
import PengaturanKelompok from "./content.kelompok";
import PengaturanAsrama from "./content.asrama";
import PengaturanSantri from "./content.santri";

export default function PengaturanPage() {
    const params = useParams();

    return (
        <div className="flex flex-col w-full h-full gap-10">
            <div className="main-title">Pengaturan</div>
            <PengaturanKelompok id={params.id} />
            <PengaturanAsrama id={params.id} />
            <PengaturanSantri />
        </div>
    );
}
