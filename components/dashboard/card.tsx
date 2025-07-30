import { formatToThreeDigit } from "../convert/num";

export default function DashboardCard({ data, kategori }: any) {
    return (
        <div className="flex gap-4">
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total Jatah</div>
                <div className="text-4xl font-semibold">
                    {data?.total_jatah_santri
                        ? formatToThreeDigit(data?.total_jatah_santri, true)
                        : "-"}{" "}
                </div>
            </div>
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total Santri</div>
                <div className="text-4xl font-semibold">
                    {data?.total_santri ? data?.total_santri : "-"}
                </div>
            </div>
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total {kategori}</div>
                <div className="text-4xl font-semibold">
                    {data?.jumlah_asrama ? data?.jumlah_asrama : "-"}
                </div>
            </div>
        </div>
    );
}
