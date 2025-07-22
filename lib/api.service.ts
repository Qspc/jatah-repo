// lib/callApi.ts
export const callApi = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: any,
    token?: string
): Promise<any> => {
    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            ...(body && { body: JSON.stringify(body) }),
        });

        if (!res.ok) {
            const error = await res.text();
            throw new Error(`API error: ${res.status} - ${error}`);
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("[callApi error]", err);
        return null;
    }
};
