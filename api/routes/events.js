const router = require("express").Router();
// const User = require("../models/User");
const Event = require("../models/Event");

//CREATE POST
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedPost = await newEvent.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get result
router.get("/:id", async (req, res) => {
  try {
    const post = await Event.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all reason
router.get("/", async (req, res) => {
  //   const username = req.query.user;
  //   const catName = req.query.cat;
  try {
    // let posts;
    // if (username) {
    //   posts = await Post.find({ username });
    // } else if (catName) {
    //   posts = await Post.find({
    //     categories: {
    //       $in: [catName],
    //     },
    //   });
    // } else {
    posts = await Event.find().sort({ createdAt: -1 });
    // }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Event.findById(req.params.id);
    try {
      await post.delete();
      res.status(200).json("Post has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
    // if (post.username === req.body.username) {
    //   try {
    //     await post.delete();
    //     res.status(200).json("Post has been deleted...");
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // } else {
    //   res.status(401).json("You can delete only your post!");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
