import Navbar from "../components/layout/Navbar";
import "./About.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">

        <section className="about-hero">

          <h1>About StoryHub</h1>

          <p>
            A modern platform where writers
            can publish stories and readers
            can discover amazing content.
          </p>

        </section>

        <section className="mission">

          <h2>Our Mission</h2>

          <p>
            StoryHub was created to give
            writers a simple place to share
            their stories with the world and
            help readers discover new content.
          </p>

        </section>

        <section className="features">

          <h2>What StoryHub Offers</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>📖 Read Stories</h3>
              <p>
                Explore stories from different
                categories and genres.
              </p>
            </div>

            <div className="feature-card">
              <h3>✍️ Publish Stories</h3>
              <p>
                Writers can create and manage
                stories through the dashboard.
              </p>
            </div>

            <div className="feature-card">
              <h3>🔍 Search Stories</h3>
              <p>
                Quickly find stories using
                search and category filters.
              </p>
            </div>

            <div className="feature-card">
              <h3>⚡ Fast Experience</h3>
              <p>
                Built using modern MERN
                technologies.
              </p>
            </div>

          </div>

        </section>

        <section className="tech-stack">

          <h2>Technology Stack</h2>

          <div className="stack-grid">

            <div>React</div>
            <div>Node.js</div>
            <div>Express.js</div>
            <div>MongoDB Atlas</div>

          </div>

        </section>

        <section className="developer">

          <h2>Developer</h2>

          <p>
            Designed and developed by
            Sumit Salmuthe using the
            MERN Stack.
          </p>

        </section>

      </div>
    </>
  );
}

export default About;