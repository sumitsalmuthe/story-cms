import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import API from "../services/api";

import "./Popular.css";

function Popular() {
  const [stories, setStories] = useState([]);

  async function fetchStories() {
    try {
      const res = await API.get("/stories");
      setStories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <>
      <Navbar />

      <div className="popular-page">

        <section className="popular-hero">
          <h1>🔥 Popular Stories</h1>

          <p>
            Discover the most loved and
            trending stories on StoryHub.
          </p>
        </section>

        <section className="popular-content">

          <h2>Trending This Week</h2>

          <div className="popular-grid">

            {stories.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
              />
            ))}

          </div>

        </section>

      </div>
    </>
  );
}

export default Popular;