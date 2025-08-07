import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

interface props {
    buttonTrigger: string | React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
    contentTrigger: React.ReactNode;
    title: string | React.ReactNode;
    className?: string;
}
export default function DialogForm({
    buttonTrigger,
    open,
    setOpen,
    contentTrigger,
    title,
    className,
}: props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{buttonTrigger}</DialogTrigger>
            <DialogContent className={cn("max-w-[1200px]", className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {contentTrigger}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
