import encounterModel from "../models/encounterModel.js";

//get all encounters
const getAllEncounters = async (req, res) => {
  try {
    const allEncounters = await encounterModel.find({});
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
  console.log("req.user :>> ", req.user.userName);

  try {
    const {
      title,
      species,
      country,
      province,
      experience,
      longitude,
      latitude,
      time,
    } = req.body;

    console.log("req.body :>> ", req.body);

    function isNullUndefinedOrEmpty(value) {
      return (
        value === null ||
        value === "null" ||
        value === "undefined" ||
        value === undefined ||
        value === ""
      );
    }

    if (
      isNullUndefinedOrEmpty(title) ||
      isNullUndefinedOrEmpty(species) ||
      isNullUndefinedOrEmpty(country) ||
      isNullUndefinedOrEmpty(province) ||
      isNullUndefinedOrEmpty(latitude) ||
      isNullUndefinedOrEmpty(longitude) ||
      isNullUndefinedOrEmpty(time) ||
      isNullUndefinedOrEmpty(experience)
    ) {
      return res.status(400).json({
        error: "Some fields are missing",
        msg: "missing fields",
      });
    } else {
      const newEncounter = new encounterModel({
        userName: req.user.userName,
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
            userName: savedEncounter.userName,
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

//delete encounter
const deleteEncounter = async (req, res) => {
  try {
    const encounterToDelete = await encounterModel.findOneAndDelete({
      _id: req.body._id,
    });

    console.log("req.body-test", req.body);
    console.log("req.user :>> ", req.user);

    if (!encounterToDelete) {
      return res.status(404).json({
        msg: "Encounter not found",
      });
    }

    res.status(200).json({
      msg: "Encounter deleted successfully",
    });
  } catch (error) {
    console.log("something went wrong");
    res.status(500).json({
      msg: "something went wrong",
      error: error,
    });
  }
};
export { getAllEncounters, getEncountersById, postEncounter, deleteEncounter };
