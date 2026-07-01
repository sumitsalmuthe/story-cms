import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { saveUser } from "../services/auth";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );

      saveUser(res.data);

      alert("Login Successful 🎉");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-left">

        <h1>Welcome Back</h1>

        <p>
          Continue reading your favorite
          stories and connect with StoryHub.
        </p>

      </div>

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>

        <p>

          Don't have an account?

          <Link to="/register">

            <span> Register</span>

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;