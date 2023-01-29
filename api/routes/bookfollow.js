const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//update
router.put("/", async (req, res) => {
  const check = req.body.check;
  //   console.log(bookm);

  if (check === "false") {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $addToSet: {
            bookmark: req.body.book,
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
            bookmark: req.body.book,
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
