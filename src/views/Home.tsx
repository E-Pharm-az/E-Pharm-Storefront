import {useTranslation} from "react-i18next";
import {SearchProducts} from "../components/SearchProducts.tsx";
import {Link} from "react-router-dom";

const Home = () => {
    const [t] = useTranslation("global");

    return (
        <div className="container mt-16 rounded-lg bg-neutral-100">
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
                <p className="text-center font-medium">
                    Or browse by condition
                </p>
                <div className="flex items-center overflow-x-scroll space-x-2 md:justify-center">
                    <Link to={"/"}
                          className="inline-block flex-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-1 text-sm font-medium text-nowrap md:py-2 md:text-base">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="inline-block flex-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-1 text-sm font-medium text-nowrap md:py-2 md:text-base">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="inline-block flex-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-1 text-sm font-medium text-nowrap md:py-2 md:text-base">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="inline-block flex-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-1 text-sm font-medium text-nowrap md:py-2 md:text-base">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="inline-block flex-nowrap rounded-xl border border-neutral-300 bg-white px-4 py-1 text-sm font-medium text-nowrap md:py-2 md:text-base">
                        Anxiety
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
