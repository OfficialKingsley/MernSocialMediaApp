import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";
import errorHandler from "./middlewares/errorMiddleware";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb" }));

// app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Variables and Mongoose setup
const mongoUrl =
  process.env.MONGO_URL || "mongodb://localhost:27017/MernSocialMediaApp";
const port: string = process.env.PORT || "5000";

app.use(errorHandler);

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.group();
    console.log(err);
    console.log("Server didn't start");
    console.groupEnd();
  });
