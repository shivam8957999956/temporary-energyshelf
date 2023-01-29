const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//upadte likes
router.put("/like/:id", async (req, res) => {
  if (req.body.check === "false") {
    try {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $addToSet: { liked: req.body.likes },
          },
          { new: true },
        );
        const updatedUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $inc: { totalLikes: 1 },
          },
          { new: true },
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $pull: { liked: req.body.likes },
          },
          { new: true },
        );
        const updatedUser = await User.findByIdAndUpdate(
          req.body.userId,
          {
            $inc: { totalLikes: -1 },
          },
          { new: true },
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
//update Bookmark
router.put("/bookmark/:id", async (req, res) => {
  if (req.body.check === "false") {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $addToSet: { bookmark: req.body.bookmark },
            },
            { new: true },
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { bookmark: req.body.bookmark },
            },
            { new: true },
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username || req.body.username === "MTP") {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const admin = req.query.admin;
  const catName = req.query.cat;
  const sortName = req.query.sort;
  const title = req.query.title;
  const editor = req.query.editor;
  const quiz = req.query.quiz;

  const s = "createdAt";

  try {
    let posts;
    if (admin) {
      if (sortName) {
        posts = await Post.find({ admin }).sort({ createdAt: -1 });
        // console.log(sort);
      } else posts = await Post.find({ admin }).sort({ createdAt: -1 });
    } else if (username) {
      if (sortName) {
        posts = await Post.find({ username }).sort({ createdAt: -1 });
        // console.log(sort);
      } else posts = await Post.find({ username }).sort({ createdAt: -1 });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).sort({ createdAt: -1 });
    } else if (title) {
      posts = await Post.find({
        title: { $regex: title, $options: "$i" },
      }).sort({ createdAt: -1 });
    } else if (editor) {
      posts = await Post.find({
        editor: { $eq: editor },
      }).sort({ createdAt: -1 });
    } else if (quiz) {
      posts = await Post.find({
        quiz: { $eq: quiz },
      }).sort({ createdAt: -1 });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/trend/", async (req, res) => {
  try {
    let posts;

    posts = await Post.find().sort({ views: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
