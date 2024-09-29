import mongoose from "mongoose";
import { Posts } from "../models/Posts.models.js";
import { authenticateToken } from "../middleware/authenticate.middleware.js";

const addPost = async (req, res) => {
  const { content } = req.body;
  // console.log(authenticateToken);
  // console.log(req);
  const newPost = new Posts({
    content: content,
    owner: req.user._id,
    date: Date.now(),
  });
  newPost
    .save()
    .then((entry) => res.status(201).json(entry))
    .catch((err) => res.status(400).json({ error: err.message }));
};

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
};

const deletePosts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Not Found" });
  }
  const posts = await Posts.findOneAndDelete({ _id: id, owner: req.user._id });
  if (!posts) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json(posts);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }
  const posts = await Posts.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { ...req.body }
  );
  if (!posts) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json(posts);
};

export { getPosts, addPost, deletePosts, updatePost };
