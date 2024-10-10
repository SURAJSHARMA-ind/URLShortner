// /controllers/paymentController.js
const razorpayInstance = require('../config/razorpay');

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise (smallest currency unit)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in creating Razorpay order:", error);
    res.status(500).json({ success: false, message: 'Order creation failed' });
  }
};

exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Verification logic here using crypto for signature verification
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid payment verification' });
  }
};
