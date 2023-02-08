import encounterModel from "../models/encounterModel.js";

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
export { getAllEncounters, getEncountersById };
