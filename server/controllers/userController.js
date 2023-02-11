import { v2 as cloudinary } from "cloudinary";

const imageUpload = async (req, res) => {
  console.log("request :>> ", req.file);

  try {
    const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
    });
    console.log("pictureUpload", pictureUpload).url;
    res.status(200).json({
      msg: "file was uploaded",
      userPicture: pictureUpload.url,
    });
  } catch (error) {
    res.status(400).json({
      msg: "file upload failed",
    });
  }
};

export { imageUpload };
