const express = require("express");
const router = express.Router();
const UrlModel = require("../database/db");
const shortUuid = require("short-uuid");
const app = express();

app.use(express.json());

router.post("/url", async (req, res) => {
  try {
    const inputUrl = req.body;
    console.log(inputUrl);
    if (!inputUrl.url) {
      return res.status(400).json({
        message: "Url not found ",
      });
    }
    const existingUrl = await UrlModel.findOne({ mainurl: inputUrl.url });
    if (existingUrl) {
      return res.send({
        message: `Short URL already exist ${existingUrl.shortUrl}`,
      });
    }
      console.log("newstage");

      const id = shortUuid.generate();
      const shortId =id.slice(0,8)
      console.log(shortId);
      
      await UrlModel.create({
        mainurl: inputUrl.url,
        shortUrl: shortId,
      });
      return res.status(200).json({
        message: "Url generated",
        url: shortId,
      });
    
  } catch (error) {
    return res.status(500).send({
      message: `Error:${error}`,
    });
  }
});

module.exports = router;
