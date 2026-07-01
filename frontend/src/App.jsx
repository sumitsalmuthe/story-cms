import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Popular from "./pages/Popular";
import About from "./pages/About";
import StoryDetails from "./pages/StoryDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BecomeWriter from "./pages/BecomeWriter";

import MainDashboard from "./pages/MainDashboard";
import WriterDashboard from "./pages/writer/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route
          path="/category"
          element={<Categories />}
        />

        <Route
          path="/popular"
          element={<Popular />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/story/:id"
          element={<StoryDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/become-writer"
          element={
            <ProtectedRoute>
              <BecomeWriter />
            </ProtectedRoute>
          }
        />

        <Route
          path="/main-dashboard"
          element={
            <ProtectedRoute>
              <MainDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <WriterDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;