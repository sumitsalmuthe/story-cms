import { Link } from "react-router-dom";
import "./NavbarV2.css";

function NavbarV2() {
  return (
    <header className="navbar-v2">

      <div className="navbar-logo">

        <Link to="/">
          StoryHub
        </Link>

      </div>

      <nav className="navbar-links">

        <Link to="/">Discover</Link>

        <Link to="/category">
          Genres
        </Link>

        <Link to="/popular">
          Trending
        </Link>

        <Link to="/about">
          Community
        </Link>

        <Link to="/writer/dashboard">
          Write
        </Link>

      </nav>

      <div className="navbar-actions">

        <input
          type="text"
          placeholder="Search stories..."
          className="navbar-search"
        />

        <button className="login-btn">
          Login
        </button>

        <Link
          to="/writer/dashboard"
          className="dashboard-btn-v2"
        >
          Dashboard
        </Link>

      </div>

    </header>
  );
}

export default NavbarV2;