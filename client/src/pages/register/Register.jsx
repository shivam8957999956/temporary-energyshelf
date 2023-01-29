import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <div className="registerContainer">
        <div className="r-left">
          <img
            className="leftImgg"
            src="https://source.unsplash.com/random/?education,technology,petroleum"
            alt=""
          />
        </div>
        <div className="r-right">
          <span className="registerTitle">Register</span>
          <hr />
          <span className="registerTitle">Welcome To MTP,</span>
          <form className="registerForm" onSubmit={handleSubmit}>
            <label>
              <strong>UserName</strong>
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your UserName..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>
              <strong>Email</strong>
            </label>
            <input
              className="registerInput"
              type="text"
              placeholder="Enter your email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>
              <strong>Password</strong>
            </label>
            <input
              className="registerInput"
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="registerButton" type="submit">
              Register
            </button>

            <button className="registerLoginButton">
              <Link className="link" to="/login">
                <strong>Already Have An Account? Login</strong>
              </Link>
            </button>
            {error && <span>Something went wrone!</span>}
          </form>
        </div>
      </div>
    </div>
  );
}
