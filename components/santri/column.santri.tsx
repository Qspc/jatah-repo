import { ColumnDef } from "@tanstack/react-table";
import { capitalizeFirstWord } from "../convert/typing";
import { formatToThreeDigit } from "../convert/num";
import { DataSantriProps } from "@/types/santri";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DialogConfirmation } from "../ui/dialog-confirmation";
import { processJatah } from "@/controller/jatah.service";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { dateFormatTable } from "../convert/date";
import TambahSaldoDialog from "./form.dialog.saldo";

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
                    {res
                        ? dateFormatTable(row.original.tanggal_jatah_habis)
                        : "-"}{" "}
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
                        ? dateFormatTable(row.original.tanggal_menabung)
                        : "-"}{" "}
                </div>
            );
        },
    },
    {
        accessorKey: "id",
        header: "Aksi",
        cell: ({ row }) => {
            const [open, setOpen] = useState(false);
            const [openConfirmation, setOpenConfirmation] = useState(false);
            const [loading, setLoading] = useState(false);
            const queryClient = useQueryClient();

            const handleAction = async () => {
                setLoading(true);
                try {
                    await processJatah({ user_id: Number(row.original.id) });
                    toast.success("Jatah berhasil dibagikan");
                    setOpen(false);
                    queryClient.invalidateQueries({
                        queryKey: ["santri"],
                        exact: false,
                    });
                } catch (error) {
                    toast.error("Gagal memproses data");
                }
                setLoading(false);
            };

            return (
                <div className="flex flex-col gap-2">
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger className="flex items-center justify-center w-full h-full gap-2 px-1 py-2 font-bold">
                            <FontAwesomeIcon
                                className="cursor-pointer"
                                height={16}
                                icon={faEllipsisVertical}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[167px] flex flex-col gap-1 *:cursor-pointer *:h-[25px] *:text-[12px] *:font-normal *:rounded *:w-full *:justify-center">
                            <TambahSaldoDialog
                                buttonTrigger={
                                    <div className="text-center cursor-pointer h-[25px] text-[12px] font-normal flex justify-center items-center w-full  rounded hover:bg-palette-100 focus:bg-palette-100">
                                        Tambah Tabungan
                                    </div>
                                }
                                oldData={row.original}
                            />
                            <DialogConfirmation
                                open={openConfirmation}
                                openChange={setOpenConfirmation}
                                actionTitle="Ya, Lanjutkan"
                                title={`Bagikan Jatah ${row.original.nama}`}
                                description={
                                    <>
                                        Apakah anda yakin ingin membagi jatah{" "}
                                        <span className="font-semibold">
                                            {row.original.nama}
                                        </span>
                                        ?
                                    </>
                                }
                                buttonTrigger={
                                    <div className="text-center cursor-pointer h-[25px] text-[12px] font-normal flex justify-center items-center w-full  rounded hover:bg-palette-100 focus:bg-palette-100">
                                        Bagikan Jatah
                                    </div>
                                }
                                handleAction={handleAction}
                            />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
