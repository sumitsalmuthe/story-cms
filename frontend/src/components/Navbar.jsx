import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

const user = getUser();

console.log(user);

const handleLogout = () => {
  logout();
  navigate("/");
};

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <Link
          to="/"
          className="logo"
        >
          StoryHub
        </Link>

        <div className="nav-links">

          <Link to="/">
            Discover
          </Link>

          <Link to="/category">
            Genres
          </Link>

          <Link to="/popular">
            Trending
          </Link>

          <Link to="/about">
            Community
          </Link>

         <Link to="/become-writer">
  Become Writer
</Link>

        </div>

      </div>

      <div className="navbar-right">

        <div className="search-box">

          <input
            type="text"
            placeholder="Search stories..."
          />

        </div>

       {user ? (

  <>
    <span
      style={{
        color: "white",
        marginRight: "15px",
        fontWeight: "600",
      }}
    >
      Hi, {user.username}
    </span>

   {user.role === "writer" || user.role === "admin" ? (

<Link
  to="/dashboard"
  className="signup-btn"
>
  Dashboard
</Link>

) : (

  <Link
    to="/become-writer"
    className="signup-btn"
  >
    Become Writer
  </Link>

)}

    <button
      className="login-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>

) : (

  <>
    <Link
      to="/login"
      className="login-btn"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="signup-btn"
    >
      Register
    </Link>
  </>

)}

      </div>

    </nav>
  );
}

export default Navbar;