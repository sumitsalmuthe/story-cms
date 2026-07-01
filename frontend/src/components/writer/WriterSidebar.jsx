import { NavLink, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/auth";
import "./WriterSidebar.css";

function WriterSidebar() {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <aside className="writer-sidebar">

      <div>

        <div className="sidebar-logo">
          <h2>StoryHub</h2>
          <p>Writer Studio</p>
        </div>

        <span className="sidebar-title">
          MAIN MENU
        </span>

        <nav className="sidebar-nav">

          <NavLink
            to="/writer/dashboard"
            className="sidebar-link"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/writer/create"
            className="sidebar-link"
          >
            Create Story
          </NavLink>

          <NavLink
            to="/writer/stories"
            className="sidebar-link"
          >
            My Stories
          </NavLink>

          <NavLink
            to="/writer/drafts"
            className="sidebar-link"
          >
            Drafts
          </NavLink>

          <NavLink
            to="/writer/analytics"
            className="sidebar-link"
          >
            Analytics
          </NavLink>

          <NavLink
            to="/writer/settings"
            className="sidebar-link"
          >
            Settings
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">

        <div className="writer-profile">

          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h4>{user?.username}</h4>

            <p>{user?.role}</p>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default WriterSidebar;