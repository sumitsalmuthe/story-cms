const Chapter = require("../models/Chapter");
const Story = require("../models/Story");

// ===========================
// GET ALL CHAPTERS OF A STORY
// ===========================

const getChapters = async (req, res) => {
  try {

    const chapters = await Chapter.find({
      story: req.params.storyId,
    }).sort({
      chapterNumber: 1,
    });

    res.status(200).json(chapters);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ===========================
// GET SINGLE CHAPTER
// ===========================



const getChapterById = async (req, res) => {
  try {

    const chapter = await Chapter.findById(req.params.id);

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter Not Found",
      });
    }

    const story = await Story.findById(chapter.story)
      .populate("author", "username avatar");

    const previousChapter = await Chapter.findOne({
      story: chapter.story,
      chapterNumber: chapter.chapterNumber - 1,
      status: "published",
    });

    const nextChapter = await Chapter.findOne({
      story: chapter.story,
      chapterNumber: chapter.chapterNumber + 1,
      status: "published",
    });

    res.status(200).json({
      chapter,
      story,
      previousChapter,
      nextChapter,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ===========================
// CREATE CHAPTER
// ===========================

const createChapter = async (req, res) => {
  try {

    const lastChapter = await Chapter.findOne({
      story: req.body.story,
    }).sort({
      chapterNumber: -1,
    });

    const nextNumber = lastChapter
      ? lastChapter.chapterNumber + 1
      : 1;

    const chapter = await Chapter.create({
      story: req.body.story,
      chapterNumber: nextNumber,
      title: req.body.title,
      content: "",
      status: "draft",
    });

    res.status(201).json(chapter);

  } catch (error) {

    console.log("========== CREATE CHAPTER ERROR ==========");
    console.error(error);
    console.log("==========================================");

    res.status(500).json({
      message: error.message,
    });

  }
}; 

// ===========================
// UPDATE CHAPTER
// ===========================

const updateChapter = async (req, res) => {
  try {

    const chapter = await Chapter.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter Not Found",
      });
    }

    res.status(200).json(chapter);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ===========================
// DELETE CHAPTER
// ===========================

const deleteChapter = async (req, res) => {
  try {

    const chapter = await Chapter.findByIdAndDelete(
      req.params.id
    );

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter Not Found",
      });
    }

    res.status(200).json({
      message: "Chapter Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


module.exports = {
  getChapters,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
};