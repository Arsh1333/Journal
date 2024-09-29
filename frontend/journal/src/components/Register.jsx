import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:5000/api/users/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Register Page</h1>
      <div className="form">
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
