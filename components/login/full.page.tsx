import CoverPage from "./cover";
import LoginPage from "./form.login";

export default function HomePage() {
    return (
        <CoverPage>
            <div className="uppercase font-bold text-4xl text-white pb-10 ">
                {" "}
                Jatah
            </div>
            <LoginPage />
        </CoverPage>
    );
}
