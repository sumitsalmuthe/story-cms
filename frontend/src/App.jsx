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

import MyStories from "./pages/writer/MyStories";
import CreateStory from "./pages/writer/CreateStory";
import Drafts from "./pages/writer/Drafts";
import Analytics from "./pages/writer/Analytics";
import Settings from "./pages/writer/Settings";

import StoryEditor from "./pages/writer/StoryEditor";

import ReadChapter from "./pages/ReadChapter";

import ProtectedRoute from "./routes/ProtectedRoute";

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
  path="/writer/dashboard"
  element={
    <ProtectedRoute>
      <WriterDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/stories"
  element={
    <ProtectedRoute>
      <MyStories />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/create"
  element={
    <ProtectedRoute>
      <CreateStory />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/drafts"
  element={
    <ProtectedRoute>
      <Drafts />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

<Route
  path="/writer/editor/:storyId"
  element={
    <ProtectedRoute>
      <StoryEditor />
    </ProtectedRoute>
  }
/>

<Route
  path="/read/:chapterId"
  element={<ReadChapter />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;