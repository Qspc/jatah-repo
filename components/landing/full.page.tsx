import CardLandingPage from "./card";
import TitleLandingPage from "./title.page";

export default function LandingPage() {
    return (
        <div className="h-screen w-full ">
            <div className="md:pt-40 pt-10 px-20 flex flex-col gap-20 items-center">
                <TitleLandingPage />
                <CardLandingPage />
            </div>
        </div>
    );
}
