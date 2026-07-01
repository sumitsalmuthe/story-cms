import "./WriterTopbar.css";
import { getUser } from "../../services/auth";
import { Link } from "react-router-dom";

function WriterTopbar() {

  const user = getUser();

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (

    <header className="writer-topbar">

      <div className="topbar-left">

        <h2>
          {greeting()},
          <span> {user?.username}</span> 👋
        </h2>

        <p>
          Welcome back to your writing studio.
        </p>

      </div>

      <div className="topbar-right">

        <div className="topbar-search">

          <input
            type="text"
            placeholder="Search stories..."
          />

        </div>

        <button className="notification-btn">
          🔔
        </button>

        <Link
          to="/writer/create"
          className="new-story-btn"
        >
          + New Story
        </Link>

        <div className="profile-circle">

          {user?.username
            ?.charAt(0)
            ?.toUpperCase()}

        </div>

      </div>

    </header>

  );

}

export default WriterTopbar;