import { TypesGlobal } from "./global";

export interface SantryProps {
    id?: number;
    nama: string;
    alamat: string;
    deskripsi: string;
    jatah: number;
    saldo: number;
    tanggal_menabung?: string | null;
    asrama_id: number;
}

export interface DataSantriProps extends TypesGlobal {
    id: number;
    nama: string;
    alamat: string;
    deskripsi: string;
    jatah: number;
    saldo: number;
    tanggal_menabung: string;
    asrama_id: number;
    tanggal_jatah_habis: string;
}
