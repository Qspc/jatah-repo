import { AsramaProvider } from "@/components/santri/use.context";
import { ReactNode } from "react";

export default function SantryLayout({ children }: { children: ReactNode }) {
    return <AsramaProvider>{children}</AsramaProvider>;
}
