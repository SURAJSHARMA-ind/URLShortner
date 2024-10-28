const useragent = require("express-useragent");
const axios = require("axios");
const ipInfoToken = process.env.IPINFO;

// Middleware to collect visitor information
const visitorsInfo = async (req, res, next) => {
  const userIP =
    req.clientIp ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    null;

  let locationInfo = {};
  try {
    const geoResponse = await axios.get(
      `https://ipinfo.io/${userIP}/json?token=${ipInfoToken}`
    );
    locationInfo = geoResponse.data; // Contains city, region, country, latitude, longitude, etc.
  } catch (error) {
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
};

module.exports = visitorsInfo;
