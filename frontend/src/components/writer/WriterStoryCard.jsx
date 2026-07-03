import "./StoryCard.css";

function StoryCard({ story }) {
  return (
    <div className="writer-story-card">

      <img
        src={story.cover}
        alt={story.title}
        className="story-cover"
      />

      <div className="story-content">

        <div className="story-top">

          <div>
            <h2>{story.title}</h2>

            <p className="story-category">
              {story.category}
            </p>
          </div>

          <span
            className={
              story.status === "Published"
                ? "status published"
                : "status draft"
            }
          >
            {story.status}
          </span>

        </div>

        <p className="story-description">
          {story.description}
        </p>

        <div className="story-stats">

          <span>👁 {story.views}</span>

          <span>❤️ {story.likes}</span>

          <span>📖 {story.chapters} Chapters</span>

        </div>

        <div className="story-actions">

          <button className="edit-btn">
            Edit
          </button>

          <button className="continue-btn">
            Continue Writing
          </button>

          <button className="delete-btn">
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default StoryCard;