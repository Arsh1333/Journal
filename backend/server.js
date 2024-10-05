import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.db.js";
import { postRouter } from "./routes/Posts.routes.js";
import { userRouter } from "./routes/Users.routes.js";

dotenv.config({
  path: "./.env",
});
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server up and running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
