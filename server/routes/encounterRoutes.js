import express from "express";
import { getAllEncounters } from "../controllers/encounterController.js";
import encounterModel from "../models/encounterModel.js";

const router = express.Router();

router.get("/all", getAllEncounters);

export default router;
