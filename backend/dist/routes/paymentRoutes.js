"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpayOrder_1 = require("../controllers/razorpayOrder");
const router = (0, express_1.default)();
// Endpoint to create an order
router.post('/create-order', razorpayOrder_1.razorPayOrder);
exports.default = router;
