import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Daily Journal App</h1>
      <Link to="/login">Go to Login</Link>
      <br />
      <Link to="/journal">View Journal</Link>
    </div>
  );
};

export default Home;
