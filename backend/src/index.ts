  import express from 'express'
  import mongoose from 'mongoose';
  import cors from 'cors'
  import dotenv from 'dotenv'
  dotenv.config()

  const app = express();

  import urlRoute from "./routes/url"
  import paymentRoutes from './routes/paymentRoutes';
  import { getShortUrl } from './controllers/urlController';

  const port = process.env.PORT || 3000
  const connectionString= process.env.MONGODB_URI;
  if(!connectionString){
    throw new Error("DB connection string is missing")
  }

  app.use(cors());
  app.use(express.json());

  // api Routes
  app.use('/api/v1/payment', paymentRoutes);
  app.use("/api/v1/short", urlRoute);

  app.get("/:shortId",getShortUrl)
  // app.use((err, req, res, next) => {
  //   console.error("Unhandled error:", err);
  //   res.status(500).send({ message: "Something went wrong on the server!" });
  // });


  mongoose.connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB successfully")
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      })
    }
    ).catch((error) => console.error("MongoDB connection error:", error));

