const express = require("express");

const router = express.Router();

const {
  getChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");


// ===========================
// GET ALL CHAPTERS OF A STORY
// ===========================

router.get(
  "/story/:storyId",
  getChapters
);


// ===========================
// GET SINGLE CHAPTER
// ===========================

router.get(
  "/:id",
  getChapterById
);


// ===========================
// CREATE CHAPTER
// ===========================

router.post(
  "/",
  protect,
  authorize("writer", "admin"),
  createChapter
);


// ===========================
// UPDATE CHAPTER
// ===========================

router.put(
  "/:id",
  protect,
  authorize("writer", "admin"),
  updateChapter
);


// ===========================
// DELETE CHAPTER
// ===========================

router.delete(
  "/:id",
  protect,
  authorize("writer", "admin"),
  deleteChapter
);

module.exports = router;