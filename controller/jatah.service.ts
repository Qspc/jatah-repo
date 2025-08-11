import { callApi } from "@/lib/api.service";
import { jatahprops } from "@/types/jatah";

export const processJatah = async (data: jatahprops) => {
    let newData: any = {};
    if (data.user_id) newData.p_santri_id = data.user_id;
    if (data.kelompok_id) newData.p_kelompok_id = data.kelompok_id;
    if (data.asrama_id) newData.p_asrama_id = data.asrama_id;

    const res = await callApi("POST", `/api/jatah`, newData);
    return res ? res : null;
};
