import "./StoryRowV2.css";
import StoryCardV2 from "./StoryCardV2";

function StoryRowV2({
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

          <StoryCardV2
            key={story._id}
            story={story}
          />

        ))}

      </div>

    </section>

  );

}

export default StoryRowV2;