import "./StoryRow.css";
import StoryCard from "./StoryCard";

function StoryRow({
  title,
  stories
}) {

  return (

    <section className="story-row-v2">

      <div className="row-title">

        <h2>
          {title}
        </h2>

        <button>
          View All →
        </button>

      </div>

      <div className="story-slider">

        {stories.map((story) => (

          <StoryCard
            key={story._id}
            story={story}
          />

        ))}

      </div>

    </section>

  );

}

export default StoryRow;