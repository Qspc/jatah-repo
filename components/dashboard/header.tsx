import { LoadingButton } from "../layout/loading";
import DashboardDialog from "./form.dialog";
interface props {
    isLoading: boolean;
}

export default function DashboardHeader({ isLoading }: props) {
    return (
        <div className="flex items-center justify-between ">
            <div className="main-title">dashboard</div>
            <div className="flex items-center gap-2">
                <button
                    disabled={isLoading}
                    className="flex items-center gap-1 button-primary "
                >
                    {isLoading && <LoadingButton />}
                    Bagikan semua Jatah
                </button>
                {/* <DashboardDialog
                    trigger={
                        <div className="button-primary">Tambah Asrama</div>
                    }
                /> */}
            </div>
        </div>
    );
}
