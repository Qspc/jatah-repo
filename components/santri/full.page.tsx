"use client";
import { useQuery } from "@tanstack/react-query";
import SantriHeader from "./header";
import { getAllAsrama } from "@/controller/asrama.service";
import { useState } from "react";
import SantriBody from "./body";
import { useAsrama } from "./use.context";
import { useParams } from "next/navigation";
import SantriTitle from "./title";

export default function SantriPage() {
    const { setAsramaId } = useAsrama();
    const params = useParams();

    const { data: allAsrama, isLoading } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const data = await getAllAsrama(Number(params.id));
            setAsramaId(data[0]?.id);
            return data;
        },
    });

    const [information, setInformation] = useState({
        jatah: allAsrama ? allAsrama[0]?.jumlah_jatah : 0,
        santri: allAsrama ? allAsrama[0]?.jumlah_santri : 0,
        nama: allAsrama ? allAsrama[0]?.nama : "-",
    });

    if (isLoading) return <>loading</>;

    return (
        <div className="flex flex-col w-full gap-10">
            <SantriTitle />
            <SantriHeader
                santri={allAsrama}
                information={information}
                setInformation={setInformation}
            />
            <SantriBody nama={information.nama} />
        </div>
    );
}
