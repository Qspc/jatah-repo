import supabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (id) {
            const { data, error } = await supabase
                .from("kelompok")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                return new NextResponse(
                    JSON.stringify({
                        message: error.message,
                        status: 500,
                    }),
                    {
                        status: 500,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            }

            return NextResponse.json(data);
        }

        const { data, error } = await supabase.from("kelompok").select("*");
        if (error) {
            return new NextResponse(
                JSON.stringify({
                    message: error.message,
                    status: 500,
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        return NextResponse.json(data);
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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { error } = await supabase
            .from("kelompok")
            .insert([body])
            .select();

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

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { error } = await supabase
            .from("kelompok")
            .update(body)
            .eq("id", body.id);

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
                status: 200,
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

export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const response = await supabase
            .from("kelompok")
            .delete()
            .eq("id", body.id);

        // if (error) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             message: error.message,
        //             status: 500,
        //         }),
        //         { status: 500, headers: { "Content-Type": "application/json" } }
        //     );
        // }

        return NextResponse.json(response);
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
