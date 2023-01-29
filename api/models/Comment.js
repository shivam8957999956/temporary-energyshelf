const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    replyText: {
      type: String,
      default: "",
    },
    replyTo: {
      type: String,
      default: "",
    },
    replyUser: {
      type: String,
      default: "",
    },
    Report: {
      type: Intl,
      default: 0,
    },
    totalReport: {
      type: [String],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comment", CommentSchema);
