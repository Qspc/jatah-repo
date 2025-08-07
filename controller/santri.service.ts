import { callApi } from "@/lib/api.service";
import { SantryProps } from "@/types/santri";

export const getAllSantri = async () => {
    const res = await callApi("GET", `/api/santri`);
    return res ? res : null;
};

export const createSantri = async (data: SantryProps) => {
    const res = await callApi("POST", `/api/santri`, data);
    return res ? res : null;
};

export const updateSantri = async (data: SantryProps) => {
    const res = await callApi("PUT", `/api/santri`, data);
    return res ? res : null;
};

export const deleteSantri = async (data: number) => {
    const res = await callApi("DELETE", `/api/santri`, { id: data });
    return res ? res : null;
};
