const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const post = await Category.findById(req.params.id);
    // if (post.username === req.body.username || req.body.username === "MTP") {
    try {
      await post.delete();
      res.status(200).json("category has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
    // } else {
    //   res.status(401).json("You can delete only your post!");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE category
router.put("/:id", async (req, res) => {
  const cat = await Category.findById(req.params.id);
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true },
    );
    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const cat = await Category.findById(req.params.id);
  try {
    await cat.delete();
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
