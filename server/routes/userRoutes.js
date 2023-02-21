import express from "express";
import {
  uploadUserPicture,
  signup,
  login,
  getProfile,
} from "../controllers/userController.js";
import jwt from "../middlewares/jwt.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/profile", jwt, getProfile);
router.post("/imageUpload", multerUpload.single("image"), uploadUserPicture);
router.post("/signup", signup);
router.post("/login", login);

export default router;
