import {BsBag, BsPin} from "react-icons/bs";
import {useState} from "react";

const Cart = () => {

    const [cartItems, setCartItems] = useState([])

    return (
        <div className="md:grid md:grid-cols-5 md:gap-8 space-y-4 md:space-y-0">
            <div className="col-span-3 border border-gray-200 rounded-md">
                <p className="p-4">0 Items in your cart</p>
                <div className="p-4 flex items-center border-t border-b border-gray-200 space-x-2">
                    <BsPin className="w-5 h-5"/>
                    <p className="flex-shrink-0">Deliver to:</p>
                    <input type="text" name="address"
                           className="flex-grow p-2 border focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-200 rounded-md"
                           placeholder="Enter your address..."/>
                </div>

                {cartItems.length === 0 ? (
                    <div className="h-[230px] flex items-center justify-center">
                        <div>
                            <BsBag className="mx-auto w-12 h-12 mb-2"/>
                            <p className={""}>Your cart is empty</p>
                        </div>
                    </div>
                ) : (
                    <div className="p-4">
                        <p>Your cart is not empty</p>
                    </div>
                )}
            </div>

            <div className="col-span-2 border border-gray-200 rounded-md h-fit">
                <div className="p-4 flex items-center space-x-1 border-b border-gray-200">
                    <p>Cart total:</p>
                    <p>00.00</p>
                </div>
                <div className="p-4">
                    <button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
