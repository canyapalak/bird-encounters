import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),

  fileFilter: function (req, file, cb) {
    let extension = path.extname(file.originalname);

    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      cb(new Error("sorry the file format is not allowed"), false);

      // The function should call `cb` with a boolean
      // to indicate if the file should be accepted

      // To reject this file pass `false`, like so:
    }

    // To accept the file pass `true`, like so:
    cb(null, true);
  },
});

export { multerUpload };
