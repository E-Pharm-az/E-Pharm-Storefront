import CartContext from "../context/CartProvider.tsx";
import {ChangeEvent, useContext, useState} from "react";
import {Pin, ShoppingCart, Trash} from "lucide-react";

const Cart = () => {
    const {cart, addToCart, removeFromCart} = useContext(CartContext);
    const [shippingAddress, setShippingAddress] = useState<string>("");
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleShippingAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShippingAddress(e.target.value);
    };

    return (
        <div className="container md:grid md:grid-cols-5 md:gap-8 space-y-4 md:space-y-0 py-8">
            <div className="col-span-3 border border-gray-200 rounded-md">
                <div className="flex items-center p-4 space-x-1">
                    <p>{cart.length}</p>
                    <p>{cart.length === 1 ? "Item" : "Items"} in your cart</p>
                </div>
                <div
                    className="p-4 flex flex-col sm:flex-row item-start sm:items-center border-t border-b border-gray-200 gap-2">
                    <div className="flex items-center gap-1">
                        <Pin className="w-5 h-5"/>
                        <p className="flex-shrink-0">Deliver to:</p>
                    </div>
                    <input
                        type="text"
                        name="address"
                        onChange={handleShippingAddressChange}
                        value={shippingAddress}
                        className="flex-grow p-2 border focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-200 rounded-md"
                        placeholder="Enter your address..."
                    />
                </div>

                {cart.length === 0 ? (
                    <div className="h-[230px] flex items-center justify-center">
                        <div>
                            <ShoppingCart className="mx-auto w-12 h-12 mb-2"/>
                            <p className={""}>Your cart is empty</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        {cart.map((item, index) => (
                            <div
                                key={item.id}
                                className={`flex rounded p-4 items-center justify-between ${
                                    index !== cart.length - 1
                                        ? "border-b border-gray-200"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://southstardrug.com.ph/cdn/shop/files/Midol.jpg?v=1706145522"
                                        alt={item.name}
                                        className="w-16 h-16"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {item.name}
                                        </p>
                                        <p>{(item.price / 100).toFixed(2)} AZN</p>
                                    </div>
                                </div>
                                <div className="">
                                    <Trash
                                        onClick={() => removeFromCart(item.id)}
                                        className="ml-auto mb-6 w-5 h-5 text-gray-600 cursor-pointer"
                                    />
                                    <select
                                        value={item.quantity}
                                        onChange={(e) =>
                                            addToCart(
                                                item,
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className="px-2 py-1 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-300 focus:outline-none"
                                    >
                                        {[...Array(20).keys()].map((num) => (
                                            <option
                                                key={num + 1}
                                                value={num + 1}
                                            >
                                                {num + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-span-2 border border-gray-200 rounded-md h-fit">
                <div className="p-4 flex items-center space-x-1 border-b border-gray-200">
                    <p>Cart total:</p>
                    <p>{(totalPrice / 100).toFixed(2)} AZN</p>
                </div>
                <div className="p-4">
                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-[#61a60e] focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-75 disabled:cursor-not-allowed transition font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
