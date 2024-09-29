import express from "express";
import {
  getPosts,
  addPost,
  deletePosts,
  updatePost,
} from "../controllers/Posts.controllers.js";
import { authenticateToken } from "../middleware/authenticate.middleware.js";
const postRouter = express.Router();
// postRouter.length("/post", (req, res) => {
//   res.send({});
// });
postRouter.get("/", authenticateToken, getPosts);
postRouter.post("/add", authenticateToken, addPost);
postRouter.delete("/:id", authenticateToken, deletePosts);
postRouter.put("/:id", authenticateToken, updatePost);
export { postRouter };
