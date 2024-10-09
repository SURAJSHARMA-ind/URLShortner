const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
const config = require("./config/config");
const urlRoute = require("./routes/url");
const UrlModel = require("./database/db");

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);

app.use(express.json());

app.use("/short", urlRoute);

app.get("/:shortId", async (req, res) => {
  const id = req.params.shortId;
  console.log(id);

  if (!id) {
    return res.status(400).send({
      message: " Incorrect format ",
    });
  }
  try {
    const existingId = await UrlModel.findOne({ shortUrl: id });
    if (!existingId) {
      return res.status(404).send({
        message: "Not found",
      });
    }
    const redirectUrl = existingId.mainurl;
    res.redirect(redirectUrl);
  } catch (error) {
    return res.status(500).send({
      message: `Error : ${error}`,
    });
  }
});

app.listen(config.port, () => {
  console.log(`Server is running at http://${config.hostname}:${config.port}`);
});
