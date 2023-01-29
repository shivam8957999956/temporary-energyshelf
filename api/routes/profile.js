const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await User.find({ username });
    } else {
      const regex = new RegExp(username, "i");
      posts = await User.find({
        username: { $regex: username, $options: "$i" },
      });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/search/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;

    const regex = new RegExp(username, "i");
    posts = await User.find({
      username: { $regex: username, $options: "$i" },
    }).sort({ username: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/views/:id", async (req, res) => {
  const username = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      username,
      {
        $inc: { views: 1 },
      },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/liked/:id", async (req, res) => {
  const username = req.params.id;
  if (req.body.check === "false") {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        username,
        {
          $inc: { likes: 1 },
        },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        username,
        {
          $dec: { likes: 1 },
        },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
router.get("/views", async (req, res) => {
  const s = "createdAt";

  try {
    let posts;

    posts = await User.find().sort({ views: -1 }).limit(5);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/likes", async (req, res) => {
  const s = "createdAt";

  try {
    let posts;
    posts = await User.find().sort({ totalLikes: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/follow", async (req, res) => {
  const check = req.body.check;
  //   console.log(bookm);
  const follower = req.body.follower;
  const userId = req.body.userId;

  if (check === "false") {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $addToSet: {
            followers: follower,
          },
        },
        { new: true },
      );
      // console.log(book);
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $pull: {
            followers: follower,
          },
        },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
