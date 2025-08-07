"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push("/landing")}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-100 ease-in-out hover:rounded-[12px] hover:bg-palette-100 "
        >
            <ArrowLeft /> Ke Halaman Utama
        </button>
    );
}
