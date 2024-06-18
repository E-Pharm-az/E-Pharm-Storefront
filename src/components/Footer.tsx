import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [t] = useTranslation("global");

  return (
    <footer className="bg-white py-8">
      <div className="container mb-10 grid grid-cols-1 gap-8 px-4 md:mb-20 md:grid-cols-4 md:gap-4">
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
              <a href="#!" className="text-gray-600">
                {t("footer.About Us")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.License and details")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Our partners")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
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
              <a href="#!" className="text-gray-600">
                {t("footer.FAQ")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.How to make an order")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Delivery rules")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
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
              <a href="#!" className="text-gray-600">
                {t("footer.Articles about health")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Doctors' recommendations")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
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
              <a href="#!" className="text-gray-600">
                {t("footer.Pharmacy addresses")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Feedback form")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Contact doctor")}
              </a>
            </li>
            <li>
              <a href="#!" className="text-gray-600">
                {t("footer.Working hours")}
              </a>
            </li>
          </ul>
          <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
        </div>
      </div>
      <div className="mb-10 rounded-lg bg-gray-100 px-6 py-10 md:mb-20 md:px-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 font-semibold text-gray-800 text-md md:text-lg">
            {t("footer.form-title")}
          </h2>
          <form className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder={t("footer.form-input-placeholder")}
              autoComplete="off"
              className="flex-grow rounded-lg border border-gray-400 bg-white px-4 py-3 placeholder-gray-500 focus:border-gray-600 focus:outline-none"
            />
            <button className="py-3 px-6 bg-accent text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:bg-green-600">
              {t("footer.form-button-text")}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            {t("footer.form-subtitle")}{" "}
            <a href="#!" className="text-accent underline">
              {t("footer.form-privacy-policy-link")}.
            </a>
          </p>
        </div>
      </div>
      <div className="container flex flex-col-reverse items-start justify-between gap-4 px-4 pb-20 sm:flex-row sm:items-center md:pb-0">
        <div className="text-sm font-medium text-gray-600">
          Copyright © E-Pharm 2024
        </div>
        <div className="flex flex-col gap-4 text-sm sm:flex-row">
          <a href="#!" className="font-medium text-gray-600">
            {t("footer.Terms & Conditions")}
          </a>
          <a href="#!" className="font-medium text-gray-600">
            {t("footer.Privacy Policy")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
