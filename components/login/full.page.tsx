import CoverPage from "./cover";
import LoginPage from "./form.login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { HandCoins } from "lucide-react";

export default function HomePage() {
    return (
        <CoverPage>
            <div className="z-50 pb-10 text-4xl font-bold text-white uppercase">
                {" "}
                <HandCoins width={125} height={125} />
            </div>
            <LoginPage />
        </CoverPage>
    );
}
