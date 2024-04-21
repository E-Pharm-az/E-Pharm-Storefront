import { createContext, ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import { Link } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery.ts";

export interface CartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem, quantity?: number) => void;
    updateCart: (item: CartItem, quantity: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getProductIdsFromCart: () => number[];
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    updateCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    getProductIdsFromCart: () => [],
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [t] = useTranslation("global");
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [addedItem, setAddedItem] = useState<CartItem>({
        id: 0,
        name: "",
        imageUrl: "",
        price: 0,
        quantity: 0,
    });
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cartItems");
        try {
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }, [cart]);

    const updateCart = (item: CartItem, quantity: number) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex((i) => i.id === item.id);

        if (itemIndex === -1) {
            updatedCart.push({ ...item, quantity });
        } else {
            updatedCart[itemIndex].quantity = quantity;
        }

        setCart(updatedCart);
        setAddedItem(item);
        setShowNotification(true);
    };

    const addToCart = (item: CartItem, quantity: number = 1) => {
        const cartItem = cart.find((i) => i.id === item.id);

        if (cartItem) {
            updateCart(item, cartItem.quantity + quantity);
        } else {
            updateCart(item, quantity);
        }
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const getProductIdsFromCart = (): number[] => {
        const productIds: number[] = [];
        cart.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                productIds.push(item.id);
            }
        });
        return productIds;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateCart,
                removeFromCart,
                clearCart,
                getProductIdsFromCart,
            }}
        >
            {isDesktop ? (
                <Sheet
                    open={showNotification}
                    onOpenChange={() => setShowNotification(!showNotification)}
                >
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                {t("cart-provider.item-added-to-cart")}
                            </SheetTitle>
                            <div className="grid grid-cols-3 pb-6">
                                <img
                                    className="p-2 w-24 h-24 col-span-1 border border-neutral-200 rounded"
                                    src={addedItem?.imageUrl}
                                    alt={addedItem?.name}
                                />
                                <div className="col-span-2">
                                    <p className="font-medium text-xl text-black">
                                        {addedItem?.name}
                                    </p>
                                    <p>
                                        {t("cart-provider.quanity")}:{" "}
                                        {addedItem?.quantity}
                                    </p>
                                    <p>
                                        {t("cart-provider.price")}:{" "}
                                        {(
                                            (addedItem?.price *
                                                addedItem.quantity) /
                                            100
                                        ).toFixed(2)}{" "}
                                        AZN
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Link
                                    to="/cart"
                                    onClick={() => setShowNotification(false)}
                                    className="w-full flex bg-[#61a60e] transition font-medium rounded-lg text-sm px-5 py-2.5 text-white"
                                >
                                    <p className="mx-auto">
                                        {t("cart-provider.proceed-to-checkout")}
                                    </p>
                                </Link>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="w-full border-2 border-neutral-700 bg-white transition font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black"
                                >
                                    {t("cart-provider.continue-shopping")}
                                </button>
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            ) : (
                <Drawer
                    open={showNotification}
                    onOpenChange={(open) => setShowNotification(open)}
                >
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>
                                {t("cart-provider.item-added-to-cart")}
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerFooter className="pt-2">
                            <img
                                className="p-2 w-full h-48 col-span-1 border border-neutral-200 rounded object-contain"
                                src={addedItem?.imageUrl}
                                alt={addedItem?.name}
                            />
                            <div className="mb-6">
                                <p className="font-medium text-xl text-black">
                                    {addedItem?.name}
                                </p>
                                <p>
                                    {t("cart-provider.quanity")}:{" "}
                                    {addedItem?.quantity}
                                </p>
                                <p>
                                    {t("cart-provider.price")}:{" "}
                                    {(
                                        (addedItem?.price *
                                            addedItem.quantity) /
                                        100
                                    ).toFixed(2)}{" "}
                                    AZN
                                </p>
                            </div>
                            <Link
                                to="/cart"
                                onClick={() => setShowNotification(false)}
                                className="w-full flex bg-[#61a60e] transition font-medium rounded-lg text-sm px-5 py-2.5 text-white"
                            >
                                <p className="mx-auto">
                                    {t("cart-provider.proceed-to-checkout")}
                                </p>
                            </Link>
                            <DrawerClose asChild>
                                <button
                                    onClick={() => setShowNotification(false)}
                                    className="w-full border-2 bg-white transition font-medium rounded-lg text-sm px-5 py-2.5 text-center text-black"
                                >
                                    {t("cart-provider.continue-shopping")}
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
