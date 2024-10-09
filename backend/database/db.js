const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Url = new Schema(
  {
    mainurl: { type: String, required: true, unique: true },
    shortUrl: { type: String,   unique: true },
  },{
    visitor :{type:Number},
    
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url",Url)

module.exports = UrlModel;
