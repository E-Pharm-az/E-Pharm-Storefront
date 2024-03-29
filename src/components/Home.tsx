import { useTranslation } from "react-i18next";

const Home = () => {
    const [t] = useTranslation("global");

    return (
        <>
            <div className="bg-gray-100">
                <div className="container py-32">
                    <h1 className="text-4xl text-center py-2">
                        {t("home.title")}
                    </h1>
                    <p className="text-center">{t("home.description")}</p>
                </div>
            </div>
        </>
    );
};

export default Home;
