import CartContext, {CartItem} from "../context/CartProvider.tsx";
import {ChangeEvent, useContext, useState} from "react";
import {Pin, ShoppingCart, Trash} from "lucide-react";
import { useTranslation } from "react-i18next";

const Cart = () => {
    const {cart, updateCart, removeFromCart} = useContext(CartContext);
    const [shippingAddress, setShippingAddress] = useState<string>("");
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const [t] = useTranslation("global");

    const handleShippingAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShippingAddress(e.target.value);
    };

    const handleCountChange = (item: CartItem, count: string) =>
        updateCart(item, parseInt(count));

    return (
        <div className="container py-8 space-y-4 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
            <div className="col-span-3 rounded-md border border-gray-200">
                <div className="flex items-center p-4 space-x-1">
                    <p>{cart.length}</p>
                    <p>{cart.length === 1 ? t("cart.item") : t("cart.items")} {t("cart.in-your-cart")}</p>
                </div>
                <div
                    className="flex flex-col gap-2 border-t border-b border-gray-200 p-4 item-start sm:flex-row sm:items-center">
                    <div className="flex items-center gap-1">
                        <Pin className="w-5 h-5"/>
                        <p className="flex-shrink-0">{t("cart.deliver")}:</p>
                    </div>
                    <input
                        type="text"
                        name="address"
                        onChange={handleShippingAddressChange}
                        value={shippingAddress}
                        className="flex-grow p-2 border focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-200 rounded-md"
                        placeholder={t("cart.deliver-address")}
                    />
                </div>

                {cart.length === 0 ? (
                    <div className="flex items-center justify-center h-[230px]">
                        <div>
                            <ShoppingCart className="mx-auto w-12 h-12 mb-2"/>
                            <p className={""}>{t("cart.empty-cart")}</p>
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
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="h-16 w-16"
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
                                        className="mb-6 ml-auto h-5 w-5 cursor-pointer text-gray-600"
                                    />
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleCountChange(item, e.target.value)}
                                        className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
                    <p>{t("cart.cart-total")}:</p>
                    <p>{(totalPrice / 100).toFixed(2)} AZN</p>
                </div>
                <div className="p-4">
                    <button
                        disabled={cart.length === 0}
                        className="w-full bg-[#61a60e] disabled:opacity-75 disabled:cursor-not-allowed transition font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                    >
                        {t("cart.cart-btn-text")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
