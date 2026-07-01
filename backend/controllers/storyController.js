const Story = require("../models/Story");

// GET ALL STORIES
const getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({
      createdAt: -1,
    });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE STORY
const createStory = async (req, res) => {
  try {
    const story = await Story.create(req.body);

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

const getStoryById = async (req, res) => {
  try {

    const story = await Story.findById(
      req.params.id
    );

    if (!story) {
      return res.status(404).json({
        message: "Story Not Found",
      });
    }

    story.views += 1;

    await story.save();

    res.json(story);

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
};