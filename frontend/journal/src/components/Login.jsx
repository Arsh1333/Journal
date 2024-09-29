import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios
      .post("http://localhost:5000/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/journal";
      })
      .catch((error) => console.log(error));

    //   const token = response.data.token;
    //   // Save the token in localStorage or sessionStorage
    //   localStorage.setItem("token", token);

    //   // Redirect to the journal page or dashboard after login
    //   window.location.href = "/journal";
  };
  return (
    <>
      <h1>Login Page</h1>
      <div className="form">
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
