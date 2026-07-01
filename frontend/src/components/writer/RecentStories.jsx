import "./RecentStories.css";

function RecentStories() {

  const stories = [
    {
      title: "Under a Dead Sky",
      genre: "Zombie",
      chapter: "Chapter 7",
      updated: "2 Hours Ago",
      progress: "82%",
    },
    {
      title: "The Last Kingdom",
      genre: "Fantasy",
      chapter: "Chapter 3",
      updated: "Yesterday",
      progress: "45%",
    },
  ];

  return (

    <section className="recent-stories">

      <div className="recent-header">

        <h2>Continue Writing</h2>

        <button className="view-all-btn">
          View All
        </button>

      </div>

      {stories.map((story, index) => (

        <div
          className="recent-card"
          key={index}
        >

          <div className="recent-left">

            <div className="cover-placeholder">
              📖
            </div>

            <div>

              <h3>{story.title}</h3>

              <p>
                {story.genre}
              </p>

              <span>
                {story.chapter} • Updated {story.updated}
              </span>

            </div>

          </div>

          <div className="recent-right">

            <div className="progress-text">

              {story.progress}

            </div>

            <button>
              Continue
            </button>

          </div>

        </div>

      ))}

    </section>

  );

}

export default RecentStories;