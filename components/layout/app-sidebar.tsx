"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import { ChevronRight, LogOut } from "lucide-react";
import { sidebarMenu } from "./sidebar.data";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
const items = sidebarMenu;

export function AppSidebar() {
    const path = usePathname();
    const params = useParams();
    const segments = path.split("/").filter(Boolean);
    const firstPath = segments[0] ?? "Dashboard";
    const lastPath = segments[segments.length - 1];
    const router = useRouter();

    return (
        <Sidebar variant="sidebar">
            <SidebarContent className="p-1">
                <SidebarGroup className="px-2">
                    <SidebarGroupLabel className="px-6 pt-10 pb-6 text-4xl font-bold text-black uppercase ">
                        Jatah
                    </SidebarGroupLabel>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-3">
                        {sidebarMenu?.map((data, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    router.push(`/${params.id}/${data.url}`);
                                }}
                                className="flex items-center rounded-[10px] gap-3 px-3 py-4 bg-transparent hover:bg-palette-100 hover:text-palette text-palette-500 "
                            >
                                <data.icon />
                                {data.title}
                            </button>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <hr className="w-[80%] mx-auto " />
            <SidebarFooter className="flex flex-col gap-3 p-5">
                <div className="text-2xl font-semibold capitalize">
                    PP Putra
                </div>
                <SidebarMenuButton asChild>
                    <Button
                        variant="outline"
                        className="justify-between w-full border-red-600"
                        // onClick={logout}
                    >
                        <p>Logout</p>
                        <LogOut className="w-4 h-4" />
                    </Button>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
