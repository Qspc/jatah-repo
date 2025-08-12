import { formatToThreeDigit } from "../convert/num";
import { Skeleton } from "../ui/skeleton";

interface props {
    data: any;
    kategori: string;
    isLoading: boolean;
}

export default function DashboardCard({ data, kategori, isLoading }: props) {
    return (
        <div className="flex flex-wrap justify-center gap-4 md:justify-normal">
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total Jatah</div>
                {isLoading ? (
                    <Skeleton className="w-3/4 rounded-full h-9 " />
                ) : (
                    <div className="text-4xl font-semibold">
                        {data?.total_jatah_santri
                            ? formatToThreeDigit(data?.total_jatah_santri, true)
                            : "-"}{" "}
                    </div>
                )}
            </div>
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total Santri</div>
                {isLoading ? (
                    <Skeleton className="w-1/4 rounded-full h-9 " />
                ) : (
                    <div className="text-4xl font-semibold">
                        {data?.total_santri ? data?.total_santri : "-"}{" "}
                        {/* <span className="font-light text-[18px]">Santri</span> */}
                    </div>
                )}
            </div>
            <div className="p-7 w-[280px] flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                <div className="font-light text-[20px]">Total {kategori}</div>
                {isLoading ? (
                    <Skeleton className="w-1/4 rounded-full h-9 " />
                ) : (
                    <div className="text-4xl font-semibold">
                        {data?.jumlah_asrama ? data?.jumlah_asrama : "-"}
                        {/* <span className="font-light text-[18px]">{kategori}</span> */}
                    </div>
                )}
            </div>
        </div>
    );
}
