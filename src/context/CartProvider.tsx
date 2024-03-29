import {createContext, ReactNode, useEffect, useState} from "react";
import {BsCheck} from "react-icons/bs";

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
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    getProductIdsFromCart: () => number[];
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    clearCart: () => {
    },
    getProductIdsFromCart: () => [
    ]
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    return parsedCart;
                } else {
                    console.error("Invalid cart data in local storage.");
                }
            } catch (error) {
                console.error("Error parsing cart data from local storage:", error);
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    const getProductIdsFromCart = (): number[] => {
        const productIds: number[] = [];
        cart.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                productIds.push(item.id);
            }
        });
        return productIds;
    };

    const addToCart = (item: CartItem, quantity?: number) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(i => i.id === item.id);

        if (itemIndex === -1) {
            updatedCart.push({ ...item, quantity: 1 });
        } else {
            if (quantity) {
                updatedCart[itemIndex].quantity = quantity;
            }
            else {
                updatedCart[itemIndex].quantity++;
            }
        }

        setCart(updatedCart);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getProductIdsFromCart }}>
            {showNotification && (
                <div className="fixed top-4 right-0 w-60 border-green-600 border rounded flex items-center justify-center z-20 bg-green-500 text-white text-center py-2">
                    <BsCheck className="w-6 h-6 bg-green-600 rounded-full p-1 mr-2" />
                    <p className="text-white">Item added to cart</p>
                </div>
            )}
            {children}
        </CartContext.Provider>
    );
};


export default CartContext;