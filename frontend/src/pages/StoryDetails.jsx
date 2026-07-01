import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";
import "./StoryDetails.css";
import StoryCard from "../components/StoryCard";

function StoryDetails() {
  const { id } = useParams();

  const [story, setStory] = useState(null);

  const [relatedStories, setRelatedStories] = useState([]);

 

async function fetchStory() {
  try {

    const res = await API.get(
      `/stories/${id}`
    );

    setStory(res.data);

    const allStories =
      await API.get("/stories");

    const related =
      allStories.data.filter(
        (item) =>
          item.category ===
            res.data.category &&
          item._id !==
            res.data._id
      );

    setRelatedStories(
      related.slice(0, 3)
    );

  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    fetchStory();
  }, [id]);


 if (!story) {
  return (
    <>
      <Navbar />
      <div className="loading">
        <h2>Loading Story...</h2>
      </div>
    </>
  );
}

  const readingTime = Math.max(
  1,
  Math.ceil(
    story.content.split(" ").length / 200
  )
);

  return (
    <>
      <Navbar />

    <div className="story-details">

{story.coverImage && (
  <img
    src={story.coverImage}
    alt={story.title}
    className="story-cover"
  />
)}

  <div className="story-info">

    <span className="story-category">
      {story.category}
    </span>

    <h1 className="story-title">
      {story.title}
    </h1>

    <div className="story-meta">

  <span>
    👁 {story.views} Views
  </span>

  <span>
    📖 {readingTime} min read
  </span>

  <span>
    📅 {new Date(story.createdAt).toLocaleDateString()}
  </span>

</div>

    <p className="story-description">
      {story.shortDescription}
    </p>

    <div className="story-content">
      {story.content}
    </div>

    {relatedStories.length > 0 && (
      <>
        <hr style={{ margin: "60px 0" }} />

        <h2>Related Stories</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {relatedStories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
            />
          ))}
        </div>
      </>
    )}

  </div>

</div>
</>
  );
}

export default StoryDetails;