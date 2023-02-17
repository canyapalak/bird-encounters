import express from "express";
import {
  uploadUserPicture,
  uploadEncounterPicture,
  signup,
  login,
} from "../controllers/userController.js";
import { postEncounter } from "../controllers/encounterController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), uploadUserPicture);
router.post(
  "/imageUploadEncounter",
  multerUpload.single("image"),
  uploadEncounterPicture
);
router.post("/postEncounter", postEncounter);
router.post("/signup", signup);
router.post("/login", login);

export default router;
