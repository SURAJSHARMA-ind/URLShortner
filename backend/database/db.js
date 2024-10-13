const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Url = new Schema(
  {
    mainurl: { type: String, required: true, unique: true },
    shortUrl: { type: String, unique: true },
    visitors: { type: Number , default:0},
    location: [],
    device: { type: String },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url", Url);

module.exports = UrlModel;
