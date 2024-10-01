import React, { useState } from "react";
import axios from "axios";

const Journal = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a post");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/add",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Post added successfully!");
      setContent(""); // Clear the form
      setError(null);
      window.location.href = "/display";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Add Post</h1>
      <form onSubmit={handleAdd}>
        <div>
          <textarea
            placeholder="Write your journal content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
      {/* Show success or error messages */}
      {successMessage && <p>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Journal;
