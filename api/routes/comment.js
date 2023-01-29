const router = require("express").Router();
const User = require("../models/User");
const Comment = require("../models/Comment");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Comment(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post
router.get("/", async (req, res) => {
  const postId = req.query.postId;
  try {
    let posts;
    if (postId) {
      posts = await Comment.find({ postId }).sort({ createdAt: -1 });
    } else {
      posts = await Comment.find().sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const username = req.params.id;
  try {
    const updatedUser = await Comment.findByIdAndUpdate(
      username,
      {
        $addToSet: { totalReport: req.body.reportUser },
      },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Comment.findById(req.params.id);

    await post.delete();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
