import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import {Separator} from "@/components/ui/separator.tsx";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [t] = useTranslation("global");

  return (
    <footer className="bg-white mx-auto my-24 grid gap-10">
      <Separator/>
      <div className="grid grid-cols-1 gap-8 mb-6 md:grid-cols-4 md:gap-4">
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between"
            onClick={() => setShowAbout(!showAbout)}
          >
            <h2
              className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${
                showAbout ? "cursor-pointer" : ""
              }`}
            >
              {t("footer.about")}
            </h2>
            {showAbout ? (
              <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden" />
            ) : (
              <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden" />
            )}
          </div>
          <ul
            className={`grid grid-cols-1 gap-2 ${
              !showAbout ? "hidden" : ""
            } md:block`}
          >
            <li>
              <a href="/about-us" className="text-gray-600">
                {t("footer.About Us")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.License and details")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Our partners")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Our team and doctors")}
              </a>
            </li>
          </ul>
          <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between"
            onClick={() => setShowHelp(!showHelp)}
          >
            <h2
              className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${
                showHelp ? "cursor-pointer" : ""
              }`}
            >
              {t("footer.help")}
            </h2>
            {showHelp ? (
              <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden" />
            ) : (
              <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden" />
            )}
          </div>
          <ul
            className={`grid grid-cols-1 gap-2 ${
              !showHelp ? "hidden" : ""
            } md:block`}
          >
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.FAQ")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.How to make an order")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Delivery rules")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Payment Methods")}
              </a>
            </li>
          </ul>
          <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between"
            onClick={() => setShowAdvice(!showAdvice)}
          >
            <h2
              className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${
                showAdvice ? "cursor-pointer" : ""
              }`}
            >
              {t("footer.doctors-advice")}
            </h2>
            {showAdvice ? (
              <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden" />
            ) : (
              <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden" />
            )}
          </div>
          <ul
            className={`grid grid-cols-1 gap-2 ${
              !showAdvice ? "hidden" : ""
            } md:block`}
          >
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Articles about health")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Doctors' recommendations")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Healthy lifestyle")}
              </a>
            </li>
          </ul>
          <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center justify-between"
            onClick={() => setShowContact(!showContact)}
          >
            <h2
              className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${
                showContact ? "cursor-pointer" : ""
              }`}
            >
              {t("footer.contacts")}
            </h2>
            {showContact ? (
              <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden" />
            ) : (
              <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden" />
            )}
          </div>
          <ul
            className={`grid grid-cols-1 gap-2 ${
              !showContact ? "hidden" : ""
            } md:block`}
          >
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Pharmacy addresses")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Feedback form")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Contact doctor")}
              </a>
            </li>
            <li>
              <a href="/coming-soon" className="text-gray-600">
                {t("footer.Working hours")}
              </a>
            </li>
          </ul>
          <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
        </div>
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-4 pb-20 sm:flex-row sm:items-center md:pb-0">
        <div className="text-sm font-medium text-gray-600">
          Copyright © E-Pharm 2024
        </div>
        <div className="flex flex-col gap-4 text-sm sm:flex-row">
          <a href="/coming-soon" className="font-medium text-gray-600">
            {t("footer.Terms & Conditions")}
          </a>
          <a href="/coming-soon" className="font-medium text-gray-600">
            {t("footer.Privacy Policy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
