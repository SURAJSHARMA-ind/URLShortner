import { Request, Response } from 'express';
import { razorpayInstance } from './razorpay';

interface UserResponse {
  amount: number;
  currency: string;
}

export const razorPayOrder = async (req: Request, res: Response) => {
  const { amount, currency }: UserResponse = req.body;

  try {
    const options = {
      amount: amount * 100, // smallest unit (paise)
      currency: currency || 'INR',
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).send('Error creating Razorpay order');
  }
};
