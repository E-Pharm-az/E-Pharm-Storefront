import {useTranslation} from "react-i18next";
import {SearchProducts} from "../components/SearchProducts.tsx";

const Home = () => {
    const [t] = useTranslation("global");

    return (
        <div className="container rounded-lg bg-neutral-100">
            <div className="container max-w-4xl py-32 space-y-4">
                <div>
                    <h1 className="text-center text-4xl">
                        {t("home.title")}
                    </h1>
                    <p className="pb-4 text-center">
                        {t("home.description")}
                    </p>
                </div>
                <SearchProducts/>
            </div>
        </div>
    );
};

export default Home;
