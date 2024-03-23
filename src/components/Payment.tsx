import {useContext, useEffect, useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.ts";
import CartContext from "../context/CartProvider.tsx";
import CheckoutForm from "./CheckoutForm.tsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe, Stripe} from "@stripe/stripe-js";

interface ConfigResponse {
    publishableKey: string;
}

const Payment = () => {
    const axiosPrivate = useAxiosPrivate();
    const {getProductIdsFromCart} = useContext(CartContext);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();
    const [clientSecret, setClientSecret] = useState<string>("");

    useEffect(() => {
        const loadStripeConfig = async () => {
            const stripe = await axiosPrivate.get<ConfigResponse>("/checkout/config");
            setStripePromise(loadStripe(stripe.data.publishableKey));
        };
        loadStripeConfig()
    }, [axiosPrivate]);

    useEffect(() => {
        const createPaymentIntent = async () => {
            const paymentIntentResponse = await axiosPrivate.post("/checkout/create-payment-intent", {
                productIds: getProductIdsFromCart(),
                ShippingAddress: "123 Main St, New York, NY 10030"
            });
            setClientSecret(paymentIntentResponse.data.clientSecret);
        };
        createPaymentIntent();

    }, [axiosPrivate, getProductIdsFromCart]);

    return (
        <>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    );
};

export default Payment;