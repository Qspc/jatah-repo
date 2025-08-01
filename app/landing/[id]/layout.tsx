import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full min-h-screen gap-4 p-4 overflow-scroll bg-palette-300">
                <div className="flex items-center h-16 gap-5">
                    <SidebarTrigger />
                </div>
                <div className="flex flex-col w-full gap-4 p-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
