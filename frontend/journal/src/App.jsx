import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Journal from "./components/Journal";
import Register from "./components/Register";
import Display from "./components/Display";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>
  );
};

export default App;
