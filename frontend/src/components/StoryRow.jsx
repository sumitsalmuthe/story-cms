import "./StoryRow.css";
import StoryCard from "./StoryCard";

function StoryRow({ title, stories }) {

  return (

    <section className="story-row">

      <div className="row-header">

        <h2>{title}</h2>

        <button>
          View All
        </button>

      </div>

      <div className="row-content">

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