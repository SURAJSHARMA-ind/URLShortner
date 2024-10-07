const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Url = new Schema(
  {
    mainurl: { type: String, required: true, unique: true },
    shortUrl: { type: String,   unique: true },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url",Url)

module.exports = UrlModel;
