import WriterLayout from "../../components/writer/WriterLayout";
import "./MyStories.css";

const stories = [
  {
    title: "Under a Dead Sky",
    genre: "Zombie",
    status: "Published",
    views: "12.5K",
    chapters: 18,
  },
  {
    title: "Gods Eye",
    genre: "Fantasy",
    status: "Draft",
    views: "4.2K",
    chapters: 7,
  },
  {
    title: "11:06:33",
    genre: "Horror",
    status: "Published",
    views: "21K",
    chapters: 24,
  },
];

function MyStories() {
  return (
    <WriterLayout>

      <div className="stories-page">

        <div className="stories-header">

          <h1>My Stories</h1>

          <button>Create Story</button>

        </div>

        <div className="story-list">

          {stories.map((story, index) => (

            <div
              key={index}
              className="story-item"
            >

              <div>

                <h2>{story.title}</h2>

                <p>
                  {story.genre} • {story.chapters} Chapters
                </p>

              </div>

              <div className="story-right">

                <span>{story.views}</span>

                <span>{story.status}</span>

                <button>Edit</button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </WriterLayout>
  );
}

export default MyStories;