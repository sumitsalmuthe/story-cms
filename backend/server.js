const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const storyRoutes = require("./routes/storyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const connectDB = require("./config/db");

const chapterRoutes = require("./routes/chapterRoutes");

const authRoutes =
require("./routes/authRoutes");

const cloudinary = require("./config/cloudinary");

connectDB();

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api/stories", storyRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Story CMS Backend Running");
});

/* CLOUDINARY TEST */
app.get("/cloud-test", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (error) {
    console.dir(error, { depth: null });
    res.status(500).json(error);
  }
});

/* UPLOAD TEST */
app.get("/upload-test", async (req, res) => {
  const cloudinary = require("./config/cloudinary");

  try {

    const result =
      await cloudinary.uploader.upload(
        "https://res.cloudinary.com/demo/image/upload/sample.jpg"
      );

    res.json(result);

  } catch (error) {

    console.dir(error, { depth: null });

    res.status(500).json(error);

  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});