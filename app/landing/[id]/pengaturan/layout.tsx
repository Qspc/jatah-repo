import { PengaturanProvider } from "@/components/pengaturan/use.context";
import { ReactNode } from "react";

export default function PengaturanLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <PengaturanProvider>{children}</PengaturanProvider>;
}
