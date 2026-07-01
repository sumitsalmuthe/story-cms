const express = require("express");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Upload Started");

    const result = await cloudinary.uploader.upload(
      req.body.image,
      {
        resource_type: "image",
      }
    );

    console.log("Upload Success");
    console.log(result);

    res.json({
      url: result.secure_url,
    });

  } catch (error) {

    console.log("========== CLOUDINARY ERROR ==========");
    console.dir(error, { depth: null });
    console.log("=====================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;