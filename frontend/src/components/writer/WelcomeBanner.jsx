import { Link } from "react-router-dom";
import { getUser } from "../../services/auth";
import "./WelcomeBanner.css";

function WelcomeBanner() {

  const user = getUser();

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (

    <section className="welcome-banner">

      <div>

        <h1>
          {greeting()},
          <span> {user?.username}</span> 👋
        </h1>

        <p>
          Continue writing your amazing stories and
          inspire thousands of readers around the world.
        </p>

      </div>

      <div className="welcome-buttons">

        <Link
          to="/writer/create"
          className="welcome-primary"
        >
          + Create Story
        </Link>

        <Link
          to="/writer/stories"
          className="welcome-secondary"
        >
          My Stories
        </Link>

      </div>

    </section>

  );

}

export default WelcomeBanner;