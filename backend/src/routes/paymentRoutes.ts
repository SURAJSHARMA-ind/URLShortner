import Router  from "express";
import { razorPayOrder } from "../controllers/razorpayOrder";

const router = Router()
// Endpoint to create an order
router.post('/create-order', razorPayOrder);

export default router;