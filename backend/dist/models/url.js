"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Url = new Schema({
    mainurl: { type: String, required: true, unique: true },
    shortUrl: { type: String, unique: true },
    visitors: { type: Number, default: 0 },
    location: [{
            ip: { type: String },
            place: { type: String },
            country: { type: String }
        }],
    device: { type: String },
}, { timestamps: true });
exports.UrlModel = mongoose_1.default.model("url", Url);
