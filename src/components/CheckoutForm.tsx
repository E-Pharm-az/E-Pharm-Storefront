import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useState} from "react";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setIsProcessing(false);
    };

    return (
        <form className="mx-auto p-2 flex items-center justify-center h-screen max-w-[800px]" onSubmit={handleSubmit}>
            <div className="space-y-12">
                <PaymentElement />
                <button className="p-2 w-full text-white border border-green-800 bg-green-500 hover:bg-green-600 transition rounded" disabled={isProcessing || !stripe || !elements} id="submit">
                    <span >
                      {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {message && <div >{message}</div>}
            </div>
        </form>
    );
}