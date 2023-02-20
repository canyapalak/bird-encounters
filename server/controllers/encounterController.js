import { v2 as cloudinary } from "cloudinary";
import encounterModel from "../models/encounterModel.js";

//get all encounters
const getAllEncounters = async (req, res) => {
  try {
    const allEncounters = await encounterModel.find({});
    console.log("allEncounters", allEncounters);
    res.status(201).json({
      number: allEncounters.length,
      allEncounters,
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "something went wrong in the server",
    });
  }
};

//get one encounter by id
const getEncountersById = async (req, res) => {
  console.log("req :>> ", req._id);
  const { encounterID } = req.params;

  try {
    const requestedId = await encounterModel
      .find({ _id: req.params._id })
      .exec();
    res.status(201).json({
      number: requestedId.length,
      requestedId,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong in the server",
    });
  }
};

//create new encounter
const postEncounter = async (req, res) => {
  console.log("req.body :>> ", req.body);
  // username icin authotization sonrasinda req.user.username cagirmam yeterli olacak.

  try {
    const { title, species, country, province, experience } = req.body;

    if (!title || !species || !country || !province || !experience) {
      return res.status(400).json({
        error: "Some fields are missing",
        msg: "missing fields",
      });
    } else {
      const newEncounter = new encounterModel({
        username: "test",
        province: req.body.province,
        country: req.body.country,
        experience: req.body.experience,
        species: req.body.species,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        title: req.body.title,
        image: req.body.image,
        posttime: req.body.posttime,
        time: req.body.time,
        favs: req.body.favs,
        record: req.body.record,
      });
      console.log("newEncounter :>> ", newEncounter);

      try {
        const savedEncounter = await newEncounter.save();
        res.status(201).json({
          msg: "posting successful",
          encounter: {
            username: savedEncounter.username,
            latitude: savedEncounter.latitude,
            longitude: savedEncounter.longitude,
            experience: savedEncounter.experience,
            species: savedEncounter.species,
            province: savedEncounter.province,
            country: savedEncounter.country,
            title: savedEncounter.title,
            image: savedEncounter.image,
            posttime: savedEncounter.posttime,
            time: savedEncounter.time,
            favs: savedEncounter.favs,
            record: savedEncounter.record,
          },
        });
      } catch (error) {
        console.log("error during posting");
        res.status(500).json({
          msg: "error during posting",
          error: error,
        });
      }
      // }
    }
  } catch (error) {
    console.log("something went wrong");
    res.status(500).json({
      msg: "something went wrong",
      error: error,
    });
  }
};

//upload encounter photo
const uploadEncounterPicture = async (req, res) => {
  console.log("req", req.file);

  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
      transformation: [{ width: 700, height: 447, crop: "fill" }],
    });

    console.log("upload", upload);
    res.status(200).json({
      msg: "image upload ok",
      imageUrl: upload.url,
    });
  } catch (error) {
    res.status(500).json({ msg: "couldn't upload image", error: error });
  }
};

//upload audio record file for encounter
const uploadAudioFile = async (req, res) => {
  console.log("req", req.file);

  try {
    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "bird-encounters",
    });

    console.log("upload", upload);
    res.status(200).json({
      msg: "file upload ok",
      recordUrl: upload.url,
    });
    console.log("res", res);
  } catch (error) {
    res.status(500).json({ msg: "couldn't upload file", error: error });
  }
};

export {
  getAllEncounters,
  getEncountersById,
  postEncounter,
  uploadEncounterPicture,
  uploadAudioFile,
};
