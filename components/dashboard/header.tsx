import DashboardDialog from "./form.dialog";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between ">
            <div className="main-title">dashboard</div>
            <div className="flex items-center gap-2">
                <button className="button-primary">Bagi Jatah</button>
                <DashboardDialog
                    trigger={
                        <div className="button-primary">Tambah Asrama</div>
                    }
                />
            </div>
        </div>
    );
}
