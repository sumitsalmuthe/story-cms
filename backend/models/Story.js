const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    views: {
  type: Number,
  default: 0,
},

    category: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
  type: String,
  required: false,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);