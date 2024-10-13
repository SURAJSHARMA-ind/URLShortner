const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const requestIp = require('request-ip');
require("dotenv").config();

const app = express();
app.use(cors());
const config = require("./config/config");
const urlRoute = require("./routes/url");
const UrlModel = require("./database/db");
const paymentRoutes = require('./routes/paymentRoutes');

const connectionString = process.env.MONGODB_URI;

// Establish connection to MongoDB with error handling
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(requestIp.mw());
app.use(express.json());
app.use('/api/payment', paymentRoutes);
app.use("/short", urlRoute);

app.get('/', (req, res) => {
  const userIp = req.clientIp; // Automatically set by request-ip middleware
  res.send(`User's IP address is: ${userIp}`);
});

app.get("/:shortId", async (req, res) => {
  const id = req.params.shortId;
  console.log(id);

  if (!id) {
    return res.status(400).send({
      message: "Incorrect format",
    });
  }

  try {
    const update = { $inc: { visitors: 1 } }; // Fixed syntax error here
    const existingId = await UrlModel.findOneAndUpdate({ shortUrl: id }, update, { new: true });

    if (!existingId) {
      return res.status(404).send({
        message: "Not found",
      });
    }

    const redirectUrl = existingId.mainurl;
    res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).send({
      message: `Error: ${error}`,
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server is running at http://${config.hostname}:${config.port}`);
});
