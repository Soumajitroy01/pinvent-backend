import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import contactRoute from "./routes/contactRoute.js";
import errorHandler from "./middleWare/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

//we need to change up how __dirname is used for ES6 purposes
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app config
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB config
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

// API routes
app.get('/', (req, res) => {
    res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// listeners
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
});