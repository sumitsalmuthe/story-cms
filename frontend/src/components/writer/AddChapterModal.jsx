import { useState } from "react";
import API from "../../services/api";
import "./AddChapterModal.css";

function AddChapterModal({
  open,
  onClose,
  storyId,
  onChapterCreated,
}) {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);

  if (!open) return null;

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter chapter title.");
      return;
    }

    try {
      setCreating(true);

      await API.post("/chapters", {
  story: storyId,
  title: title,
});

      setTitle("");

      onChapterCreated?.();

      onClose();

    } catch (error) {
      console.log(error);
      alert("Failed to create chapter");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="chapter-modal-overlay">

      <div className="chapter-modal">

        <h2>Create New Chapter</h2>

        <p>
          Give your chapter a title.
        </p>

        <input
          type="text"
          placeholder="Chapter Title..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-modal-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="create-modal-btn"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating
              ? "Creating..."
              : "Create Chapter"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddChapterModal;