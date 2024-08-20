import { FC } from "react";
import { useTranslation } from "react-i18next";
import {Phone, Clock, Truck, LucideIcon} from "lucide-react";

const AboutUs: FC = () => {
  const [t] = useTranslation("global");

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-brand mb-12">
          {t("aboutUs.title")}
        </h1>

        <div className="bg-white border rounded-md overflow-hidden">
          <div className="p-6 sm:p-10">
            <p className="text-lg text-gray-700 mb-6">
              {t("aboutUs.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <FeatureCard
                icon={Phone}
                title={t("aboutUs.features.access.title")}
                description={t("aboutUs.features.access.description")}
              />
              <FeatureCard
                icon={Clock}
                title={t("aboutUs.features.availability.title")}
                description={t("aboutUs.features.availability.description")}
              />
              <FeatureCard
                icon={Truck}
                title={t("aboutUs.features.delivery.title")}
                description={t("aboutUs.features.delivery.description")}
              />
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("aboutUs.howItWorks.title")}
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>{t("aboutUs.howItWorks.step1")}</li>
                <li>{t("aboutUs.howItWorks.step2")}</li>
                <li>{t("aboutUs.howItWorks.step3")}</li>
                <li>{t("aboutUs.howItWorks.step4")}</li>
                <li>{t("aboutUs.howItWorks.step5")}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
    <div className="mb-4">{<Icon className="w-12 h-12 text-brand-secondary"/>}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default AboutUs;
