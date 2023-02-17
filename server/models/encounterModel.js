import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterSchema = new Schema({
  username: { type: String },
  coordinates: {
    latitude: {
      type: String,
      required: true,
    },

    longitude: {
      type: String,
      required: true,
    },
  },

  experience: {
    type: String,
    required: true,
  },

  location: {
    area: {
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
  },

  species: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    default: null,
  },

  title: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: null,
  },

  posttime: { type: Date },
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
