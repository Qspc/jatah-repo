import {
    Activity,
    BadgeDollarSign,
    BookCopy,
    BookUser,
    Calendar,
    Home,
    Landmark,
    User,
    Search,
    Settings,
} from "lucide-react";

export const sidebarMenu = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        active: "dashboard",
    },
    {
        title: "Data Santri",
        url: "/santri",
        icon: User,
        active: "santri",
    },
    {
        title: "Pengaturan",
        url: "/pengaturan",
        icon: Settings,
        active: "pengaturan",
    },
];
