import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import API from "../services/api";

import "./MainDashboard.css";

function MainDashboard() {
  const [stories, setStories] = useState([]);

  const [search, setSearch] = useState("");
const [categoryFilter, setCategoryFilter] =
  useState("All");

const [sortBy, setSortBy] =
  useState("latest");

    const [editId, setEditId] = useState(null);
    const [image, setImage] = useState(null);

const [formData, setFormData] = useState({
  title: "",
  category: "",
  coverImage: "",
  shortDescription: "",
  content: "",
});

  async function fetchStories() {
    try {
      const res = await API.get("/stories");
      setStories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    fetchStories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    let imageUrl = formData.coverImage;

    if (image) {

      const reader = new FileReader();

      reader.readAsDataURL(image);

      imageUrl = await new Promise(
        (resolve, reject) => {

          reader.onloadend = async () => {

            try {

              const uploadRes =
                await API.post(
                  "/upload",
                  {
                    image:
                      reader.result,
                  }
                );

              resolve(
                uploadRes.data.url
              );

            } catch (error) {

              reject(error);

            }

          };

        }
      );

    }

    const storyData = {
      ...formData,
      coverImage: imageUrl,
    };

    if (editId) {

      await API.put(
        `/stories/${editId}`,
        storyData
      );

      alert("Story Updated");

      setEditId(null);

    } else {

      await API.post(
        "/stories",
        storyData
      );

      alert("Story Added");

    }

    fetchStories();

    setFormData({
      title: "",
      category: "",
      coverImage: "",
      shortDescription: "",
      content: "",
    });

    setImage(null);

  } catch (error) {

  console.log(error);

  alert(
    error?.response?.data?.message ||
    error.message
  );

}
};

const handleEdit = (story) => {

  setEditId(story._id);

  setFormData({
    title: story.title,
    category: story.category,
    coverImage: story.coverImage || "",
    shortDescription: story.shortDescription,
    content: story.content,
  });

};

 const handleDelete = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this story?"
    );

  if (!confirmDelete) return;

  try {

    await API.delete(
      `/stories/${id}`
    );

    fetchStories();

  } catch (error) {

    console.log(error);

  }

};

  const totalViews = stories.reduce(
  (sum, story) =>
    sum + (story.views || 0),
  0
);

const topStory = [...stories].sort(
  (a, b) =>
    (b.views || 0) -
    (a.views || 0)
)[0];

const totalCategories = [
  ...new Set(
    stories.map(
      (story) => story.category
    )
  ),
].length;


const filteredStories = stories
  .filter((story) => {
    const matchesSearch =
      story.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      categoryFilter === "All" ||
      story.category ===
        categoryFilter;

    return (
      matchesSearch &&
      matchesCategory
    );
  })
  .sort((a, b) => {
    if (sortBy === "views") {
      return (
        (b.views || 0) -
        (a.views || 0)
      );
    }

    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );
  });

  return (
    <div>
      <Navbar />

  <div className="dashboard-container">
  <h1 className="dashboard-title">
    Dashboard
  </h1>  
  </div>


<div className="stats">

  <div className="stat-card">
    <h2>{stories.length}</h2>
    <p>📚 Stories</p>
  </div>

  <div className="stat-card">
    <h2>{totalViews}</h2>
    <p>👁 Views</p>
  </div>

  <div className="stat-card">
    <h2>
      {topStory
        ? topStory.views
        : 0}
    </h2>
    <p>🏆 Top Story Views</p>
  </div>

  <div className="stat-card">
    <h2>{totalCategories}</h2>
    <p>📂 Categories</p>
  </div>

</div>

       <form
  className="dashboard-form"
  onSubmit={handleSubmit}
>
          <input
            type="text"
            name="title"
            placeholder="Story Title"
            value={formData.title}
            onChange={handleChange}
          />

          <br />
          <br />

 <select
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="">
    Select Category
  </option>

  <option value="Horror">
    Horror
  </option>

  <option value="Fantasy">
    Fantasy
  </option>

  <option value="Zombie">
    Zombie
  </option>

  <option value="Sci-Fi">
    Sci-Fi
  </option>
</select>

<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

          <br />
          <br />

          <textarea
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
          />

          <br />
          <br />

          <textarea
            name="content"
            placeholder="Story Content"
            value={formData.content}
            onChange={handleChange}
          />

          <br />
          <br />

        <button
 type="submit"
 className="add-btn"
>
 {editId
   ? "Update Story"
   : "Add Story"}
</button>
        </form>

        <div className="dashboard-filters">

  <input
    type="text"
    placeholder="Search Story..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />

  <select
    value={categoryFilter}
    onChange={(e) =>
      setCategoryFilter(
        e.target.value
      )
    }
  >
    <option value="All">
      All Categories
    </option>

    <option value="Fantasy">
      Fantasy
    </option>

    <option value="Horror">
      Horror
    </option>

    <option value="Zombie">
      Zombie
    </option>

    <option value="Sci-Fi">
      Sci-Fi
    </option>
  </select>

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
  >
    <option value="latest">
      Latest
    </option>

    <option value="views">
      Most Viewed
    </option>
  </select>

</div>

        <hr style={{ margin: "40px 0" }} />

        <div className="story-table-container">

<h2>All Stories</h2>

      

      <table className="story-table">
          <thead>
            <tr>
             <th>Image</th>
<th>Title</th>
<th>Category</th>
<th>Views</th>
<th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStories.map((story) => (
              <tr key={story._id}>
              <td>
  <img
    src={story.coverImage}
    alt={story.title}
    width="70"
    height="50"
    style={{
      objectFit: "cover",
      borderRadius: "8px"
    }}
  />
</td>

<td>{story.title}</td>

<td>{story.category}</td>

<td>
  👁 {story.views || 0}
</td>

                
         <td>
<button
  type="button"
  onClick={() => handleEdit(story)}
>
  Edit
</button>

  <button
  type="button"
  className="delete-btn"
  onClick={() => handleDelete(story._id)}
>
  Delete
</button>

</td>
                
              </tr>
            ))}
            {filteredStories.length === 0 && (
  <tr>
    <td
      colSpan="5"
      style={{
        textAlign: "center",
      }}
    >
      No Stories Found 😔
    </td>
  </tr>
)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainDashboard;













