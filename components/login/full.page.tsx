import CoverPage from "./cover";
import LoginPage from "./form.login";

export default function HomePage() {
    return (
        <CoverPage>
            <div className="pb-10 text-4xl font-bold text-white uppercase">
                {" "}
                Jatah adalah
            </div>
            <LoginPage />
        </CoverPage>
    );
}
