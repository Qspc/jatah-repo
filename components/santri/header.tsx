import { useState } from "react";
import { formatToThreeDigit } from "../convert/num";
import Select from "react-select";

export default function SantriHeader({ santri }: any) {
    const [information, setInformation] = useState({
        jatah: santri[0]?.jumlah_jatah,
        santri: santri[0]?.jumlah_santri,
    });
    const selectValue = santri?.map((item: { id: string; nama: string }) => ({
        value: item.id,
        label: item.nama,
    }));

    const handleChange = (selectedOption: any) => {
        const pick = santri.find(
            (item: { id: string }) => item.id === selectedOption.value
        );
        if (pick) {
            setInformation({
                jatah: pick.jumlah_jatah,
                santri: pick.jumlah_santri,
            });
        }
    };

    return (
        <div className="flex items-center justify-between ">
            <div className="flex flex-col w-1/4 gap-2">
                <div>Pilih Asrama</div>
                <Select options={selectValue} onChange={handleChange} />
            </div>
            <div className="flex gap-4">
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Jatah</div>
                    <div className="text-4xl font-semibold">
                        {formatToThreeDigit(information?.jatah)}{" "}
                    </div>
                </div>
                <div className="p-7 flex flex-col gap-1.5 bg-white rounded-[10px] shadow-md">
                    <div className="font-light text-[20px]">Total Santri</div>
                    <div className="text-4xl font-semibold">
                        {information?.santri}
                    </div>
                </div>
            </div>
        </div>
    );
}
