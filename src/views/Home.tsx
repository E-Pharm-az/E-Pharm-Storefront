import {useTranslation} from "react-i18next";
import {SearchProducts} from "../components/SearchProducts.tsx";
import {Link} from "react-router-dom";

const Home = () => {
    const [t] = useTranslation("global");

    return (
        <div className="container bg-neutral-100 rounded-lg ">
            <div className="container py-32 space-y-4 max-w-4xl">
                <div>
                    <h1 className="text-4xl text-center">
                        {t("home.title")}
                    </h1>
                    <p className="text-center pb-4">
                        {t("home.description")}
                    </p>
                </div>
                <SearchProducts/>
                <p className="text-center font-medium">
                    Or browse by condition
                </p>
                <div className="flex space-x-2 items-center justify-center overflow-x-scroll">
                    <Link to={"/"}
                          className="border border-neutral-300 bg-white text-sm md:text-base text-nowrap py-1 px-4 md:py-2 rounded-xl font-medium flex-nowrap inline-block">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="border border-neutral-300 bg-white text-sm md:text-base text-nowrap py-1 px-4 md:py-2 rounded-xl font-medium flex-nowrap inline-block">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="border border-neutral-300 bg-white text-sm md:text-base text-nowrap py-1 px-4 md:py-2 rounded-xl font-medium flex-nowrap inline-block">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="border border-neutral-300 bg-white text-sm md:text-base text-nowrap py-1 px-4 md:py-2 rounded-xl font-medium flex-nowrap inline-block">
                        Anxiety
                    </Link>
                    <Link to={"/"}
                          className="border border-neutral-300 bg-white text-sm md:text-base text-nowrap py-1 px-4 md:py-2 rounded-xl font-medium flex-nowrap inline-block">
                        Anxiety
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
