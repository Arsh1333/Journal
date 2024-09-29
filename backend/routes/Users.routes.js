import express from "express";
import {
  register,
  login,
  getAllUsers,
} from "../controllers/Users.controllers.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/all", getAllUsers);

export { userRouter };
