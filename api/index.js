const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const bookRoute = require("./routes/bookfollow");
const postRoute = require("./routes/posts");
const cateRoute = require("./routes/category");
const compRoute = require("./routes/company");
const profileRoute = require("./routes/profile");
const eventRoute = require("./routes/events");
const popularityRoute = require("./routes/popularity");
const commentRoute = require("./routes/comment");
const multer = require("multer");
const path = require("path");
const app = express();

dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookfollow", bookRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", cateRoute);
app.use("/api/company", compRoute);
app.use("/api/profile", profileRoute);
app.use("/api/comment", commentRoute);
app.use("/api/event", eventRoute);
app.use("/api/popularity", popularityRoute);

// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("backend Is running");
});
