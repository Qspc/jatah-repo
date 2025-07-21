"use client";
import supabase from "@/lib/db";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase.from("santri").select("*");

            if (error) {
                console.error("Error fetching data:", error);
            } else {
                console.log(data);
                setData(data);
            }
        };
        getData();
    }, []);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            {data && data.length > 0 && (
                <div>
                    {data.map((item, index) => (
                        <div key={index}>
                            {item.nama}
                            {item.saldo}
                            {item.jatah}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
