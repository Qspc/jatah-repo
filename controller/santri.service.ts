import { callApi } from "@/lib/api.service";

export const getAllSantri = async () => {
    const res = await callApi("GET", `/api/santri`);
    return res ? res : null;
};

export const createSantri = async (data: any) => {
    const res = await callApi("POST", `/api/santri`, data);
    return res ? res : null;
};

export const updateSantri = async (data: any) => {
    const res = await callApi("PUT", `/api/santri`, data);
    return res ? res : null;
};

export const deleteSantri = async (data: any) => {
    const res = await callApi("DELETE", `/api/santri`, data);
    return res ? res : null;
};
