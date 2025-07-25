"use client";
import { useQuery } from "@tanstack/react-query";
import SantriHeader from "./header";
import { getAllAsrama } from "@/controller/asrama.service";
import { useState } from "react";
import SantriBody from "./body";
import { useAsrama } from "./use.context";

export default function SantriPage() {
    const [information, setInformation] = useState([]);
    const { setAsramaId } = useAsrama();

    const { data: allAsrama, isLoading } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const data = await getAllAsrama();
            setAsramaId(data[0]?.id);
            return data;
        },
    });

    if (isLoading) return <>loading</>;

    return (
        <div className="flex flex-col w-full h-screen gap-10">
            <SantriHeader santri={allAsrama} />
            <SantriBody santri={allAsrama} />
        </div>
    );
}
