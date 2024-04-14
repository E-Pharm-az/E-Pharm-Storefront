import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const Footer = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showAdvice, setShowAdvice] = useState(false);
    const [showContact, setShowContact] = useState(false);


    return (
        <footer className="bg-white py-8">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 mb-10 md:mb-20 px-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center" onClick={() => setShowAbout(!showAbout)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showAbout ? 'cursor-pointer' : ''}`}>
                            About
                        </h2>
                        {showAbout ? (
                            <ChevronUp className="block md:hidden h-6 w-6 text-neutral-400"/>
                        ) : (
                            <ChevronDown className="block md:hidden h-6 w-6 text-neutral-400"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showAbout ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">About Us</a></li>
                        <li><a href="#!" className="text-gray-600">License and details</a></li>
                        <li><a href="#!" className="text-gray-600">Our partners</a></li>
                        <li><a href="#!" className="text-gray-600">Our team and doctors</a></li>
                    </ul>
                    <div className="block md:hidden bg-neutral-200 h-0.5 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center" onClick={() => setShowHelp(!showHelp)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showHelp ? 'cursor-pointer' : ''}`}>
                            Help
                        </h2>
                        {showHelp ? (
                            <ChevronUp className="block md:hidden h-6 w-6 text-neutral-400"/>
                        ) : (
                            <ChevronDown className="block md:hidden h-6 w-6 text-neutral-400"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showHelp ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">FAQ</a></li>
                        <li><a href="#!" className="text-gray-600">How to make an order</a></li>
                        <li><a href="#!" className="text-gray-600">Delivery rules</a></li>
                        <li><a href="#!" className="text-gray-600">Payment Methods</a></li>
                    </ul>
                    <div className="block md:hidden bg-neutral-200 h-0.5 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center" onClick={() => setShowAdvice(!showAdvice)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showAdvice ? 'cursor-pointer' : ''}`}>
                            Doctor's advice
                        </h2>
                        {showAdvice ? (
                            <ChevronUp className="block md:hidden h-6 w-6 text-neutral-400"/>
                        ) : (
                            <ChevronDown className="block md:hidden h-6 w-6 text-neutral-400"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showAdvice ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">Articles about health</a></li>
                        <li><a href="#!" className="text-gray-600">Doctors' recommendations</a></li>
                        <li><a href="#!" className="text-gray-600">Healthy lifestyle</a></li>
                    </ul>
                    <div className="block md:hidden bg-neutral-200 h-0.5 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center" onClick={() => setShowContact(!showContact)}>
                        <h2 className={`text-md md:text-lg font-semibold text-gray-800 mb-2 ${showContact ? 'cursor-pointer' : ''}`}>
                            Contacts
                        </h2>
                        {showContact ? (
                            <ChevronUp className="block md:hidden h-6 w-6 text-neutral-400"/>
                        ) : (
                            <ChevronDown className="block md:hidden h-6 w-6 text-neutral-400"/>
                        )}
                    </div>
                    <ul className={`grid grid-cols-1 gap-2 ${!showContact ? 'hidden' : ''} md:block`}>
                        <li><a href="#!" className="text-gray-600">Pharmacy addresses</a></li>
                        <li><a href="#!" className="text-gray-600">Feedback form</a></li>
                        <li><a href="#!" className="text-gray-600">Contact doctor</a></li>
                        <li><a href="#!" className="text-gray-600">Working hours</a></li>
                    </ul>
                    <div className="block md:hidden bg-neutral-200 h-0.5 rounded-full"></div>
                </div>
            </div>
            <div className="bg-gray-100 py-10 px-6 md:px-12 mb-10 md:mb-20 rounded-lg">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-md md:text-lg font-semibold text-gray-800 mb-4">
                        Be one of the first to register to receive a promo code in your inbox
                    </h2>
                    <form className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter Your E-mail Address"
                            autoComplete="off"
                            className="flex-grow py-3 px-4 bg-white border border-gray-400 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-600"
                        />
                        <button
                            className="py-3 px-6 bg-[#61a60e] text-white font-medium rounded-lg transition duration-300 focus:outline-none focus:bg-green-600">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4">
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
                className="container flex flex-col-reverse items-start justify-between sm:flex-row sm:items-center gap-4 px-4 md:pb-0 pb-20">
                <div className="text-gray-600 text-sm font-medium">Copyright © E-Pharm 2024</div>
                <div className="flex gap-4 text-sm flex-col sm:flex-row">
                    <a href="#!" className="text-gray-600 font-medium">Terms & Conditions</a>
                    <a href="#!" className="text-gray-600 font-medium">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;