"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ChevronRight, LogOut } from "lucide-react";
import { sidebarMenu } from "./sidebar.data";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getKelompokById } from "@/controller/kelompok.service";
import { signOut } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar() {
    const path = usePathname();
    const params = useParams();
    const segments = path.split("/").filter(Boolean);
    const lastPath = segments[segments.length - 1];
    const router = useRouter();

    const { data: kelompok, isLoading } = useQuery({
        queryKey: ["kelompok", params?.id],
        queryFn: async () => {
            const res = await getKelompokById(Number(params.id));
            return res;
        },
    });

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
                                    router.push(
                                        `/landing/${params.id}/${data.url}`
                                    );
                                }}
                                className={`flex items-center ${
                                    data.active === lastPath
                                        ? "bg-palette-100"
                                        : "bg-transparent"
                                } rounded-[10px] gap-3 px-3 py-4 hover:bg-palette-100 hover:text-palette text-palette-500`}
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
                {isLoading ? (
                    <Skeleton className="w-2/3 h-8 rounded-full "></Skeleton>
                ) : (
                    <div className="text-2xl font-semibold capitalize">
                        {kelompok?.nama}
                    </div>
                )}
                <SidebarMenuButton asChild>
                    <Button
                        variant="outline"
                        className="justify-between w-full border-red-600"
                        onClick={() => {
                            signOut();
                            router.push("/");
                        }}
                    >
                        <p>Logout</p>
                        <LogOut className="w-4 h-4" />
                    </Button>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
