import {createContext, ReactNode, useEffect, useState} from "react";

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
    getProductIdsFromCart: () => []
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [addedItem, setAddedItem] = useState<CartItem | null>(null);
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cartItems");
        try {
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error parsing cart data from local storage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    const updateCart = (item: CartItem, quantity: number) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(i => i.id === item.id);

        if (itemIndex === -1) {
            updatedCart.push({ ...item, quantity });
        } else {
            updatedCart[itemIndex].quantity = quantity;
        }

        setCart(updatedCart);
        setAddedItem(item);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const addToCart = (item: CartItem, quantity: number = 1) => {
        const cartItem = cart.find(i => i.id === item.id);

        if (cartItem) {
            updateCart(item, cartItem.quantity + quantity);
        }
        else {
            updateCart(item, quantity);
        }
    };

    const removeFromCart = (id: number) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const getProductIdsFromCart = (): number[] => {
        const productIds: number[] = [];
        cart.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                productIds.push(item.id);
            }
        });
        return productIds;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, clearCart, getProductIdsFromCart }}>
            {showNotification && (
                <div className="fixed top-4 right-0 left-0 mx-auto max-w-80 border-neutral-600 border rounded flex items-center justify-between z-100 bg-white text-black text-center py-2 px-4">
                    <img className="w-12 h-12 items-center" src={addedItem?.imageUrl} alt={addedItem?.name}/>
                    <p className="font-medium">{addedItem?.name} added to cart</p>
                </div>
            )}
            {children}
        </CartContext.Provider>
    );
};


export default CartContext;