import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const Footer = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showAdvice, setShowAdvice] = useState(false);
    const [showContact, setShowContact] = useState(false);


    return (
        <footer className="bg-white py-8">
            <div className="container mb-10 grid grid-cols-1 gap-8 px-4 md:mb-20 md:grid-cols-4 md:gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between" onClick={() => setShowAbout(!showAbout)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showAbout ? 'cursor-pointer' : ''}`}>
                            About
                        </h2>
                        {showAbout ? (
                            <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        ) : (
                            <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showAbout ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">About Us</a></li>
                        <li><a href="#!" className="text-gray-600">License and details</a></li>
                        <li><a href="#!" className="text-gray-600">Our partners</a></li>
                        <li><a href="#!" className="text-gray-600">Our team and doctors</a></li>
                    </ul>
                    <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between" onClick={() => setShowHelp(!showHelp)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showHelp ? 'cursor-pointer' : ''}`}>
                            Help
                        </h2>
                        {showHelp ? (
                            <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        ) : (
                            <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showHelp ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">FAQ</a></li>
                        <li><a href="#!" className="text-gray-600">How to make an order</a></li>
                        <li><a href="#!" className="text-gray-600">Delivery rules</a></li>
                        <li><a href="#!" className="text-gray-600">Payment Methods</a></li>
                    </ul>
                    <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between" onClick={() => setShowAdvice(!showAdvice)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showAdvice ? 'cursor-pointer' : ''}`}>
                            Doctor's advice
                        </h2>
                        {showAdvice ? (
                            <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        ) : (
                            <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showAdvice ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">Articles about health</a></li>
                        <li><a href="#!" className="text-gray-600">Doctors' recommendations</a></li>
                        <li><a href="#!" className="text-gray-600">Healthy lifestyle</a></li>
                    </ul>
                    <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between" onClick={() => setShowContact(!showContact)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showContact ? 'cursor-pointer' : ''}`}>
                            Contacts
                        </h2>
                        {showContact ? (
                            <ChevronUp className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        ) : (
                            <ChevronDown className="block h-6 w-6 text-neutral-400 md:hidden"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showContact ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">Pharmacy addresses</a></li>
                        <li><a href="#!" className="text-gray-600">Feedback form</a></li>
                        <li><a href="#!" className="text-gray-600">Contact doctor</a></li>
                        <li><a href="#!" className="text-gray-600">Working hours</a></li>
                    </ul>
                    <div className="block rounded-full bg-neutral-200 h-0.5 md:hidden"></div>
                </div>
            </div>
            <div className="mb-10 rounded-lg bg-gray-100 px-6 py-10 md:mb-20 md:px-12">
                <div className="mx-auto max-w-2xl">
                    <h2 className="mb-4 font-semibold text-gray-800 text-md md:text-lg">
                        Be one of the first to register to receive a promo code in your inbox
                    </h2>
                    <form className="flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            placeholder="Enter Your E-mail Address"
                            autoComplete="off"
                            className="flex-grow rounded-lg border border-gray-400 bg-white px-4 py-3 placeholder-gray-500 focus:border-gray-600 focus:outline-none"
                        />
                        <button
                            className="py-3 px-6 bg-[#61a60e] text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:bg-green-600">
                            Sign Up
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Enter Email Address Your email address will be used to send you Health Newsletters and
                        emails about E-Pharm’s products, services, sales, and special offers. You can unsubscribe at
                        any time by clicking on the unsubscribe link in each email. For more information on our use
                        of your personal information and your rights, see our{" "}
                        <a href="#!" className="text-[#61a60e] underline">
                            Privacy Policy.
                        </a>
                    </p>
                </div>
            </div>
            <div
                className="container flex flex-col-reverse items-start justify-between gap-4 px-4 pb-20 sm:flex-row sm:items-center md:pb-0">
                <div className="text-sm font-medium text-gray-600">Copyright © E-Pharm 2024</div>
                <div className="flex flex-col gap-4 text-sm sm:flex-row">
                    <a href="#!" className="font-medium text-gray-600">Terms & Conditions</a>
                    <a href="#!" className="font-medium text-gray-600">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;