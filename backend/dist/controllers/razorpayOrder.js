"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorPayOrder = void 0;
const razorpay_1 = require("./razorpay");
const razorPayOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, currency } = req.body;
    try {
        const options = {
            amount: amount * 100, // smallest unit (paise)
            currency: currency || 'INR',
        };
        const order = yield razorpay_1.razorpayInstance.orders.create(options);
        res.status(200).json(order);
    }
    catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500).send('Error creating Razorpay order');
    }
});
exports.razorPayOrder = razorPayOrder;
