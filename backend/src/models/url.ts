import mongoose from "mongoose"
import IDetails from "../database/dbTypes";
const Schema = mongoose.Schema;

const Url = new Schema<IDetails>(
  {
    mainurl: { type: String, required: true, unique: true },
    shortUrl: { type: String, unique: true },
    visitors: { type: Number, default: 0 },
    location: [{
      ip: { type: String },
      place: { type: String },
      country: { type: String }
    }],
    device: { type: String },
  },
  { timestamps: true }
);

export const UrlModel = mongoose.model("url", Url);


