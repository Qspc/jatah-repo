import supabase from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const result = await supabase
            .from("user")
            .insert([{ username: body.username, password: hashedPassword }]);

        // if (error) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             message: error.message,
        //             status: 500,
        //         }),
        //         { status: 500, headers: { "Content-Type": "application/json" } }
        //     );
        // }

        return NextResponse.json(
            { message: "Register Berhasil" },
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
