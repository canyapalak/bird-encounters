import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: String,
    required: true,
  },

  authorPicture: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  commentTime: {
    type: Date,
    required: true,
  },
});

const encounterSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    userPicture: {
      type: String,
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

    favs: [
      {
        type: String,
      },
    ],

    record: {
      type: String,
      default: null,
    },

    comments: [commentSchema],
  },
  {
    versionKey: false,
  }
);

const encounterModel = mongoose.model("encounter", encounterSchema);

export default encounterModel;
