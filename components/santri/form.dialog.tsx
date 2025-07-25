import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createSantri, getAllSantri } from "@/controller/santri.service";
import { SantryProps } from "@/types/santri";
import { useForm } from "react-hook-form";
import Select, { OptionProps } from "react-select";
import { Controller } from "react-hook-form";

export default function SantriDialog({ allSantri }: any) {
    const { register, control, handleSubmit } = useForm<SantryProps>();
    const selectValue =
        allSantri?.map((item: { id: string; nama: string }) => ({
            value: item.id,
            label: item.nama,
        })) ?? [];

    const onSubmit = async (data: SantryProps) => {
        const newData = {
            ...data,
            saldo: +data.saldo,
            jatah: +data.jatah,
            asrama_id: +data?.asrama_id?.value,
        };
        // return console.log(JSON.stringify(newData));
        const res = await createSantri(newData);
        console.log({ res });
    };

    return (
        <Dialog>
            <DialogTrigger>Tambah Santri</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambahkan Santri</DialogTitle>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex gap-2 items-center *:w-1/3">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">Nama</label>
                                <input
                                    {...register("nama", { required: true })}
                                    type="text"
                                    placeholder="nama"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="alamat">Alamat</label>
                                <input
                                    {...register("alamat", { required: true })}
                                    type="text"
                                    placeholder="alamat"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="nama">Nama</label>
                                <Controller
                                    name="asrama_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={selectValue}
                                            defaultValue={selectValue[0]}
                                            onChange={(option: OptionProps) =>
                                                field.onChange(option)
                                            }
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center *:w-1/3">
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="deskripsi">Deskripsi</label>
                                <input
                                    {...register("deskripsi", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="deskripsi"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="jatah">Jatah per hari</label>
                                <input
                                    {...register("jatah", { required: true })}
                                    type="number"
                                    placeholder="10000"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                            <div className="flex flex-col gap-1 ">
                                <label htmlFor="saldo">Tabungan</label>
                                <input
                                    {...register("saldo", { required: true })}
                                    type="number"
                                    placeholder="500000"
                                    className="w-full px-1 py-2 pl-2 text-black bg-transparent border rounded border-palette"
                                />
                            </div>
                        </div>
                        <div>
                            <button>Tambah</button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
