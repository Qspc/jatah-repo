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
import { useRouter } from "next/navigation";
import LandingDialog from "./form.dialog";

export default function CardLandingPage() {
    const { data, isSuccess } = useQuery({
        queryKey: ["kelompok"],
        queryFn: async () => {
            const data = getAllKelompok();
            return data;
        },
    });
    const router = useRouter();

    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            {isSuccess && data && data.length > 0 && (
                <>
                    {data.map((res: any, index: any) => (
                        <Card
                            key={index}
                            onClick={() => router.push(`/${res.id}/dashboard`)}
                            className="flex flex-row items-center justify-between cursor-pointer max-h-28 min-w-96"
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
            <LandingDialog />
        </div>
    );
}
