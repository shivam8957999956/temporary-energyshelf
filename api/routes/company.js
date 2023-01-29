const router = require("express").Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
  const newCom = new Company(req.body);
  try {
    const savedCom = await newCom.save();
    res.status(200).json(savedCom);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const coms = await Company.find();
    res.status(200).json(coms);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
