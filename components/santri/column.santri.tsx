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
    },
];
