import { callApi } from "@/lib/api.service";
import { AsramaProps } from "@/types/arama";

export const getAllAsrama = async (id: number) => {
    const res = await callApi("GET", `/api/asrama?id=${id}`);
    return res ? res : null;
};

export const createAsrama = async (data: AsramaProps) => {
    const res = await callApi("POST", `/api/asrama`, data);
    return res ? res : null;
};

export const updateAsrama = async (data: AsramaProps) => {
    const res = await callApi("PUT", `/api/asrama`, data);
    return res ? res : null;
};

export const deleteAsrama = async (id: number) => {
    const res = await callApi("DELETE", `/api/asrama`, { id: id });
    return res ? res : null;
};
