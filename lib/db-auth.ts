import { createClient } from "@supabase/supabase-js";

const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_API_KEY ?? ""
);

export default supabaseAuth;
