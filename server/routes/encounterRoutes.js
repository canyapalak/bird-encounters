import express from "express";
import {
  getAllEncounters,
  getEncountersById,
  postEncounter,
  deleteEncounter,
  updateEncounter,
  addComment,
  deleteComment,
  getEncountersByUserName,
  addFavourite,
  removeFavourite,
  checkFavourite,
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
router.get("/by/:userName/", getEncountersByUserName);
router.post("/postEncounter", jwt, postEncounter);
router.delete("/deleteEncounter", jwt, deleteEncounter);
router.put("/updateEncounter/:_id", jwt, updateEncounter);
router.post("/:_id/comments", jwt, addComment);
router.delete("/:_id/comments", jwt, deleteComment);
router.put("/addFavourites", jwt, addFavourite);
router.put("/removeFavourites", jwt, removeFavourite);
router.get("/:encounterId/favourites/:userId", jwt, checkFavourite);

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
