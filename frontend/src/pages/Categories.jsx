import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import StoryCard from "../components/story/StoryCard";
import API from "../services/api";

import "./Categories.css";

function Categories() {

  const [stories, setStories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

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

  const filteredStories = stories.filter(
    (story) =>
      selectedCategory === "All" ||
      story.category.toLowerCase() ===
      selectedCategory.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <div className="categories-page">

        <section className="categories-hero">

          <h1>📚 Browse Categories</h1>

          <p>
            Explore stories by your favorite
            genres.
          </p>

        </section>

        <section className="category-buttons">

          <button
            onClick={() =>
              setSelectedCategory("All")
            }
          >
            All
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Horror")
            }
          >
            Horror
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Fantasy")
            }
          >
            Fantasy
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Zombie")
            }
          >
            Zombie
          </button>

          <button
            onClick={() =>
              setSelectedCategory("Sci-Fi")
            }
          >
            Sci-Fi
          </button>

        </section>

        <section className="category-content">

          <h2>
            {selectedCategory} Stories
          </h2>

          <div className="category-grid">

            {filteredStories.map((story) => (
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

export default Categories;