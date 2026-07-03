import "./HeroBanner.css";
import heroImage from "../../assets/hero.png";

function HeroBanner() {
  const tags = [
    "Fantasy",
    "Zombie",
    "Sci-Fi",
    "Romance",
    "Mystery",
    "Adventure",
  ];

  const stats = [
    {
      value: "1500+",
      label: "Stories",
    },
    {
      value: "40K+",
      label: "Readers",
    },
    {
      value: "500K+",
      label: "Views",
    },
  ];

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(6,8,15,.82),
            rgba(6,8,15,.92)
          ),
          url(${heroImage})
        `,
      }}
    >
      <div className="hero-overlay">

        <div className="hero-left">

          <span className="hero-badge">
            ✨ StoryHub • Read • Write • Inspire
          </span>

          <h1>
            Read Stories.
            <br />
            Share Your
            <span> Imagination.</span>
          </h1>

          <p>
            Discover thousands of original stories from
            talented writers around the world.
            Explore fantasy, horror, romance,
            mystery, zombie adventures and much more —
            all in one place.
          </p>

          <div className="hero-buttons">

            <button className="hero-primary">
              📖 Start Reading
            </button>

            <button className="hero-secondary">
              ✍ Become a Writer
            </button>

          </div>

          <div className="hero-stats">

            {stats.map((item, index) => (

              <div
                className="stat-card"
                key={index}
              >

                <h2>{item.value}</h2>

                <p>{item.label}</p>

              </div>

            ))}

          </div>

        </div>

        <div className="hero-right">

          <div className="hero-glass-card">

            <img
              src={heroImage}
              alt="StoryHub"
              className="featured-cover"
            />

            <div className="featured-content">

              <span className="featured-tag">
                🔥 Featured Story
              </span>

              <h3>
                The World Beyond Darkness
              </h3>

              <p>
                Enter a world where every choice
                changes destiny.
              </p>

              <div className="featured-meta">

                <span>👁 128K</span>

                <span>⭐ 4.9</span>

                <span>📚 Fantasy</span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="hero-bottom">

        <div className="hero-tags">

          {tags.map((tag) => (

            <span
              key={tag}
              className="hero-tag"
            >
              {tag}
            </span>

          ))}

        </div>

        <div className="scroll-indicator">

          <span className="mouse">

            <span className="wheel"></span>

          </span>

          <p>Scroll Down</p>

        </div>

      </div>

    </section>
  );
}

export default HeroBanner;