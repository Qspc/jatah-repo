"use client";
import { useState } from "react";
import { formatToThreeDigit } from "../convert/num";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useAsrama } from "./use.context";

interface props {
    santri: any;
    information: any;
    setInformation: any;
}

export default function SantriHeader({
    santri,
    information,
    setInformation,
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
                <Select
                    defaultValue={selectValue[0]}
                    options={selectValue}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-row-reverse w-2/5 *:w-1/2  gap-4">
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Jatah</div>
                    <div className="text-4xl font-semibold">
                        {information?.jatah
                            ? formatToThreeDigit(information?.jatah)
                            : "-"}{" "}
                    </div>
                </div>
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Santri</div>
                    <div className="text-4xl font-semibold">
                        {information?.santri ? information?.santri : "-"}
                    </div>
                </div>
            </div>
        </div>
    );
}
