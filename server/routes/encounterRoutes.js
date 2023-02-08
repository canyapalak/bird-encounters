import express from "express";
import {
  getAllEncounters,
  getEncountersById,
} from "../controllers/encounterController.js";
import encounterModel from "../models/encounterModel.js";

const router = express.Router();

router.get("/all", getAllEncounters);
router.get("/:_id", getEncountersById);

export default router;
