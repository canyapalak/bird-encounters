import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterSchema = new Schema({
  username: {
    type: String,
    default: "test",
  },

  latitude: {
    type: Number,
    required: false,
    default: 35,
  },

  longitude: {
    type: Number,
    required: false,
    default: 15,
  },

  experience: {
    type: String,
    required: true,
  },

  province: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  species: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: "2022-09-16T11:30:00.000+00:00",
    required: false,
  },

  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: null,
  },

  posttime: {
    type: Date,
  },

  favs: {
    type: Number,
    default: 0,
  },

  record: {
    type: String,
    default: null,
  },
});

const encounterModel = mongoose.model("encounter", encounterSchema);

export default encounterModel;
