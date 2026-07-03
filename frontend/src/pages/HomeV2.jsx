import { useEffect, useState } from "react";
import API from "../services/api";

import NavbarV2 from "../components/layout/NavbarV2";
import FooterV2 from "../components/layout/FooterV2";

import HeroV2 from "../components/hero/HeroV2";

import StoryRow from "../components/story/StoryRow";

import GenreSection from "../components/genre/GenreSection";

import WriterCTA from "../components/writer/WriterCTA";

import "./HomeV2.css";

function HomeV2() {

  const [stories, setStories] = useState([]);

  async function fetchStories() {

    try {

      const res =
        await API.get("/stories");

      setStories(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {

    fetchStories();

  }, []);

  return (

    <div className="home-v2">

      <NavbarV2 />

      <HeroV2 />

      <StoryRow
        title="🔥 Trending Stories"
        stories={
          [...stories]
            .sort((a,b)=>b.views-a.views)
            .slice(0,10)
        }
      />

      <GenreSection />

      <StoryRow
        title="✨ Latest Stories"
        stories={
          [...stories]
            .sort(
              (a,b)=>
              new Date(b.createdAt)
              -
              new Date(a.createdAt)
            )
            .slice(0,10)
        }
      />

      <StoryRow
        title="📚 Popular On StoryHub"
        stories={
          [...stories]
            .sort((a,b)=>b.views-a.views)
            .slice(0,10)
        }
      />

      <WriterCTA />

      <FooterV2 />

    </div>

  );

}

export default HomeV2;