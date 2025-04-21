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
const useragent = require("express-useragent");
const axios = require("axios");
const ipInfoToken = process.env.IPINFO;
// Middleware to collect visitor information
const visitorsInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userIP = req.clientIp ||
        req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        null;
    let locationInfo = {};
    try {
        const geoResponse = yield axios.get(`https://ipinfo.io/${userIP}/json?token=${ipInfoToken}`);
        locationInfo = geoResponse.data; // Contains city, region, country, latitude, longitude, etc.
    }
    catch (error) {
        console.error("Error fetching location data:", error);
    }
    // Get user agent information
    const deviceInfo = req.useragent; // This is where you get the user agent info
    // Ensure deviceInfo is defined before accessing its properties
    if (!deviceInfo) {
        console.error("Device information is not available");
        return next(); // Proceed to next middleware or endpoint
    }
    // Combine all user information into a single object
    const userInfo = {
        ip: userIP,
        device: {
            browser: deviceInfo.browser || "Unknown",
            os: deviceInfo.os || "Unknown",
        },
        location: locationInfo,
    };
    console.log("User Info:", userInfo);
    next(); // Move to the next middleware or route
});
module.exports = visitorsInfo;
