const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Popularity = require("../models/Popularity");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Popularity(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get All posts
router.get("/", async (req, res) => {
  const s = "createdAt";
  const username = req.query.user;
  const today = req.query.today;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ views: -1 }).limit(10);
    } else if (today) {
      posts = await Post.find({
        categories: {
          $in: [today],
        },
      })
        .sort({ views: -1 })
        .limit(6);
    } else posts = await Post.find().sort({ views: -1 }).limit(10);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//all
router.get("/all", async (req, res) => {
  const s = "createdAt";
  const username = req.query.user;
  const today = req.query.today;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ views: -1 });
    } else if (today) {
      posts = await Post.find({
        categories: {
          $in: [today],
        },
      }).sort({ views: -1 });
    } else posts = await Post.find().sort({ views: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/likes", async (req, res) => {
  const s = "createdAt";
  const username = req.query.user;
  const today = req.query.today;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username }).sort({ liked: -1 }).limit(6);
    } else if (today) {
      posts = await Post.find({
        categories: {
          $in: [today],
        },
      })
        .sort({ liked: -1 })
        .limit(6);
    } else posts = await Post.find().sort({ liked: -1 }).limit(6);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE popularity
router.put("/", async (req, res) => {
  const username = req.query.user;
  try {
    const updatedPost = await Popularity.findOneAndUpdate(
      username,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET POST
// router.get("/", async (req, res) => {
//   try {
//     const post = await Popularity.find().sort({ views: -1 });
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL POSTS

module.exports = router;
