import Logo from "../assets/e-pharm.png";

const Footer = () => {
    return (
        <footer className="bg-white py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-20 mb-10 md:mb-20">
                <a href="#!" className="flex flex-col items-center">
                    <img src={Logo} alt="E-Pharm Logo" className="w-44"/>
                </a>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
                    <ul className="grid grid-cols-1 gap-2">
                        <li><a href="#!" className="text-gray-600">About Us</a></li>
                        <li><a href="#!" className="text-gray-600">License and details</a></li>
                        <li><a href="#!" className="text-gray-600">Our partners</a></li>
                        <li><a href="#!" className="text-gray-600">Our team and doctors</a></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Help</h2>
                    <ul className="grid grid-cols-1 gap-2">
                        <li><a href="#!" className="text-gray-600">FAQ</a></li>
                        <li><a href="#!" className="text-gray-600">How to make an order</a></li>
                        <li><a href="#!" className="text-gray-600">Delivery rules</a></li>
                        <li><a href="#!" className="text-gray-600">Payment Methods</a></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Doctor's advice</h2>
                    <ul className="grid grid-cols-1 gap-2">
                        <li><a href="#!" className="text-gray-600">Articles about health</a></li>
                        <li><a href="#!" className="text-gray-600">Doctors' recommendations</a></li>
                        <li><a href="#!" className="text-gray-600">Healthy lifestyle</a></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Contacts</h2>
                    <ul className="grid grid-cols-1 gap-2">
                        <li><a href="#!" className="text-gray-600">Pharmacy addresses</a></li>
                        <li><a href="#!" className="text-gray-600">Feedback form</a></li>
                        <li><a href="#!" className="text-gray-600">Contact doctor</a></li>
                        <li><a href="#!" className="text-gray-600">Working hours</a></li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-100 py-10 px-6 md:px-12 mb-10 md:mb-20 rounded-lg">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Be one of the first to register to
                        receive a promocode in your inbox</h2>
                    <form className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter Your E-mail Address"
                            autoComplete="off"
                            className="flex-grow py-3 px-4 bg-white border border-gray-400 rounded-lg placeholder-gray-500 focus:outline-none focus:border-gray-600"
                        />
                        <button
                            className="py-3 px-6 bg-green-500 text-white font-semibold rounded-lg transition duration-300 hover:bg-green-600 focus:outline-none focus:bg-green-600">
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 mt-4">
                        Enter Email Address Your email address will be used to send you Health Newsletters and
                        emails about E-Pharm’s products, services, sales, and special offers. You can unsubscribe at
                        any time by clicking on the unsubscribe link in each email. For more information on our use
                        of your personal information and your rights, see our{" "}
                        <a href="#!" className="text-green-500 underline">
                            Privacy Policy.
                        </a>
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-gray-600 text-sm">Copyright © E-Pharm 2024</div>
                <div className="flex gap-6 text-sm">
                    <a href="#!" className="text-gray-600">Terms & Conditions</a>
                    <a href="#!" className="text-gray-600">Privacy Policy</a>
                </div>
            </div>
        </footer>

    );
};

export default Footer;