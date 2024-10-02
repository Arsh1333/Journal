import React, { useState, useEffect } from "react";
import axios from "axios";

const Display = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts when the component is mounted
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view the posts.");
        return;
      }

      try {
        // Make a GET request to your API to fetch the posts
        const response = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the posts state with the response data
        setPosts(response.data);
        setError(null); // Clear any error if the request is successful
      } catch (err) {
        // Handle any errors
        setError(
          err.response ? err.response.data.error : "Failed to fetch posts."
        );
      }
    };

    fetchPosts();
  }, []); // The empty array makes this effect run only once, when the component is mounted

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token to headers
          },
        }
      );
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="posts-list">
      <h2>Journal Entries</h2>

      {/* Display error if it exists */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display posts if fetched successfully */}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="post">
              <p>
                <strong>Content:</strong> {post.content}
              </p>
              {/* <p>
                <strong>Owner ID:</strong> {post.owner}
              </p> */}
              <p>
                <strong>Date:</strong>{" "}
                {new Date(post.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(post._id)}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Display;
