import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../layout/data.table";
import { columnSantri } from "./column.santri";
import { getAllSantri } from "@/controller/santri.service";
import { useAsrama } from "./use.context";
import SantriDialog from "./form.dialog";

export default function SantriBody({ santri }: any) {
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
                <input type="text" placeholder="search" />
                <div className="flex items-center gap-2">
                    <button>Bagi jatah</button>
                    <SantriDialog allSantri={santri} />
                </div>
            </div>
            {isSuccess && <DataTable data={allSantri} columns={columnSantri} />}
        </div>
    );
}
