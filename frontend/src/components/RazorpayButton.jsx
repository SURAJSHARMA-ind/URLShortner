import React from 'react';
import axios from 'axios';

const PaymentButton = () => {
    const razorPayID= import.meta.env.VITE_RAZORPAY_KEY_ID
    const handlePayment = async () => {
        try {
            // Create order via backend
            const response = await axios.post('http://localhost:3000/api/payment/create-order', {
                amount: 500, // Amount in rupees
                currency: 'INR',
            });

            const { id: order_id, amount, currency } = response.data;

            // Set up RazorPay options
            const options = {
                key: razorPayID,
                amount: amount,
                currency: currency,
                name: "Suraj Sharma", // user name 
                description: "Test Transaction",
                order_id: order_id,
                handler: (response) => {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                theme: {
                    color: "#FFFF8F",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };

    return <button className='bg-yellow-300 hover:bg-yellow-400 text-black p-2  rounded-md ' onClick={handlePayment}>Pay Now</button>;
};

export default PaymentButton;