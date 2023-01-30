const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: "Student",
    },
    views: {
      type: Intl,
      default: 0,
    },
    totalLikes: {
      type: Intl,
      default: 0,
    },
    followers: {
      type: [String],
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png",
    },
    bookmark: {
      type: [String],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    faculty: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
