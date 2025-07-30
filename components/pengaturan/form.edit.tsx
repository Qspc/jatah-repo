import LandingDialog from "../landing/form.dialog";

export default function PengaturanEdit({ data }: any) {
    return (
        <div className="flex items-center justify-between w-1/2">
            <div>{data.nama} </div>
            <div className="flex items-center gap-2">
                <button className="button-primary">edit</button>
                <button className="button-delete">hapus</button>
            </div>
        </div>
    );
}
