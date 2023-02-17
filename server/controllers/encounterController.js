import encounterModel from "../models/encounterModel.js";
import userModel from "../models/userModel.js";

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

const postEncounter = async (req, res) => {
  console.log("req.body :>> ", req.body);

  try {
    const existingUserName = await userModel.findOne({
      userName: req.body.userName,
    });
    const currentDate = new Date();

    if (
      !req.body.location.area ||
      !req.body.location.province ||
      !req.body.location.country
    ) {
      res.status(500).json({
        msg: "you should give the location details",
      });
    } else if (!req.body.title) {
      res.status(500).json({
        msg: "you should write a title",
      });
    } else if (
      !req.body.coordinates.latitude ||
      !req.body.coordinates.longitude
    ) {
      res.status(500).json({
        msg: "you should choose the coordinates",
      });
    } else if (!req.body.species) {
      res.status(500).json({
        msg: "you should write a species",
      });
    } else if (!req.body.experience) {
      res.status(500).json({
        msg: "you should write an experience",
      });
    } else {
      const newEncounter = new encounterModel({
        userName: existingUserName.userName,
        location: req.body.location,
        area: req.body.location.area,
        province: req.body.location.province,
        country: req.body.location.country,
        experience: req.body.experience,
        species: req.body.species,
        coordinates: req.body.coordinates,
        latitude: req.body.coordinates.latitude,
        longitude: req.body.coordinates.longitude,
        title: req.body.title,
        image: req.body.image,
        posttime: currentDate,
        time: req.body.time,
        favs: req.body.favs,
        record: req.body.record,
      });

      try {
        const savedEncounter = await newEncounter.save();
        res.status(201).json({
          msg: "posting successful",
          encounter: {
            userName: savedEncounter.userName,
            coordinates: {
              latitude: savedEncounter.coordinates.latitude,
              longitude: savedEncounter.coordinates.longitude,
            },
            experience: savedEncounter.experience,
            species: savedEncounter.species,
            location: {
              area: savedEncounter.location.area,
              province: savedEncounter.location.province,
              country: savedEncounter.location.country,
            },
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
    }
  } catch (error) {
    console.log("something went wrong");
    res.status(500).json({
      msg: "something went wrong",
      error: error,
    });
  }
};

export { getAllEncounters, getEncountersById, postEncounter };
