import { ColumnDef } from "@tanstack/react-table";
import { capitalizeFirstWord } from "../convert/typing";
import { dateFormatTable, formatToThreeDigit } from "../convert/num";
import { DataSantriProps } from "@/types/santri";

export const columnSantri: ColumnDef<DataSantriProps>[] = [
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
        cell: ({ row }) => {
            const res = row.original.saldo >= row.original.jatah;
            return (
                <div className="text-center">
                    {res ? row.original.tanggal_jatah_habis : "-"}{" "}
                </div>
            );
        },
    },
    {
        accessorKey: "tanggal_menabung",
        header: "Terakhir Menabung",
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    {row.original.tanggal_menabung
                        ? row.original.tanggal_menabung
                        : "-"}{" "}
                </div>
            );
        },
    },
    {
        accessorKey: "id",
        header: "Aksi",
        cell: ({ row }) => {
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
