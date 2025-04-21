"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const url_1 = __importDefault(require("./routes/url"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const urlController_1 = require("./controllers/urlController");
const port = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;
if (!connectionString) {
    throw new Error("DB connection string is missing");
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// api Routes
app.use('/api/v1/payment', paymentRoutes_1.default);
app.use("/api/v1/short", url_1.default);
app.get("/:shortId", urlController_1.getShortUrl);
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);
//   res.status(500).send({ message: "Something went wrong on the server!" });
// });
mongoose_1.default.connect(connectionString)
    .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => console.error("MongoDB connection error:", error));
