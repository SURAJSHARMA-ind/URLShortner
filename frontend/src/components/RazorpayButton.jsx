import React from 'react';

const RazorpayButton = () => {
    // Function to load the Razorpay checkout script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    // Function to handle the payment when the button is clicked
    const handlePayment = async () => {
        const isScriptLoaded = await loadRazorpayScript();

        if (!isScriptLoaded) {
            alert('Razorpay SDK failed to load. Please check your internet connection.');
            return;
        }

        // Call your backend to create a new order and get the order details
        try {
            const response = await fetch('http://localhost:3000/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 50000, // Amount in the smallest currency unit (e.g., 50000 paisa = ₹500)
                    currency: 'INR',
                    receipt: 'receipt_123456',
                }),
            });

            const orderData = await response.json();

            if (!orderData.success) {
                alert('Failed to create Razorpay order');
                return;
            }

            // Options for the Razorpay payment object
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'TinyUrls',
                description: 'Test Transaction',
                order_id: orderData.order.id, // Razorpay Order ID from your backend
                handler: function (response) {
                    // This function handles the successful payment response
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    console.log(response);
                },
                prefill: {
                    name: 'Suraj Sharma',
                    email: 'suraj@example.com',
                    contact: '',
                },
                theme: {
                    color: '#FBEC5D',
                },
            };

            // Initialize the Razorpay payment object and open the checkout popup
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error in handlePayment:', error);
            alert('An error occurred while initiating the payment.');
        }
    };

    return (
        <div>
            <button
                onClick={handlePayment}
                className='bg-yellow-300 hover:bg-yellow-400 p-2 rounded-md w-full'
            >
                Pay Now
            </button>
        </div>
    );
};

export default RazorpayButton;
