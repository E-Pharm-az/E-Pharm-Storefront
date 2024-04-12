import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {OnApproveActions, OnApproveData} from "@paypal/paypal-js";

function PayPalCheckout() {
    const [{isPending}] = usePayPalScriptReducer();

    const createOrder = async () => {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cart: [
                        {
                            id: "YOUR_PRODUCT_ID",
                            quantity: "YOUR_PRODUCT_QUANTITY",
                        },
                    ],
                }),
            });
            const orderData = await response.json();
            if (orderData.id) {
                return orderData.id;
            } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
            alert(`Could not initiate PayPal Checkout...\n\n${error}`);
        }
    };

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        try {
            const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const orderData = await response.json();
            const errorDetail = orderData?.details?.[0];
            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
            } else if (errorDetail) {
                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
                throw new Error(JSON.stringify(orderData));
            } else {
                const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}`);
                console.log("Capture result", orderData);
            }
        } catch (error) {
            console.error(error);
            alert(`Sorry, your transaction could not be processed...\n\n${error}`);
        }
    };

    return (
        <PayPalButtons
            style={{layout: 'horizontal'}}
            createOrder={createOrder}
            onApprove={onApprove}
            forceReRender={[isPending]}
        />
    );
}

export default PayPalCheckout;
