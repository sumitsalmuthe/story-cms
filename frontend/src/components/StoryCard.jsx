import "./StoryCard.css";
import { Link } from "react-router-dom";

function StoryCard({ story }) {

  const readingTime = Math.max(
    1,
    Math.ceil(
      (story.content?.split(" ").length || 0) / 200
    )
  );

  return (

    <Link
      to={`/story/${story._id}`}
      className="story-card-link"
    >

      <div className="story-card">

        <div className="story-image-box">

          <img
            src={
              story.coverImage ||
              "https://placehold.co/400x600/1e293b/ffffff?text=StoryHub"
            }
            alt={story.title}
            className="story-image"
          />

          <div className="story-overlay">

            <span className="story-category">
              {story.category}
            </span>

          </div>

        </div>

        <div className="story-info">

          <h3>{story.title}</h3>

          <p>
            {story.shortDescription}
          </p>

          <div className="story-meta">

            <span>
              👁 {story.views || 0}
            </span>

            <span>
              📖 {readingTime} min
            </span>

          </div>

        </div>

      </div>

    </Link>

  );

}

export default StoryCard;