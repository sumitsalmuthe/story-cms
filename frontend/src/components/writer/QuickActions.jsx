import { Link } from "react-router-dom";
import "./QuickActions.css";

function QuickActions() {
  return (
    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="quick-grid">

        <Link
          to="/writer/create"
          className="quick-card"
        >
          <div className="quick-icon">✍️</div>

          <h3>Create Story</h3>

          <p>
            Start writing a brand new story.
          </p>
        </Link>

        <Link
          to="/writer/stories"
          className="quick-card"
        >
          <div className="quick-icon">📚</div>

          <h3>My Stories</h3>

          <p>
            View and manage all your stories.
          </p>
        </Link>

        <Link
          to="/writer/drafts"
          className="quick-card"
        >
          <div className="quick-icon">📝</div>

          <h3>Drafts</h3>

          <p>
            Continue writing unfinished chapters.
          </p>
        </Link>

        <Link
          to="/writer/analytics"
          className="quick-card"
        >
          <div className="quick-icon">📈</div>

          <h3>Analytics</h3>

          <p>
            Check views, readers and engagement.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default QuickActions;