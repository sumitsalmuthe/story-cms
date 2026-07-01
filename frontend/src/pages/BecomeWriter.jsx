import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { becomeWriter } from "../services/auth";
import "./BecomeWriter.css";

function BecomeWriter() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    penName: "",
    bio: "",
    genre: "",
    country: "",
    language: "",
    agree: false,
  });

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.agree) {

      alert(
        "Please accept StoryHub Guidelines."
      );

      return;

    }

    try {

      await becomeWriter();

      alert(
        "🎉 Congratulations! You are now a Writer."
      );

      navigate("/dashboard");

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return (

    <div className="writer-page">

      <div className="writer-card">

        <h1>
          Become a StoryHub Writer
        </h1>

        <p>
          Share your imagination with
          millions of readers around the
          world.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="penName"
            placeholder="Pen Name"
            value={formData.penName}
            onChange={handleChange}
          />

          <textarea
            name="bio"
            placeholder="Short Bio"
            value={formData.bio}
            onChange={handleChange}
          />

          <input
            type="text"
            name="genre"
            placeholder="Favorite Genre"
            value={formData.genre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
          />

          <label className="agree">

            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />

            I agree to StoryHub Guidelines

          </label>

          <button type="submit">

            Become Writer

          </button>

        </form>

      </div>

    </div>

  );

}

export default BecomeWriter;