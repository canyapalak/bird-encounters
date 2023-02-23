import express from "express";
import {
  getAllEncounters,
  getEncountersById,
  postEncounter,
  deleteEncounter,
  updateEncounter,
} from "../controllers/encounterController.js";
import {
  uploadEncounterPicture,
  uploadAudioFile,
} from "../controllers/mediaController.js";
import { multerUpload, multerUploadforAudio } from "../middlewares/multer.js";
import jwt from "../middlewares/jwt.js";

const router = express.Router();

router.get("/all", getAllEncounters);
router.get("/:_id", getEncountersById);
router.post("/postEncounter", jwt, postEncounter);
router.delete("/deleteEncounter", jwt, deleteEncounter);
router.put("/updateEncounter/:_id", jwt, updateEncounter);

router.post(
  "/imageUploadEncounter",
  multerUpload.single("image"),
  uploadEncounterPicture
);

router.post(
  "/audioUpload",
  multerUploadforAudio.single("record"),
  uploadAudioFile
);

export default router;
