import express from "express";
import {
  uploadUserPicture,
  uploadEncounterPicture,
  signup,
  login,
  uploadAudioFile,
} from "../controllers/userController.js";
import { multerUpload, multerUploadforAudio } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), uploadUserPicture);

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

router.post("/signup", signup);

router.post("/login", login);

export default router;
