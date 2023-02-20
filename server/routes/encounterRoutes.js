import express from "express";
import {
  getAllEncounters,
  getEncountersById,
  postEncounter,
  uploadEncounterPicture,
  uploadAudioFile,
} from "../controllers/encounterController.js";
import { multerUpload, multerUploadforAudio } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllEncounters);
router.get("/:_id", getEncountersById);
router.post("/postEncounter", postEncounter);

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
