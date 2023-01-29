const mongoose = require("mongoose");

const PopularitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    views: {
      type: Intl,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Popularity", PopularitySchema);
