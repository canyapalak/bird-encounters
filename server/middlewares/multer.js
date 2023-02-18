import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("File extension not supported"), false);
    }
    cb(null, true);
  },
});

const multerUploadforAudio = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    let extension = path.extname(file.originalname);
    if (extension !== ".mp3" && extension !== ".wav" && extension !== ".m4a") {
      cb(new Error("File extension not supported"), false);
    }
    cb(null, true);
  },
});

//REVIEW[epic=demo, seq=6] 6. Export the function
export { multerUpload, multerUploadforAudio };
