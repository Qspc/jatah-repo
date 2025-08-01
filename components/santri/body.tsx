import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../layout/data.table";
import { columnSantri } from "./column.santri";
import { getAllSantri } from "@/controller/santri.service";
import { useAsrama } from "./use.context";
import SantriDialog from "./form.dialog";
import { Search } from "lucide-react";

export default function SantriBody({ nama }: any) {
    const { asramaId } = useAsrama();
    const { data: allSantri, isSuccess } = useQuery({
        queryKey: ["santri", asramaId],
        queryFn: async () => {
            const data = await getAllSantri();
            if (!Array.isArray(data) || asramaId === undefined) return [];
            const res = data.filter((item: any) => item.asrama_id == asramaId);
            return res;
        },
    });

    return (
        <div className="flex flex-col gap-4">
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
                    <button className="button-primary">
                        Bagikan Jatah {nama}{" "}
                    </button>
                    {/* <SantriDialog allSantri={santri} /> */}
                </div>
            </div>
            {isSuccess && (
                <DataTable
                    cellClassname={[
                        "w-[25%]",
                        "w-[15%]",
                        "w-[15%]",
                        "w-[10%]",
                        "w-[20%]",
                        "text-center w-[15%]",
                    ]}
                    data={allSantri}
                    columns={columnSantri}
                />
            )}
        </div>
    );
}
