"use client";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getAllAsrama } from "@/controller/asrama.service";
import { getAllKelompok } from "@/controller/kelompok.service";
import { getAllSantri } from "@/controller/santri.service";
import { useQuery } from "@tanstack/react-query";

export default function CardLandingPage() {
    const { data, isSuccess } = useQuery({
        queryKey: ["kelompok"],
        queryFn: async () => {
            const data = getAllKelompok();
            return data;
        },
    });

    return (
        <div className="flex gap-8 flex-wrap justify-center items-center">
            {isSuccess && data && data.length > 0 && (
                <>
                    {data.map((res: any, index: any) => (
                        <Card
                            key={index}
                            className="flex flex-row items-center justify-between max-h-28 min-w-96"
                        >
                            <CardHeader className="flex flex-col gap-1.5 w-[80%]">
                                <CardTitle className="text-[18px] overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                                    {res.nama}
                                </CardTitle>
                                <CardDescription className="text-[14px] font-medium">
                                    {res.alamat}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <button className="py-2 px-4 cursor-pointer text-sm bg-[#3C3C43] rounded-[12px] text-white">
                                    Masuk
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
            <Card className="flex flex-row items-center cursor-pointer justify-center min-w-96 max-h-28 border-dashed border-2 border-gray-300 hover:border-[#3C3C43] transition-colors">
                <CardHeader className="flex flex-col gap-1.5 w-full items-center justify-center">
                    <button
                        className="flex cursor-pointer flex-col items-center justify-center w-full text-[#3C3C43] hover:bg-gray-100 rounded-[12px] transition-colors"
                        aria-label="Add new content"
                    >
                        <span className="text-3xl mb-2">＋</span>
                        <span className="text-[16px] font-medium">
                            Tambah Baru
                        </span>
                    </button>
                </CardHeader>
            </Card>
        </div>
    );
}
