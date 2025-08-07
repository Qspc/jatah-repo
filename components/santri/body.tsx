import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../layout/data.table";
import { columnSantri } from "./column.santri";
import { getAllSantri } from "@/controller/santri.service";
import { useAsrama } from "./use.context";
import SantriDialog from "./form.dialog";
import { Search } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { LoadingButton, LoadingPage } from "../layout/loading";

interface props {
    nama?: string;
    isLoading: boolean;
}
export default function SantriBody({ nama, isLoading }: props) {
    const { asramaId } = useAsrama();
    const {
        data: allSantri,
        isLoading: s2,
        isSuccess,
    } = useQuery({
        queryKey: ["santri", asramaId],
        queryFn: async () => {
            const data = await getAllSantri();
            if (!Array.isArray(data) || asramaId === undefined) return [];
            const res = data.filter((item: any) => item.asrama_id == asramaId);
            return res;
        },
    });

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex items-center justify-between">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari..."
                        className="pl-10 bg-white main-input min-w-96 "
                    />
                    <Search className="absolute left-2 top-2 " />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        disabled={isLoading}
                        className="flex items-center gap-2 button-primary "
                    >
                        {isLoading && <LoadingButton />}
                        Bagikan Jatah {nama}
                    </button>
                    {/* <SantriDialog allSantri={santri} /> */}
                </div>
            </div>
            {s2 ? (
                <div className="flex items-center justify-center w-full h-40 mt-10 ">
                    <LoadingPage />
                </div>
            ) : (
                <>
                    {isSuccess && (
                        <DataTable
                            cellClassname={[
                                "w-[21%]",
                                "w-[15%]",
                                "w-[15%]",
                                "w-[10%]",
                                "w-[12%]",
                                "w-[12%]",
                                "text-center w-[15%]",
                            ]}
                            data={allSantri}
                            columns={columnSantri}
                        />
                    )}
                </>
            )}
        </div>
    );
}
