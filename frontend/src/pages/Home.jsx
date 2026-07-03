import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import API from "../services/api";
import Footer from "../components/layout/Footer";
import HeroBanner from "../components/HeroBanner";
import StoryRow from "../components/StoryRow";
import GenreSection from "../components/GenreSection";

import WriterBanner from "../components/WriterBanner";


import "./Home.css";

function Home() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      story.category.toLowerCase() ===
        selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">
      <Navbar />
     

  <HeroBanner />

     

      <section
  id="categories"
  className="categories"
>
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

      <GenreSection/>


<StoryRow
  title="Latest Stories"
  stories={filteredStories}
/>

  <StoryRow
  title="Popular On StoryHub"
  stories={
  [...stories]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
}
/>
<WriterBanner/>
<Footer />
    </div>

    
  );
}

export default Home;