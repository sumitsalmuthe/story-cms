import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WriterLayout from "../../components/writer/WriterLayout";
import API from "../../services/api";
import AddChapterModal from "../../components/writer/AddChapterModal";
import "./StoryEditor.css";

function StoryEditor() {

  const { storyId } = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chapters, setChapters] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);

  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setContent] = useState("");

  const [showModal, setShowModal] = useState(false);

  // ===========================
  // Load Story
  // ===========================

  const loadStory = async () => {

    try {

      const res = await API.get(`/stories/${storyId}`);

      setStory(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Load Chapters
  // ===========================

  const loadChapters = async () => {

    try {

      const res = await API.get(`/chapters/story/${storyId}`);

      setChapters(res.data);

      if (
        res.data.length > 0 &&
        !selectedChapter
      ) {

        loadChapter(res.data[0]._id);

      }

    } catch (error) {

      console.log(error);

    }

  };

  // ===========================
  // Load Single Chapter
  // ===========================

  const loadChapter = async (chapterId) => {

    try {

      const res = await API.get(`/chapters/${chapterId}`);

      setSelectedChapter(res.data);

      setChapterTitle(res.data.title);

      setContent(res.data.content);

    } catch (error) {

      console.log(error);

    }

  };

  // ===========================
  // Save Draft
  // ===========================

  const handleSaveDraft = async () => {

    if (!selectedChapter) {

      alert("Please select a chapter.");

      return;

    }

    try {

      await API.put(`/chapters/${selectedChapter._id}`, {

        title: chapterTitle,

        content: content,

        status: "draft",

      });

      alert("Draft Saved Successfully");

      loadChapters();

    } catch (error) {

      console.log(error);

      alert("Failed To Save Draft");

    }

  };

  const handlePublish = async () => {

  if (!selectedChapter) {
    alert("Please select a chapter.");
    return;
  }

  try {

    await API.put(
      `/chapters/${selectedChapter._id}`,
      {
        title: chapterTitle,
        content: content,
        status: "published",
      }
    );

    alert("Chapter Published Successfully");

    loadChapter(selectedChapter._id);

    loadChapters();

  } catch (error) {

    console.log(error);

    alert("Failed to Publish");

  }

};

  // ===========================
// Word Statistics
// ===========================

const wordCount =
  content.trim() === ""
    ? 0
    : content.trim().split(/\s+/).length;

const characterCount = content.length;

const readingTime = Math.max(
  1,
  Math.ceil(wordCount / 200)
);

  useEffect(() => {

    loadStory();

    loadChapters();

  }, [storyId]);

  if (loading) {

    return (

      <WriterLayout>

        <h2
          style={{
            color: "white",
            padding: "40px",
          }}
        >
          Loading Story...
        </h2>

      </WriterLayout>

    );

  }

  return (

    <WriterLayout>

      <div className="editor-page">

        {/* Sidebar */}

        <div className="chapter-sidebar">

          <div className="chapter-header">

            <div className="story-info">

              <h1>{story?.title}</h1>

              <p>{story?.category}</p>

            </div>

            <button
              className="add-chapter-btn"
              onClick={() => setShowModal(true)}
            >
              + Add
            </button>

          </div>

          <h2 className="chapter-heading">

            Chapters

          </h2>

          <div className="chapter-list">

            {

              chapters.length === 0 ?

              (

                <p
                  style={{
                    color: "#888",
                    padding: "20px",
                  }}
                >

                  No Chapters Yet

                </p>

              )

              :

              (

                chapters.map((chapter) => (

                  <div

                    key={chapter._id}

                    className={
                      selectedChapter?._id === chapter._id
                        ? "chapter active"
                        : "chapter"
                    }

                    onClick={() =>
                      loadChapter(chapter._id)
                    }

                  >

                    <strong>

                      Chapter {chapter.chapterNumber}

                    </strong>

                    <br />

                    <small>

                      {chapter.title}

                    </small>

                  </div>

                ))

              )

            }

          </div>

        </div>

        {/* Editor */}

        <div className="editor-content">

          

          <div className="editor-top">

            <input

              type="text"

              value={chapterTitle}

              onChange={(e) =>
                setChapterTitle(e.target.value)
              }

              placeholder="Chapter Title..."

            />

            <div>

              {selectedChapter && (

  <span
    className={
      selectedChapter.status === "published"
        ? "status-badge published"
        : "status-badge draft"
    }
  >
    {selectedChapter.status}
  </span>

)}

              <button

                className="draft-btn"

                onClick={handleSaveDraft}

              >

                Save Draft

              </button>

              <button
  className="publish-btn"
  onClick={handlePublish}
>
  {selectedChapter?.status === "published"
    ? "Published ✅"
    : "Publish"}
</button>

            </div>

          </div>

          <textarea

            value={content}

            onChange={(e) =>
              setContent(e.target.value)
            }

            placeholder="Start writing your chapter..."

          />

          <div className="editor-stats">

  <span>
    Words : {wordCount}
  </span>

  <span>
    Characters : {characterCount}
  </span>

  <span>
    Reading Time : {readingTime} min
  </span>

</div>

        </div>

      </div>

      <AddChapterModal

        open={showModal}

        onClose={() => setShowModal(false)}

        storyId={storyId}

        onChapterCreated={loadChapters}

      />

    </WriterLayout>

  );

}

export default StoryEditor;