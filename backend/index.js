const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;
const host = "localhost";
const urlRoute = require("./routes/url");
const UrlModel = require("./database/db");

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString);

app.use(express.json());

app.use("/short", urlRoute);

app.post("/:shortId", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
