import { createServerSupabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const name = searchParams.get("search");
        const id = searchParams.get("id");
        const supabase = await createServerSupabase();

        const asrama = await supabase
            .from("asrama")
            .select("id")
            .eq("kelompok_id", id);

        if (!asrama || asrama.error) {
            return new NextResponse(
                JSON.stringify({
                    message: "Asrama tidak ditemukan",
                    status: 500,
                }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const { data, error } = await supabase
            .from("santri")
            .select("*")
            .in(
                "asrama_id",
                asrama.data.map((item) => item.id)
            )
            .ilike("nama", name ? `%${name}%` : "%");

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
        const supabase = await createServerSupabase();

        const { error } = await supabase.from("santri").insert([body]).select();

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

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const supabase = await createServerSupabase();

        const { error } = await supabase
            .from("santri")
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
        const supabase = await createServerSupabase();

        const response = await supabase
            .from("santri")
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
