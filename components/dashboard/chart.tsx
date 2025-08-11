import { useQuery } from "@tanstack/react-query";
import MultiAxisChart from "../chart/multi.line";
import { getAllAsrama } from "@/controller/asrama.service";
import { useState } from "react";
import { LoadingButton, LoadingPage } from "../layout/loading";
import { useRouter } from "next/navigation";
interface props {
    params: number;
    isLoading: boolean;
}

export default function DashboardChart({ params, isLoading }: props) {
    const [maxSantri, setMaxSantri] = useState(0);
    const [maxJatah, setMaxJatah] = useState(0);
    const router = useRouter();
    const { data: allAsrama } = useQuery({
        queryKey: ["asrama"],
        queryFn: async () => {
            const data = await getAllAsrama(params);
            setMaxSantri(
                Math.max(...data.map((item: any) => item.jumlah_santri))
            );
            setMaxJatah(
                Math.max(...data.map((item: any) => item.jumlah_jatah))
            );
            return data;
        },
    });

    const labels = allAsrama?.map((item: any) => item.nama);
    const data = {
        labels,
        datasets: [
            {
                label: "Jumlah Santri",
                data: allAsrama?.map((item: any) => item.jumlah_santri),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                yAxisID: "y",
            },
            {
                label: "Total Jatah",
                data: allAsrama?.map((item: any) => item.jumlah_jatah),
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                yAxisID: "y1",
            },
        ],
    };
    const options = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                min: 0,
                max: Math.round(maxSantri + maxSantri / 4),
                title: {
                    display: true,
                    text: "Total Santri",
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                min: 0,
                max: Math.round(maxJatah + maxJatah / 4),
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "Total Jatah",
                },
            },
        },
    };

    return (
        <div className="w-full">
            {isLoading ? (
                <div className="flex items-center justify-center w-full h-40 mb-10 ">
                    <LoadingPage />
                </div>
            ) : (
                <>
                    {allAsrama && allAsrama?.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            <div className="w-full text-xl font-semibold text-center capitalize">
                                Grafik Santri per asrama dan jatahnya
                            </div>
                            <MultiAxisChart data={data} options={options} />
                        </div>
                    ) : (
                        <button
                            onClick={() =>
                                router.push(`/landing/${params}/pengaturan`)
                            }
                            className=" button-primary"
                        >
                            Tambahkan Santri +
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
