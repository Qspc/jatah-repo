import { callApi } from "@/lib/api.service";

export const getAllKelompok = async () => {
    const res = await callApi("GET", `/api/kelompok`);
    return res ? res : null;
};

export const createKelompok = async (data: any) => {
    const res = await callApi("POST", `/api/kelompok`, data);
    return res ? res : null;
};

export const updateKelompok = async (data: any) => {
    const res = await callApi("PUT", `/api/kelompok`, data);
    return res ? res : null;
};

export const deleteKelompok = async (data: any) => {
    const res = await callApi("DELETE", `/api/kelompok`, data);
    return res ? res : null;
};
