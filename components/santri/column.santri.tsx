import { ColumnDef } from "@tanstack/react-table";
import { capitalizeFirstWord } from "../convert/typing";
import { dateFormatTable, formatToThreeDigit } from "../convert/num";

export const columnSantri: ColumnDef<any>[] = [
    {
        accessorKey: "nama",
        header: "Nama",
        cell: (info) => capitalizeFirstWord(info.getValue<string>()),
    },
    {
        accessorKey: "alamat",
        header: "Alamat",
        cell: (info) => capitalizeFirstWord(info.getValue<string>()),
    },
    {
        accessorKey: "deskripsi",
        header: "Keterangan",
    },
    {
        accessorKey: "jatah",
        header: "jatah",
        cell: (info) => formatToThreeDigit(info.getValue<number>(), true),
    },
    {
        accessorKey: "tanggal_jatah_habis",
        header: "Tanggal Jatah Habis",
    },
    {
        accessorKey: "id",
        header: "Aksi",
        cell: (info) => {
            return (
                <div className="flex flex-col gap-2">
                    <button className="button-primary hover:bg-palette-100/50 bg-palette-100 ">
                        Tambah Tabungan
                    </button>
                    <button className="button-primary">Bagikan jatah</button>
                </div>
            );
        },
    },
];
