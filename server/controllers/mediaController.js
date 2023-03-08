import { v2 as cloudinary } from "cloudinary";

//upload avatar
const uploadUserPicture = async (req, res) => {
  // console.log("req", req.file);

  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });
    // console.log("upload", upload);
    res.status(200).json({
      msg: "image upload ok",
      imageUrl: upload.url,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: "couldn't upload image", error: error });
  }
};

//upload encounter photo
const uploadEncounterPicture = async (req, res) => {
  // console.log("req", req.file);

  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
      transformation: [{ width: 700, height: 447, crop: "fill" }],
    });

    // console.log("upload", upload);
    res.status(200).json({
      msg: "image upload ok",
      imageUrl: upload.url,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldn't upload image", error: error });
  }
};

//upload encounter audio file
const uploadAudioFile = async (req, res) => {
  // console.log("herereeeeerfthgrtgf");
  // console.log("req.file", req.file);
  // console.log("req", req);
  try {
    // console.log("req.file.path :>> ", req.file.path);
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
      resource_type: "auto",
    });
    // console.log("upload", upload);
    res.status(200).json({
      msg: "audio upload ok",
      recordUrl: upload.url,
    });
    // console.log("res", res);
  } catch (error) {
    res.status(500).json({ msg: "couldn't upload audio", error: error });
  }
};

export { uploadUserPicture, uploadEncounterPicture, uploadAudioFile };
