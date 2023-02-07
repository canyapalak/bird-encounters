import express from "express";
import postModel from "../models/postModel.js";
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allPosts = await postModel.find({});
    console.log("allPosts", allPosts);
    res.status(200).json({
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Something went wrong in the server",
    });
  }
});

export default router;
