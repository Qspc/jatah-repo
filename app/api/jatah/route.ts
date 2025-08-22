import { createServerSupabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const supabase = await createServerSupabase();

        const { error } = await supabase.rpc("bagi_jatah", body);

        if (error) {
            return new NextResponse(
                JSON.stringify({
                    message: error.message,
                    status: 500,
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        return NextResponse.json(
            { message: "Data inserted successfully" },
            {
                status: 201,
            }
        );
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                message:
                    error.response?.data?.error?.messages[0] ||
                    error.messages ||
                    "something wrong",
                status: error.status,
                code: error.code,
            }),
            {
                status: error.status,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
