import "./StoryCardV2.css";
import { Link } from "react-router-dom";

function StoryCardV2({ story }) {

  const readingTime = Math.max(
    1,
    Math.ceil(
      (story.content?.split(" ").length || 0) / 200
    )
  );

  return (

    <Link
      to={`/story/${story._id}`}
      className="story-card-v2-link"
    >

      <div className="story-card-v2">

        <div className="story-cover">

          <img
            src={
              story.coverImage ||
              "https://placehold.co/400x600/111827/ffffff?text=StoryHub"
            }
            alt={story.title}
          />

          <div className="story-gradient"></div>

          <span className="genre">
            {story.category}
          </span>

        </div>

        <div className="story-body">

          <h3>
            {story.title}
          </h3>

          <p>
            {story.shortDescription}
          </p>

          <div className="story-footer">

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

export default StoryCardV2;