import "./HeroV2.css";

function HeroV2() {
  return (
    <section className="hero-v2">

      <div className="hero-left">

        <span className="hero-badge">
          🔥 #1 Story Publishing Platform
        </span>

        <h1>
          Read.
          <br />
          Write.
          <br />
          <span>Inspire.</span>
        </h1>

        <p>
          Explore thousands of original stories from talented
          writers around the world. Build your audience,
          discover new worlds, and share your imagination.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Start Reading
          </button>

          <button className="secondary-btn">
            Become a Writer
          </button>

        </div>

      </div>

      <div className="hero-right">

        <div className="featured-book">

          <img
            src="https://placehold.co/340x500/1b1f2c/ffffff?text=Featured+Story"
            alt="Featured Story"
          />

        </div>

      </div>

    </section>
  );
}

export default HeroV2;