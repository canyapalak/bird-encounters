import mongoose from "mongoose";
const { Schema } = mongoose;

const encounterSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    latitude: {
      type: String,
      required: true,
    },

    longitude: {
      type: String,
      required: true,
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
      required: true,
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
  },
  {
    versionKey: false,
  }
);

const encounterModel = mongoose.model("encounter", encounterSchema);

export default encounterModel;
