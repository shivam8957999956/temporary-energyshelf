import { Link } from "react-router-dom";
import "./login.css";
import { Context } from "../../context/Context";
import { useRef, useContext, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setError(false);
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  // console.log(isFetching);
  return (
    <div className="login">
      <div className="loginContainer">
        <div className="l-left">
          <img
            className="leftImgg"
            src="https://images.unsplash.com/photo-1565433173417-e9f2b7eee628?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            alt=""
          />
        </div>
        <div className="l-right">
          <div className="loginTitle">Login</div>

          <div className="loginTitle">Welcome Back To MTP,</div>
          {error && (
            <div className="loginError">Please Enter Valid Credentials</div>
          )}
          <form className="loginForm" onSubmit={handleSubmit}>
            <label>
              <strong>Username</strong>
            </label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter your username..."
              ref={userRef}
            />
            <label>
              <strong>Password</strong>
            </label>
            <input
              className="loginInput"
              type="password"
              ref={passwordRef}
              placeholder="Enter your password..."
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Login
            </button>
            <button className="loginRegisterButton">
              <Link className="link" to="/register">
                <strong>Don't Have Account? Register</strong>
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
