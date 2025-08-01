import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ArrowLeft } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full min-h-screen gap-4 p-4 overflow-scroll bg-palette-300">
                <div className="flex items-center justify-between h-16 gap-5">
                    <SidebarTrigger />
                    <button className="flex items-center gap-2 px-4 py-2 transition-all duration-100 ease-in-out hover:rounded-[12px] hover:bg-palette-100 ">
                        <ArrowLeft /> Ke Halaman Utama
                    </button>
                </div>
                <div className="flex flex-col w-full gap-4 p-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
