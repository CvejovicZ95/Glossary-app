import React, { useState } from "react";
import "./Login.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLoginUser } from "../../hooks/useUsers";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginHandler } = useLoginUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(username, password);
  };

  return (
    <div className="login-page-container">
      <div className="login-page">
        <p className="login-info">Have an account?</p>
        <h1 className="login-title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              placeholder="Username"
              type="text"
              name="Username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              placeholder="Password"
              type="password"
              name="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <span className="register-link">
          Don`t have an account? <Link to="/register">Register here!</Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};
