import { useQuery } from "@tanstack/react-query";
import MultiAxisChart from "../chart/multi.line";
import { getAllAsrama } from "@/controller/asrama.service";
import { useState } from "react";
interface props {
    params: number;
}

export default function DashboardChart({ params }: props) {
    const [maxSantri, setMaxSantri] = useState(0);
    const [maxJatah, setMaxJatah] = useState(0);
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
                display: true,
                text: "Grafik Santri per asrama dan jatahnya",
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
            <MultiAxisChart data={data} options={options} />
        </div>
    );
}
