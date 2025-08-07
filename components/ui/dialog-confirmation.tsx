import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
interface props {
    buttonTrigger?: React.ReactNode;
    title?: string;
    description?: string | React.ReactNode;
    cancelTitle?: string | React.ReactNode;
    actionTitle?: string | React.ReactNode;
    handleAction: () => void;
    open?: boolean;
    openChange?: (open: boolean) => void;
}

export function DialogConfirmation({
    buttonTrigger,
    title,
    description,
    cancelTitle,
    actionTitle,
    handleAction,
    open = false,
    openChange,
}: props) {
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogTrigger>
                {buttonTrigger ? (
                    buttonTrigger
                ) : (
                    <div className="button-primary">Show Dialog</div>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="mb-2">
                    <DialogTitle className="mb-0">
                        {title ? title : "Are you absolutely sure?"}
                    </DialogTitle>
                    <DialogDescription>
                        {description
                            ? description
                            : "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className="button-delete">
                        {cancelTitle ? cancelTitle : "Batal"}
                    </DialogClose>
                    <button onClick={handleAction} className="button-primary">
                        {actionTitle ? actionTitle : "Lanjutkan"}{" "}
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
