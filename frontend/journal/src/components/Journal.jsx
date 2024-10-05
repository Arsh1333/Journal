import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Display from "./Display";

const Journal = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAdd = async (e) => {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a post");
      return;
    }
    try {
      const response = await axios.post(
        "https://journal-3vzj.onrender.com/api/posts/add",
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setSuccessMessage("Post added successfully!");
      setContent(""); // Clear the form
      setError(null);
      // window.location.href = "/display";
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="w-[100px] bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 m-[10px]"
      >
        Log Out
      </button>
      <div className="min-h-screen">
        <div className="bg-white rounded-lg shadow-lg max-w-lg ml-[14%] mt-[20px] w-[100%]">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add Journal Entry
          </h1>
          <form onSubmit={handleAdd} className="space-y-6">
            <div>
              <textarea
                placeholder="Write your journal content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Add Post
            </button>
          </form>

          {/* Display Success or Error messages */}
          {successMessage && (
            <p className="mt-4 text-green-600 text-center">{successMessage}</p>
          )}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
        <Display></Display>
      </div>
    </>
  );
};

export default Journal;
