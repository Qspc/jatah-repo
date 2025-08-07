"use client";
import { useParams } from "next/navigation";
import PengaturanKelompok from "./content.kelompok";
import PengaturanAsrama from "./content.asrama";
import PengaturanSantri from "./content.santri";

export default function PengaturanPage() {
    const params = useParams();

    return (
        <div className="flex flex-col w-full h-full gap-10">
            <div className="main-title">Pengaturan</div>
            <PengaturanKelompok id={params.id} />
            <PengaturanAsrama id={params?.id} />
            <PengaturanSantri id={params?.id} />
        </div>
    );
}
