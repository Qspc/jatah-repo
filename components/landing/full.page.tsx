import CoverPage from "../login/cover";
import CardLandingPage from "./card";
import TitleLandingPage from "./title.page";

export default function LandingPage() {
    return (
        <CoverPage>
            <div className="z-50 w-full h-screen">
                <div className="flex flex-col items-center gap-20 px-20 pt-10 md:pt-40">
                    <TitleLandingPage />
                    <CardLandingPage />
                </div>
            </div>
        </CoverPage>
    );
}
