import CoverPage from "@/components/login/cover";
interface Props {
    code: string;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    return (
        <CoverPage>
            <div className="flex flex-col items-center gap-4">
                <h1 className="font-bold text-white text-9xl">{code}</h1>
                <div className="flex flex-col items-center gap-1 font-light text-white">
                    <div className="cursor-pointer ">{message}</div>
                </div>
            </div>
        </CoverPage>
    );
}
