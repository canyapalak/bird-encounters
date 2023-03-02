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
        userPicture: req.user.userPicture,
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
            userPicture: savedEncounter.userPicture,
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

//update encounter
const updateEncounter = async (req, res) => {
  try {
    const { title, species, country, province, experience, time } = req.body;

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
      isNullUndefinedOrEmpty(time) ||
      isNullUndefinedOrEmpty(experience)
    ) {
      return res.status(400).json({
        error: "Some fields are missing",
        msg: "missing fields",
      });
    } else {
      try {
        const encounterToUpdate = await encounterModel.findByIdAndUpdate(
          req.params._id,
          {
            province: req.body.province,
            country: req.body.country,
            experience: req.body.experience,
            species: req.body.species,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            title: req.body.title,
            image: req.body.image,
            time: req.body.time,
            record: req.body.record,
          },
          { new: true }
        );

        res.status(200).json({
          msg: "Encounter updated successfully",
          encounter: encounterToUpdate,
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

//add comment
const addComment = async (req, res) => {
  const encounterID = req.params._id;

  try {
    const commentToSubmit = {
      ...req.body,
      author: String(req.user.userName),
      authorPicture: String(req.user.userPicture),
      commentTime: new Date(Date.now()),
    };
    const encounter = await encounterModel.findOneAndUpdate(
      { _id: encounterID },
      {
        $push: { comments: commentToSubmit },
      },
      { new: true }
    );
    if (!encounter) {
      return res.status(404).json({ error: "ID not found." });
    }
    return res.status(200).json({ msg: "comment submitted", encounter });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

//delete comment
const deleteComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { commentId } = req.body;
    const encounter = await encounterModel.findByIdAndUpdate(
      _id,
      { $pull: { comments: { _id: commentId } } },
      { returnOriginal: false }
    );

    console.log("commentId :>> ", commentId);
    console.log("_id", _id);

    console.log(req.body);

    if (!encounter) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }

    res.status(200).json({
      msg: "Comment deleted successfully",
      encounter,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

//get encounters by username
const getEncountersByUserName = async (req, res) => {
  const { userName } = req.params;

  try {
    const requestedEncounters = await encounterModel.find({
      userName: userName,
    });

    if (requestedEncounters.length === 0) {
      res.status(200).json({
        msg: "no encounter found",
      });
    } else {
      res.status(200).json({
        msg: "fetch is successfull",
        number: requestedEncounters.length,
        requestedEncounters,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};

//add favourites
const addFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const encounter = await encounterModel.findOne({
      _id: req.body.encounterId,
    });

    if (encounter.favs.includes(userId)) {
      return res
        .status(400)
        .json({ message: "This encounter already in favs" });
    }

    const updatedUser = await encounterModel.findOneAndUpdate(
      { _id: req.body.encounterId },
      { $push: { favs: userId } },
      { new: true }
    );

    return res.status(200).json({ msg: "Encounter added to favs" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ msg: "Error adding encounter to favs", error: error });
  }
};

//remove favourites
const removeFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const encounter = await encounterModel.findOne({
      _id: req.body.encounterId,
    });

    const index = encounter.favs.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: "This encounter is not in favs" });
    }

    await encounterModel.updateOne(
      { _id: req.body.encounterId },
      { $pull: { favs: userId } }
    );

    return res.status(200).json({ msg: "Encounter removed from favs" });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ msg: "Error removing encounter from favs", error: error });
  }
};

//get favs by user id
const getFavsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const requestedFavs = await encounterModel.find({
      favs: {
        $elemMatch: { $eq: userId },
      },
    });

    if (requestedFavs.length === 0) {
      res.status(200).json({
        msg: "no favs found",
      });
    } else {
      res.status(200).json({
        msg: "fetch is successfull",
        number: requestedFavs.length,
        requestedFavs,
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};

export {
  getAllEncounters,
  getEncountersById,
  postEncounter,
  deleteEncounter,
  updateEncounter,
  addComment,
  deleteComment,
  getEncountersByUserName,
  addFavourite,
  removeFavourite,
  getFavsByUserId,
};
