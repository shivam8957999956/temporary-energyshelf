const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   // const username = req.query.user;
//   try {
//     let posts;

//     posts = await User.find().sort({ views: -1 });
//     // const { password, ...others } = posts._doc;
//     res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//update views
// router.put("/views/", async (req, res) => {
//   const username = res.query.user;
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       username,
//       {
//         $inc: { views: 1 },
//       },
//       { new: true },
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//get all user an username
router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await User.find({ username });
    } else {
      posts = await User.find().sort({ views: -1 });
    }
    // const { password, ...others } = posts._doc;
    res.status(200).json(posts);
    // res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
const socket_io = require("socket.io");
var io = socket_io();

const changeStream = User.watch();

// changeStream.on("change", (change) => {
//   console.log(change); // You could parse out the needed info and send only that data.
//   io.emit("changeData", change);
// });

// io.on("connection", function () {
//   console.log("connected");
// });

var socket = io;
module.exports = socket;

module.exports = router;
