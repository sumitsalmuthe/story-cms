import "./HeroBanner.css";
import heroImage from "../assets/hero.png";
function HeroBanner() {
  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `
        linear-gradient(
          rgba(8,10,18,.75),
          rgba(8,10,18,.85)
        ),
        url(${heroImage})
        `,
      }}
    >
      <div className="hero-overlay">

        <div className="hero-content">

          {/* <span className="hero-tag">
            ✨ Discover Amazing Stories
          </span> */}

          <h1>

            Read Stories.
            <br />

            Share Your
            <span> Imagination.</span>

          </h1>

          <p>

            Explore thousands of original stories,
            fantasy worlds, mysteries, horror,
            romance and adventures written by
            talented writers around the world.

          </p>

          <div className="hero-buttons">

            <button className="hero-primary">
              Start Reading
            </button>

            <button className="hero-secondary">
              Become a Writer
            </button>

          </div>

        </div>

      </div>

      <div className="hero-slider">

        <span className="active"></span>

        <span></span>

        <span></span>

        <span></span>

      </div>

    </section>
  );
}

export default HeroBanner;