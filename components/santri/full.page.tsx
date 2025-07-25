"use client";
import { useQuery } from "@tanstack/react-query";
import SantriHeader from "./header";
import { getAllAsrama } from "@/controller/asrama.service";
import { useState } from "react";

export default function SantriPage() {
    const [information, setInformation] = useState([]);
    const { data: allSantri } = useQuery({
        queryKey: ["asrama", "dropdown"],
        queryFn: async () => {
            const data = getAllAsrama();
            return data;
        },
    });

    return (
        <div className="w-full h-screen">
            <SantriHeader santri={allSantri} />
        </div>
    );
}
