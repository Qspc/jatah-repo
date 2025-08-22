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
import { getAllKelompok } from "@/controller/kelompok.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import LandingDialog from "./form.dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "../ui/skeleton";

export default function CardLandingPage() {
    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ["kelompok"],
        queryFn: async () => {
            const data = getAllKelompok();
            return data;
        },
    });
    const router = useRouter();

    if (isError) return <>error</>;

    return (
        <div className="flex flex-wrap items-center justify-center gap-8">
            {isLoading ? (
                <Card className="flex flex-row items-center justify-between bg-white max-h-28 min-w-96">
                    <CardHeader className="flex flex-col gap-1.5 w-[80%]">
                        <Skeleton className="w-full h-4 rounded-full "></Skeleton>
                        <Skeleton className="w-3/4 h-4 rounded-full "></Skeleton>
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="w-16 h-8 rounded-full "></Skeleton>
                    </CardContent>
                </Card>
            ) : (
                <>
                    {data?.map((res: any, index: any) => (
                        <Card
                            key={index}
                            className="flex flex-row items-center justify-between bg-white max-h-28 min-w-96"
                        >
                            <CardHeader className="flex flex-col gap-1.5 w-[80%]">
                                <CardTitle className="text-[18px] capitalize overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                                    {res.nama}
                                </CardTitle>
                                <CardDescription className="text-[14px] font-medium">
                                    <Badge>{res.total_santri} Santri</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <button
                                    onClick={() =>
                                        router.push(
                                            `/landing/${res.id}/dashboard`
                                        )
                                    }
                                    className="px-4 py-2 text-sm button-primary"
                                >
                                    Masuk
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
            <LandingDialog
                buttonTrigger={
                    <Card className="flex flex-row items-center justify-center transition-colors border-2 border-gray-300 border-dashed cursor-pointer group min-w-96 max-h-28">
                        <CardHeader className="flex flex-col gap-1.5 w-full items-center justify-center">
                            <div
                                className="flex cursor-pointer flex-col items-center justify-center w-full group-hover:bg-white group-hover:text-palette-500 text-white bg-palette rounded-[12px] p-1 transition-colors"
                                aria-label="Add new content"
                            >
                                <span className="mb-1 text-3xl">＋</span>
                                <span className="text-[16px] font-medium">
                                    Tambah Baru
                                </span>
                            </div>
                        </CardHeader>
                    </Card>
                }
            />
        </div>
    );
}
