/* eslint-disable react-hooks/exhaustive-deps */

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { apiCreateOrder } from "../../apis";
import { useEffect } from "react";
// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({currency, showSpinner, amount, isShowCardOrPayPal, payload, setIsSuccessPayOrder }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    // actions.order.capture():  is part of the PayPal JavaScript SDK and is used to complete or finalize the payment after a user has approved the transaction
    useEffect(() => {
        dispatch({
            type : 'resetOptions',
            value : {
                ...options, currency : currency
            }
        })
    }, [showSpinner, currency]);
    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={isShowCardOrPayPal}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units : [{
                        amount : {
                            value : amount,
                            currency_code : currency
                        }
                    }],
                })}
                onApprove={(data, actions) => actions.order.capture().then(async (details) => {
                    if (details.status === 'COMPLETED') {
                        payload.isPayment = true;
                        const result = await apiCreateOrder(payload);
                        if (result.success) { 
                            setIsSuccessPayOrder(true)
                        }
                    }
                })}
            />
        </>
    );
}

export default function PayPal({amount, isShowCardOrPayPal, payload, setIsSuccessPayOrder}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper showSpinner={false} currency={'USD'} setIsSuccessPayOrder={setIsSuccessPayOrder} amount={amount} isShowCardOrPayPal = {isShowCardOrPayPal} payload={payload}/>
            </PayPalScriptProvider>
        </div>
    );
}