                                                        
                                                                                                                        
import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import { axiosRequest, getConfig } from '../../helpers/config'
import { useSelector } from 'react-redux'
 

export default function Stripe( ) {
    const stripePromise = loadStripe('pk_test_51RKgIZP09DJXxWk8rSyCZwQWx3N8ci8drdx2MqZ02QEr48lgIL1ggHL2tIwUgOvXSm1CB3bCSL3eEx3sdpSVcBx6006dhqDReB')
    const [clientSecret, setClientSecret] = useState("")
    const { token } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    

    useEffect(() => {
        fetchClientSecret()
    }, [])

    const fetchClientSecret = async () => {
        try {
            const response = await axiosRequest.post('pay/order', {
                cartItems,
            },getConfig(token))
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {
                stripePromise && clientSecret && <Elements stripe={stripePromise} options={{clientSecret}}>
                    <CheckoutForm />
                </Elements>
            }
        </>
    );
}


                                                        
                                                     
