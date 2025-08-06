import { callApi } from "@/lib/api.service";
import { KelompokProps } from "@/types/kelompok";

export const getAllKelompok = async () => {
    const res = await callApi("GET", `/api/kelompok`);
    return res ? res : null;
};

export const getKelompokById = async (id: number) => {
    const res = await callApi("GET", `/api/kelompok?id=${id}`);
    return res ? res : null;
};

export const createKelompok = async (data: KelompokProps) => {
    const res = await callApi("POST", `/api/kelompok`, data);
    return res ? res : null;
};

export const updateKelompok = async (data: KelompokProps) => {
    const res = await callApi("PUT", `/api/kelompok`, data);
    return res ? res : null;
};

export const deleteKelompok = async (data: number) => {
    const res = await callApi("DELETE", `/api/kelompok`, { id: data });
    return res ? res : null;
};
