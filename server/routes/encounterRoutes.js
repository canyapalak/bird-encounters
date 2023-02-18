import express from "express";
import {
  getAllEncounters,
  getEncountersById,
  postEncounter,
} from "../controllers/encounterController.js";

const router = express.Router();

router.get("/all", getAllEncounters);
router.get("/:_id", getEncountersById);
router.post("/postEncounter", postEncounter);

export default router;
