import WriterSidebar from "./WriterSidebar";
import WriterTopbar from "./WriterTopbar";
import "./WriterLayout.css";

function WriterLayout({ children }) {
  return (
    <div className="writer-layout">

    <WriterSidebar />

    <div className="writer-main">

        <WriterTopbar />

        <div className="writer-content">

            {children}

        </div>

    </div>

</div>
  );
}

export default WriterLayout;