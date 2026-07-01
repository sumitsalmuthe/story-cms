const express = require("express");

const {
  getStories,
  createStory,
   updateStory,
  deleteStory,
  getStoryById,
} = require("../controllers/storyController");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get("/", getStories);

router.get("/:id", getStoryById);

router.post(
  "/",
  protect,
  authorize("writer", "admin"),
  createStory
);

router.put(
  "/:id",
  protect,
  authorize("writer", "admin"),
  updateStory
);

router.delete(
  "/:id",
  protect,
  authorize("writer", "admin"),
  deleteStory
);

module.exports = router;