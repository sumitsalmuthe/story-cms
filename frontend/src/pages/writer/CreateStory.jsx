import { useState } from "react";
import { useNavigate } from "react-router-dom";

import WriterLayout from "../../components/writer/WriterLayout";
import API from "../../services/api";

import "./CreateStory.css";

function CreateStory() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [cover, setCover] = useState(null);

  const [formData, setFormData] = useState({

    title: "",

    subtitle: "",

    shortDescription: "",

    category: "Fantasy",

    language: "English",

    storyType: "Fiction",

    tags: "",

    copyright: "All Rights Reserved",

    targetAudience: "Everyone",

    mature: false,

    visibility: "Public",

    status: "Draft",

    coverImage: "",

  });

  // Handle Inputs

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };

  // Cover Image

  const handleCoverChange = (e) => {

    if (e.target.files.length > 0) {

      setCover(e.target.files[0]);

    }

  };

  // Submit

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    let imageUrl = "";

    // Upload Cover First
    if (cover) {

      const imageData = new FormData();

      imageData.append("image", cover);

      const uploadRes = await API.post(
        "/upload",
        imageData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      imageUrl = uploadRes.data.url;

    }

    const payload = {

      ...formData,

      coverImage: imageUrl,

      tags: formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean),

    };

    const storyRes = await API.post(
      "/stories",
      payload
    );

    alert("Story Created Successfully");

    navigate(
      `/writer/editor/${storyRes.data._id}`
    );

  } catch (error) {

    console.log(error);

    alert("Failed to create story");

  } finally {

    setLoading(false);

  }

};

    return (
    <WriterLayout>

      <form
        className="create-story-page"
        onSubmit={handleSubmit}
      >

        {/* Header */}

        <div className="create-header">

          <div>

            <h1>Create New Story</h1>

            <p>
              Start your next masterpiece.
            </p>

          </div>

          <button
            type="submit"
            className="draft-btn"
          >
            {loading
              ? "Saving..."
              : "Save Story"}
          </button>

        </div>

        <div className="create-container">

          {/* LEFT */}

          <div className="cover-section">

            <div className="cover-preview">

              {cover ? (

                <img
                  src={URL.createObjectURL(
                    cover
                  )}
                  alt="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "16px",
                  }}
                />

              ) : (

                <span>📖</span>

              )}

            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
            />

            <p>

              Recommended Size

              <br />

              512 × 800 px

            </p>

          </div>

          {/* RIGHT */}

          <div className="story-form">

            <div className="form-group">

              <label>
                Story Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Story Title"
                required
              />

            </div>

            <div className="form-group">

              <label>
                Subtitle
              </label>

              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
              />

            </div>

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                rows={5}
                name="shortDescription"
                value={
                  formData.shortDescription
                }
                onChange={handleChange}
                placeholder="Describe your story..."
                required
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Genre
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >

                  <option>
                    Fantasy
                  </option>

                  <option>
                    Horror
                  </option>

                  <option>
                    Zombie
                  </option>

                  <option>
                    Sci-Fi
                  </option>

                  <option>
                    Romance
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Language
                </label>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >

                  <option>
                    English
                  </option>

                  <option>
                    Hindi
                  </option>

                  <option>
                    Marathi
                  </option>

                </select>

              </div>

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Story Type
                </label>

                <select
                  name="storyType"
                  value={formData.storyType}
                  onChange={handleChange}
                >

                  <option>
                    Fiction
                  </option>

                  <option>
                    Fanfic
                  </option>

                  <option>
                    Nonfiction
                  </option>

                  <option>
                    Poetry
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option>
                    Draft
                  </option>

                  <option>
                    Published
                  </option>

                </select>

              </div>

            </div>

            <div className="form-group">

              <label>
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Fantasy, Magic, Action"
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>
                  Visibility
                </label>

                <select
                  name="visibility"
                  value={
                    formData.visibility
                  }
                  onChange={handleChange}
                >

                  <option>
                    Public
                  </option>

                  <option>
                    Private
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>

                  Mature Story

                </label>

                <div
                  style={{
                    marginTop: "14px",
                  }}
                >

                  <input
                    type="checkbox"
                    name="mature"
                    checked={
                      formData.mature
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span
                    style={{
                      color: "white",
                      marginLeft: 10,
                    }}
                  >

                    18+

                  </span>

                </div>

              </div>

            </div>

            <div className="action-buttons">

              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  navigate(
                    "/writer/dashboard"
                  )
                }
              >

                Cancel

              </button>

              <button
                type="submit"
                className="continue-btn"
              >

                {loading
                  ? "Creating..."
                  : "Continue →"}

              </button>

            </div>

          </div>

        </div>

      </form>

    </WriterLayout>
  );

}

export default CreateStory;