import { createClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function createServerSupabase() {
    const session = await getServerSession(authOptions);
    console.log(session?.supabaseAccessToken);

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_API_KEY ?? "", // anon key
        {
            global: {
                headers: {
                    Authorization: `Bearer ${session?.supabaseAccessToken}`,
                },
            },
        }
    );
}
