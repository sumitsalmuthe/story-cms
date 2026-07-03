import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./ReadChapter.css";

function ReadChapter() {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [story, setStory] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // ==========================
  // Load Chapter
  // ==========================

  useEffect(() => {
    const loadChapter = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/chapters/${chapterId}`);

        setChapter(res.data.chapter);
        setStory(res.data.story);
        setPreviousChapter(res.data.previousChapter);
        setNextChapter(res.data.nextChapter);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterId]);

  // ==========================
  // Reading Progress
  // ==========================

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        docHeight > 0
          ? (scrollTop / docHeight) * 100
          : 0;

      setProgress(
        Math.min(
          100,
          Math.max(0, Math.round(percentage))
        )
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="reader-loading">
        <div className="loader"></div>

        <h2>Loading Chapter...</h2>

        <p>Please wait while we prepare your reading experience.</p>
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================

  if (!chapter || !story) {
    return (
      <div className="reader-loading">
        <h2>Chapter Not Found</h2>

        <p>This chapter doesn't exist or may have been removed.</p>

        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  // ==========================
  // Reading Time
  // ==========================

  const readingTime = Math.max(
    1,
    Math.ceil((chapter.wordCount || 0) / 200)
  );

  const paragraphs = chapter.content
    ? chapter.content
        .split("\n")
        .filter((text) => text.trim() !== "")
    : [];

  return (
    <>
      {/* ==========================
          Reading Progress
      ========================== */}

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="reader-page">

        {/* ==========================
            Hero Section
        ========================== */}

        <div
          className="reader-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(10,10,10,.82), rgba(10,10,10,.96)), url(${story.coverImage})`,
          }}
        >
          <button
            className="back-btn"
            onClick={() =>
              navigate(`/story/${story._id}`)
            }
          >
            ← Back To Story
          </button>

          <div className="hero-content">

            <div className="hero-cover">
              <img
                src={story.coverImage}
                alt={story.title}
              />
            </div>

            <div className="hero-details">

              <span className="story-category">
                {story.category}
              </span>

              <h1>{story.title}</h1>

              {story.subtitle && (
                <h3>{story.subtitle}</h3>
              )}

              <p className="story-author">
                By{" "}
                <strong>
                  {story.author?.username}
                </strong>
              </p>

              <div className="story-meta">
                <div>
                  👁 {story.views} Views
                </div>

                <div>
                  🌍 {story.language}
                </div>

                <div>
                  📖 {readingTime} min read
                </div>

                <div>
                  ✍ {chapter.wordCount || 0} words
                </div>
              </div>

                            <div className="story-extra">

                <span className="story-badge">
                  {story.storyType}
                </span>

                <span className="story-badge">
                  {story.visibility}
                </span>

                <span className="story-badge">
                  {story.status}
                </span>

                {story.mature && (
                  <span className="story-badge mature">
                    Mature
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* ==========================
            Reader Container
        ========================== */}

        <div className="reader-container">

          {/* ==========================
              Chapter Card
          ========================== */}

          <div className="chapter-card">

            <div className="chapter-header">

              <span className="chapter-number">

                Chapter {chapter.chapterNumber}

              </span>

              <h2 className="chapter-title">

                {chapter.title}

              </h2>

              <div className="chapter-meta">

                <span>

                  📖 {readingTime} min read

                </span>

                <span>

                  ✍ {chapter.wordCount || 0} Words

                </span>

                <span>

                  📅{" "}

                  {new Date(
                    chapter.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            </div>

            <div className="chapter-divider"></div>

            {/* ==========================
                Story Content
            ========================== */}

            <div className="chapter-content">

              {paragraphs.length > 0 ? (

                paragraphs.map((para, index) => (

                  <p key={index}>

                    {para}

                  </p>

                ))

              ) : (

                <p>

                  No content available.

                </p>

              )}

            </div>

          </div>

          {/* ==========================
              Story Information
          ========================== */}

          <div className="story-info-card">

            <h3>

              About this Story

            </h3>

            <p>

              {story.shortDescription}

            </p>

            <div className="story-info-grid">

              <div className="info-item">

                <span className="info-title">

                  Category

                </span>

                <span className="info-value">

                  {story.category}

                </span>

              </div>

              <div className="info-item">

                <span className="info-title">

                  Language

                </span>

                <span className="info-value">

                  {story.language}

                </span>

              </div>

              <div className="info-item">

                <span className="info-title">

                  Visibility

                </span>

                <span className="info-value">

                  {story.visibility}

                </span>

              </div>

              <div className="info-item">

                <span className="info-title">

                  Status

                </span>

                <span className="info-value">

                  {story.status}

                </span>

              </div>

            </div>

          </div>

                    {/* ==========================
              Reader Navigation
          ========================== */}

          <div className="chapter-navigation">

            <div className="nav-left">

              {previousChapter ? (

                <button
                  className="nav-btn previous-btn"
                  onClick={() =>
                    navigate(`/read/${previousChapter._id}`)
                  }
                >
                  <span className="nav-arrow">←</span>

                  <div className="nav-text">

                    <small>Previous Chapter</small>

                    <strong>
                      Chapter {previousChapter.chapterNumber}
                    </strong>

                  </div>
                </button>

              ) : (

                <button
                  className="nav-btn disabled"
                  disabled
                >
                  <span className="nav-arrow">←</span>

                  <div className="nav-text">

                    <small>Beginning</small>

                    <strong>
                      No Previous Chapter
                    </strong>

                  </div>
                </button>

              )}

            </div>

            <div className="nav-center">

              <button
                className="story-btn"
                onClick={() =>
                  navigate(`/story/${story._id}`)
                }
              >
                Back To Story
              </button>

            </div>

            <div className="nav-right">

              {nextChapter ? (

                <button
                  className="nav-btn next-btn"
                  onClick={() =>
                    navigate(`/read/${nextChapter._id}`)
                  }
                >

                  <div className="nav-text right">

                    <small>Next Chapter</small>

                    <strong>
                      Chapter {nextChapter.chapterNumber}
                    </strong>

                  </div>

                  <span className="nav-arrow">→</span>

                </button>

              ) : (

                <div className="finish-card">

                  <h3>
                    🎉 You've Finished This Story
                  </h3>

                  <p>
                    Congratulations! You've reached the end
                    of this story. We hope you enjoyed
                    reading it.
                  </p>

                  <button
                    className="finish-btn"
                    onClick={() =>
                      navigate(`/story/${story._id}`)
                    }
                  >
                    Return To Story
                  </button>

                </div>

              )}

            </div>

          </div>

          {/* ==========================
              Reader Footer
          ========================== */}

          <div className="reader-footer">

            <div className="footer-line"></div>

            <p>
              Thank you for reading on
              <span className="brand-name">
                {" "}StoryHub
              </span>
            </p>

            <span className="footer-small">
              Read • Write • Inspire
            </span>

          </div>

        </div>

              </div>
    </>
  );
}

export default ReadChapter;