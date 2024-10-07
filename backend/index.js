const express = require("express");
const mongoose = require("mongoose");   
require("dotenv").config(); 

const app = express()
const port = 3000;
const host = "localhost";
const urlRoute = require('./routes/url');

const connectionString = process.env.MONGODB_URI
mongoose.connect(connectionString);

app.use(express.json());

app.use('/short',urlRoute)

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
