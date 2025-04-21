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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortUrl = exports.shortUrl = void 0;
const url_1 = require("../models/url");
const short_uuid_1 = __importDefault(require("short-uuid"));
const port = process.env.PORT;
const shortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputUrl = req.body;
        console.log(inputUrl);
        if (!inputUrl.url) {
            res.status(400).json({
                message: "Url not found ",
            });
            return;
        }
        const existingUrl = yield url_1.UrlModel.findOne({ mainurl: inputUrl.url });
        if (existingUrl) {
            res.send({
                message: `Short URL already exist `,
                shortUrl: `http://localhost:${port}/${existingUrl.shortUrl}`
            });
            return;
        }
        const id = short_uuid_1.default.generate();
        const shortId = id.slice(0, 8);
        console.log(shortId);
        yield url_1.UrlModel.create({
            mainurl: inputUrl.url,
            shortUrl: shortId,
        });
        res.status(200).json({
            message: "Url generated",
            shortUrl: `http://localhost:${port}/${shortId}`,
        });
        return;
    }
    catch (error) {
        res.status(500).send({
            message: `Error:${error}`,
        });
        return;
    }
});
exports.shortUrl = shortUrl;
const getShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.shortId;
    console.log("Short URL ID:", id);
    if (!id) {
        res.status(400).json({ message: "Incorrect format" });
        return;
    }
    try {
        const update = { $inc: { visitors: 1 } };
        const existingId = yield url_1.UrlModel.findOneAndUpdate({ shortUrl: id }, update, { new: true });
        if (!existingId) {
            res.status(404).send({ message: "Not found" });
            return;
        }
        const redirectUrl = existingId.mainurl;
        res.redirect(redirectUrl);
    }
    catch (error) {
        res.status(500).send({ message: `Error: ${error}` });
    }
});
exports.getShortUrl = getShortUrl;
