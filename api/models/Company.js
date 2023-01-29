const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Company", CompanySchema);
