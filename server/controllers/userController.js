import userModel from "../models/userModel.js";
import { passwordEncryption, verifyPassword } from "../utils/bcrypt.js";
import generateToken from "../utils/jwt.js";

//new user signup
const signup = async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    const existingUserName = await userModel.findOne({
      userName: req.body.userName,
    });
    const email = req.body.email;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const password = req.body.password;
    const currentDate = new Date();

    if (existingUser) {
      res.status(500).json({
        msg: "this email address is already in use",
      });
    } else if (req.body.userName === "undefined") {
      res.status(500).json({
        msg: "username can not be empty",
      });
    } else if (existingUserName) {
      res.status(500).json({
        msg: "this username is already in use",
      });
    } else if (!emailRegex.test(email)) {
      res.status(500).json({
        msg: "email address is invalid",
      });
    } else if (password.length < 6) {
      res.status(500).json({
        msg: "password should be at least 6 characters",
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
        isAdmin: false,
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
            isAdmin: savedUser.isAdmin,
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

//existing user login
const login = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({ msg: "email is wrong" });
    } else {
      const isPasswordMatch = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      if (!isPasswordMatch) {
        res.status(401).json({ msg: "password is wrong" });
      } else {
        const token = generateToken(existingUser._id);

        console.log("token", token);

        res.status(200).json({
          msg: "you are logged in",
          user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            signupTime: existingUser.signupTime,
            userPicture: existingUser.userPicture,
            isAdmin: existingUser.isAdmin,
            favs: existingUser.favs,
          },
          token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

//get profile
const getProfile = async (req, res) => {
  console.log("req.user>>>", req.user);

  res.status(200).json({
    user: {
      userName: req.user.userName,
      email: req.user.email,
      userPicture: req.user.userPicture,
      favs: req.user.favs,
      isAdmin: req.user.isAdmin,
      signupTime: req.user.signupTime,
    },
  });
};

//update profile
const updateProfile = async (req, res) => {
  console.log("req.user :>> ", req.user);
  console.log("req.body :>> ", req.body);

  const { userName, email, userPicture, password } = req.body;
  const id = req.user._id;

  try {
    const updatedFields = {};
    if (userName) {
      const existingUsername = await userModel.findOne({ userName: userName });
      if (existingUsername && userName !== req.user.userName) {
        return res
          .status(400)
          .json({ errors: { msg: "Username already in use" } });
      }
      updatedFields.userName = userName;
    }
    if (email) {
      const existingEmail = await userModel.findOne({ email: email });
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (existingEmail && email !== req.user.email) {
        return res
          .status(400)
          .json({ errors: { msg: "Email already in use" } });
      }
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ errors: { msg: "email address is invalid" } });
      }
      updatedFields.email = email;
    }
    if (userPicture) {
      updatedFields.userPicture = userPicture;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          errors: { msg: "password should be at least 6 characters" },
        });
      }
      const hashedPassword = await passwordEncryption(req.body.password);
      updatedFields.password = hashedPassword;
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    res.status(200).json({ msg: "Update successful", user: updatedUser });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "Error updating info", error: error });
  }
};

export { signup, login, getProfile, updateProfile };
