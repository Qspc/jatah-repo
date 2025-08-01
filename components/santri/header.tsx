"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { formatToThreeDigit } from "../convert/num";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useAsrama } from "./use.context";
import { informationProps } from "./full.page";
import { Skeleton } from "../ui/skeleton";

interface props {
    santri: any;
    information: informationProps;
    setInformation: Dispatch<SetStateAction<informationProps>>;
    isLoading: boolean;
}

export default function SantriHeader({
    santri,
    information,
    setInformation,
    isLoading,
}: props) {
    const { setAsramaId } = useAsrama();
    const selectValue =
        santri?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const handleChange = (selectedOption: any) => {
        const pick = santri.find(
            (item: { id: string }) => item.id === selectedOption.value
        );

        if (pick) {
            setAsramaId(pick?.id);
            setInformation({
                jatah: pick.jumlah_jatah,
                santri: pick.jumlah_santri,
                nama: pick.nama,
            });
        }
    };

    return (
        <div className="flex items-center justify-between ">
            <div className="flex flex-col w-1/4 gap-2">
                <div>Pilih Asrama</div>
                {isLoading ? (
                    <Skeleton className="w-full h-10 rounded-full "></Skeleton>
                ) : (
                    <Select
                        defaultValue={selectValue[0]}
                        options={selectValue}
                        onChange={handleChange}
                    />
                )}
            </div>
            <div className="flex flex-row-reverse w-2/5 *:w-1/2  gap-4">
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Jatah</div>
                    {isLoading ? (
                        <Skeleton className="w-3/4 rounded-full h-9 " />
                    ) : (
                        <div className="text-4xl font-semibold">
                            {information?.jatah
                                ? formatToThreeDigit(information?.jatah)
                                : "-"}{" "}
                        </div>
                    )}
                </div>
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Santri</div>
                    {isLoading ? (
                        <Skeleton className="w-1/4 rounded-full h-9 " />
                    ) : (
                        <div className="text-4xl font-semibold">
                            {information?.santri ? information?.santri : "-"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
