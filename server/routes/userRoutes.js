import express from "express";
import { uploadUserPicture, signup } from "../controllers/userController.js";
import { multerUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("image"), uploadUserPicture);
router.post("/signup", signup);

export default router;
