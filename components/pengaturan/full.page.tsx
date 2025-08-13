"use client";
import { useParams } from "next/navigation";
import PengaturanKelompok from "./content.kelompok";
import PengaturanAsrama from "./content.asrama";
import PengaturanSantri from "./content.santri";
import { usePengaturan } from "./use.context";

export default function PengaturanPage() {
    const params = useParams();
    const { isHaveAsrama } = usePengaturan();

    return (
        <div className="flex flex-col w-full h-full gap-10">
            <div className="main-title">Pengaturan</div>
            <PengaturanKelompok id={params.id} />
            <PengaturanAsrama id={params?.id} />
            {isHaveAsrama && <PengaturanSantri id={params?.id} />}
        </div>
    );
}
