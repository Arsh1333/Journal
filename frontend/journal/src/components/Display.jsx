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
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Journal Entries
      </h2>

      {/* Display error if it exists */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Display posts if fetched successfully */}
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <p className="mb-2">
                <strong className="text-gray-700">Content:</strong>{" "}
                {post.content}
              </p>
              <p className="mb-4">
                <strong className="text-gray-700">Date:</strong>{" "}
                {new Date(post.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No posts available</p>
      )}
    </div>
  );
};

export default Display;
