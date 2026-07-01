import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { saveUser } from "../services/auth";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      saveUser(res.data);

      alert("Registration Successful 🎉");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="register-page">

      <div className="register-left">

        <h1>Join StoryHub</h1>

        <p>
          Create your account and start
          reading, writing and sharing
          amazing stories with the world.
        </p>

      </div>

      <div className="register-card">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span>Login</span>
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;