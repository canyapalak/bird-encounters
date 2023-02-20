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
    console.log("file :>> ", file);
    let extension = path.extname(file.originalname);
    if (extension !== ".mp3" && extension !== ".wav" && extension !== ".m4a") {
      console.log("wrong file");
      cb(new Error("video file extension not supported"), false);
    } else {
      // console.log("req :>> ", req);
      console.log("file ok");
      cb(null, true);
    }
  },
});

export { multerUpload, multerUploadforAudio };
