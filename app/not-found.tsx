"use client";
import CoverPage from "@/components/login/cover";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    return (
        <CoverPage>
            <div className="flex flex-col items-center gap-4">
                <h1 className="font-bold text-white text-9xl">404</h1>
                <div className="flex flex-col items-center gap-1 font-light text-white">
                    <p>Halaman tidak ditemukan</p>
                    <div
                        onClick={() => router.push("/")}
                        className="underline cursor-pointer "
                    >
                        Kembali ke login
                    </div>
                </div>
            </div>
        </CoverPage>
    );
}
