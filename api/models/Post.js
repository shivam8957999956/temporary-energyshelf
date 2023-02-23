const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    likes: {
      type: Intl,
      default: 0,
    },
    views: {
      type: Intl,
      default: 0,
    },
    view: {
      type: Intl,
      default: 0,
    },
    editor: {
      type: Boolean,
      default: false,
    },
    quiz: {
      type: Boolean,
      default: false,
    },
    bookmark: {
      type: [String],
    },
    liked: {
      type: [String],
    },
    report: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", PostSchema);
