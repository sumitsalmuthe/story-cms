const Story = require("../models/Story");
const Chapter = require("../models/Chapter");

// GET ALL STORIES

// ===========================
// GET ALL STORIES
// ===========================

const getStories = async (req, res) => {
  try {

    const stories = await Story.find()
      .populate("author", "username avatar")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(stories);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getStoryById = async (req, res) => {
  try {

   

    const story = await Story.findById(
      req.params.id
    ).populate(
      "author",
      "username avatar bio"
    );

    if (!story) {
      return res.status(404).json({
        message: "Story Not Found",
      });
    }

    story.views += 1;

    await story.save();

    const chapters = await Chapter.find({
      story: story._id,
      status: "published",
    }).sort({
      chapterNumber: 1,
    });

    res.json({
      story,
      chapters,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// CREATE STORY

const createStory = async (req, res) => {
  try {

    const story = await Story.create({

      title: req.body.title,

      subtitle: req.body.subtitle,

      shortDescription:
        req.body.shortDescription,

      coverImage:
        req.body.coverImage,

      category:
        req.body.category,

      language:
        req.body.language,

      storyType:
        req.body.storyType,

      tags:
        req.body.tags,

      copyright:
        req.body.copyright,

      targetAudience:
        req.body.targetAudience,

      mature:
        req.body.mature,

      status:
        req.body.status,

      visibility:
        req.body.visibility,

      author: req.user._id,

    });

    res.status(201).json(story);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE STORY
const updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE STORY
const deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Story Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory,
    getStoryById
}