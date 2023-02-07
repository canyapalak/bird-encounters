import express from "express";
import encounterModel from "../models/encounterModel.js";
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const allEncounters = await encounterModel.find({});
    console.log("allEncounters", allEncounters);
    res.status(200).json({
      allEncounters,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Something went wrong in the server",
    });
  }
});

export default router;
