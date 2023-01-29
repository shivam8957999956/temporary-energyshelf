import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { axiosInstance } from "../../config";
export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(user.profilePic);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState(user.designation);
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == "") {
      setPasswordError(false);
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId: user._id,
        username,
        email,
        designation,
        profilePic: file,
      };
      // setPassword(password);
      try {
        const res = await axios.put("/users/" + user._id, updatedUser);
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    } else {
      setPasswordError(true);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Edit Your Public Profile</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img src={file ? file : user.profilePic} alt="" />
            {/* <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-images"></i>
            </label> */}
            {/* <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            /> */}
          </div>
          <label>Profile Pic Link</label>
          <input
            type="Profile Picture Link"
            placeholder={user.profilePic}
            name="name"
            onChange={(e) => setFile(e.target.value)}
          />
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Designation</label>
          <input
            type="text"
            placeholder={user.designation}
            name="Designation"
            onChange={(e) => setDesignation(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label>Enter Password</label>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          {password === "" && (
            <span
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "10px",
                fontSize: "12px",
              }}>
              You Have to Enter Password to Update any thing
            </span>
          )} */}
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>

          {success && (
            <span
              style={{
                color: "green",
                textAlign: "center",
                marginTop: "20px",
              }}>
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
