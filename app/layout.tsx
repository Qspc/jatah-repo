import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryClientComponent from "@/lib/query";
import { Toaster } from "@/components/ui/sonner";

import { Poppins } from "next/font/google";
import { Noto_Sans_JP } from "next/font/google";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const notoJP = Noto_Sans_JP({
    subsets: ["latin"],
    variable: "--font-noto-jp",
    weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
    title: "Jatah",
    description: "Aplikasi Jatah untuk santri",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <QueryClientComponent>
                    {children}
                    <Toaster />
                </QueryClientComponent>
            </body>
        </html>
    );
}
