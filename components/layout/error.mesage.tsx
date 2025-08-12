import { cn } from "@/lib/utils";

interface props {
    error: string | undefined;
    className?: string;
}
export default function ErrorMessage({ error, className }: props) {
    return (
        <div
            className={cn(
                "text-sm font-light text-red-500 capitalize",
                className
            )}
        >
            {error}
        </div>
    );
}
