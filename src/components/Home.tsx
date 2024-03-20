import {useTranslation} from "react-i18next";
import {SearchProducts} from "./SearchProducts.tsx";

const Home = () => {
    const [t] = useTranslation("global")

    return (
        <div className="max-w-[1400px] mx-auto px-12">
            <div className="mt-4 bg-gray-100 rounded px-4 py-32">
                <h1 className="text-4xl text-center py-2">{t("home.title")}</h1>
                <p className="text-center">{t("home.description")}</p>
                <SearchProducts/>
            </div>
        </div>
    )
}

export default Home;