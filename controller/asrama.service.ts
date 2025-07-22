import { callApi } from "@/lib/api.service";

export const getAllAsrama = async () => {
    const res = await callApi("GET", `/api/asrama`);
    return res ? res : null;
};

export const createAsrama = async (data: any) => {
    const res = await callApi("POST", `/api/asrama`, data);
    return res ? res : null;
};

export const updateAsrama = async (data: any) => {
    const res = await callApi("PUT", `/api/asrama`, data);
    return res ? res : null;
};

export const deleteAsrama = async (data: any) => {
    const res = await callApi("DELETE", `/api/asrama`, data);
    return res ? res : null;
};
