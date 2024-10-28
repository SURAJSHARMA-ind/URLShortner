const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const config = require("./config/config");
const urlRoute = require("./routes/url");
const UrlModel = require("./database/db");
const paymentRoutes = require('./routes/paymentRoutes');
const visitorsInfo = require("./middleware/visitorsInfo");

app.use(cors());
app.use(express.json());

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use('/api/payment', paymentRoutes);
app.use("/short", urlRoute);

app.get("/:shortId", visitorsInfo, async (req, res) => {
  const id = req.params.shortId;
  console.log("Short URL ID:", id);

  if (!id) {
    return res.status(400).send({ message: "Incorrect format" });
  }

  try {
    const update = { $inc: { visitors: 1 } }; 
    const existingId = await UrlModel.findOneAndUpdate({ shortUrl: id }, update, { new: true });

    if (!existingId) {
      return res.status(404).send({ message: "Not found" });
    }

    const redirectUrl = existingId.mainurl;
    res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).send({ message: `Error: ${error}` });
  }
});

app.get("/test-user-agent", (req, res) => {
  const userAgent = req.useragent;
  console.log("User-Agent:", userAgent);
  res.send({ userAgent });
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send({ message: "Something went wrong on the server!" });
});


app.listen(config.port, () => {
  console.log(`Server is running at http://${config.hostname}:${config.port}`);
});
