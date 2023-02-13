import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { passwordEncryption } from "../utils/bcrypt.js";

const imageUpload = async (req, res) => {
  console.log("request :>> ", req.file);

  try {
    const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
    });
    console.log("pictureUpload", pictureUpload);
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

const signup = async (req, res) => {
  console.log("req.body :>> ", req.body);
  // const { userName, email, password, userPicture } = req.body; //desctructured version (be careful with undefined/null fields)
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser", existingUser);

    const currentDate = new Date();

    if (existingUser) {
      res.status(500).json({
        msg: "this email address is already in use",
      });
    } else {
      const hashedPassword = await passwordEncryption(req.body.password);
      console.log("hashedPassword", hashedPassword);

      const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        userPicture: req.body.userPicture,
        signupTime: currentDate,
        favs: req.body.favs,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "signup successful",
          user: {
            userName: savedUser.userName,
            email: savedUser.email,
            userPicture: savedUser.userPicture,
            signupTime: savedUser.signupTime,
            favs: savedUser.favs,
          },
        });
      } catch (error) {
        res.status(400).json({
          msg: "error during signup",
          error: error,
        });
      }
    }
  } catch (error) {
    console.log("error registering user :>>");
  }
};

export { imageUpload, signup };
