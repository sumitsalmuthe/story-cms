import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import StoryCard from "../components/StoryCard";

import API from "../services/api";

import "./StoryDetails.css";

function StoryDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [story, setStory] = useState(null);

  const [chapters, setChapters] = useState([]);

  const [relatedStories, setRelatedStories] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Story
  // ==========================

  const fetchStory = async () => {

    try {

      setLoading(true);

      const res = await API.get(`/stories/${id}`);

      setStory(res.data.story);

      setChapters(res.data.chapters);

      const allStories = await API.get("/stories");

      const related = allStories.data.filter(
        (item) =>
          item.category === res.data.story.category &&
          item._id !== res.data.story._id
      );

      setRelatedStories(related.slice(0,4));

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

    }

  };

  useEffect(() => {

    fetchStory();

  },[id]);

  // ==========================
  // Loading
  // ==========================

  if(loading){

    return(

      <>
      <Navbar/>

      <div className="story-loading">

        <div className="loader"></div>

        <h2>Loading Story...</h2>

      </div>

      </>

    );

  }

  if(!story){

    return(

      <>
      <Navbar/>

      <div className="story-loading">

        <h2>Story Not Found</h2>

      </div>

      </>

    );

  }

  const readingTime = Math.max(
    1,
    chapters.length
  );

  return(

    <>

    <Navbar/>

    <div className="story-page">

      {/* HERO */}

      <div
        className="story-hero"
        style={{
          backgroundImage:
          `linear-gradient(rgba(10,10,10,.82),rgba(10,10,10,.96)),url(${story.coverImage})`
        }}
      >

        <div className="hero-content">

          {/* COVER */}

          <div className="hero-cover">

            <img

              src={story.coverImage}

              alt={story.title}

            />

          </div>

          {/* DETAILS */}

          <div className="hero-details">

            <span className="category-pill">

              {story.category}

            </span>

            <h1>

              {story.title}

            </h1>

            {story.subtitle && (

              <h3>

                {story.subtitle}

              </h3>

            )}

            <p className="author-name">

              By

              <strong>

                {" "}

                {story.author?.username}

              </strong>

            </p>

            <div className="story-stats">

              <div>

                👁 {story.views} Views

              </div>

              <div>

                📚 {chapters.length} Chapters

              </div>

              <div>

                ⏱ {readingTime} hr Read

              </div>

              <div>

                🌎 {story.language}

              </div>

            </div>

            <div className="hero-buttons">

              {chapters.length > 0 && (

                <button

                  className="read-btn"

                  onClick={()=>

                    navigate(`/read/${chapters[0]._id}`)

                  }

                >

                  📖 Start Reading

                </button>

              )}

              <button className="bookmark-btn">

                🔖 Bookmark

              </button>

              <button className="like-btn">

                ❤️ Like

              </button>

              <button className="share-btn">

                📤 Share

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="story-container">

        {/* ABOUT */}

        <div className="about-card">

          <h2>

            About This Story

          </h2>

          <p>

            {story.shortDescription}

          </p>

        </div>

                {/* ==========================
            Author Card
        ========================== */}

        <div className="author-card">

          <div className="author-avatar">

            {story.author?.username?.charAt(0).toUpperCase() || "A"}

          </div>

          <div className="author-info">

            <h3>

              {story.author?.username}

            </h3>

            <p>

              Passionate storyteller creating immersive worlds for readers.

            </p>

          </div>

        </div>

        {/* ==========================
            Table Of Contents
        ========================== */}

        <div className="toc-card">

          <h2>

            Table Of Contents

          </h2>

          {chapters.length === 0 ? (

            <div className="empty-chapters">

              No Published Chapters Yet.

            </div>

          ) : (

            chapters.map((chapter) => (

              <div
                key={chapter._id}
                className="chapter-item"
                onClick={() =>
                  navigate(`/read/${chapter._id}`)
                }
              >

                <div className="chapter-left">

                  <span className="chapter-pill">

                    Chapter {chapter.chapterNumber}

                  </span>

                  <h3>

                    {chapter.title}

                  </h3>

                </div>

                <button
                  className="chapter-read-btn"
                >

                  Read →

                </button>

              </div>

            ))

          )}

        </div>

        {/* ==========================
            Related Stories
        ========================== */}

        {relatedStories.length > 0 && (

          <div className="related-section">

            <h2>

              You May Also Like

            </h2>

            <div className="related-grid">

              {relatedStories.map((item) => (

                <StoryCard
                  key={item._id}
                  story={item}
                />

              ))}

            </div>

          </div>

        )}

        {/* ==========================
            Footer
        ========================== */}

        <div className="story-footer">

          <div className="footer-divider"></div>

          <h3>

            Thank You For Reading ❤️

          </h3>

          <p>

            Continue exploring thousands of stories on

            <span className="brand">

              {" "}StoryHub

            </span>

          </p>

        </div>

      </div>

    </div>

    </>

  );

}

export default StoryDetails;