import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import Explore from "../../pages/explore/Explore";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  // console.log(user.username);
  const PF = "http://localhost:5000/images/";
  const [check, setCheck] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const getCheck = () => {
      // console.log(path);
      if (path === undefined) setCheck(1);
      if (path === "explore") setCheck(0);
      if (path === "interExp") setCheck(2);
      if (path === "studyguide") setCheck(3);
      if (path === "events") setCheck(4);
      if (path === "aboutus") setCheck(5);
      if (path === "write") setCheck(6);
      if (path === "post") setCheck(1);
      if (path === "profile") setCheck(13);
    };
    getCheck();
  }, [path]);

  return (
    <div className="topbar">
      <div className="topleft">
        <img
          className="logoImg"
          src="https://www.linkpicture.com/q/logo_480.png"
          alt=""
        />
        {/* <img className="logoImg"src="" alt="" /> */}
        <p className="logoDesc" onClick={() => setCheck(1)}>
          <Link className="link" to="/">
            {" "}
          </Link>
        </p>
      </div>
      <div className="topcenter">
        <ul className="topList">
          {/* <li
            className="topListItem"
            style={{
              borderBottom: check == 0 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/explore" onClick={() => setCheck(0)}>
              Explore
            </Link>
          </li> */}
          <li
            className="topListItem"
            style={{
              borderBottom: check == 1 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/" onClick={() => setCheck(1)}>
              Blogs{" "}
            </Link>
          </li>
          <li
            className="topListItem"
            style={{
              borderBottom: check == 2 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/interExp" onClick={() => setCheck(2)}>
              Interview Expriences
            </Link>
          </li>
          <li
            className="topListItem"
            style={{
              borderBottom: check == 3 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/studyguide" onClick={() => setCheck(3)}>
              Study Guides
            </Link>
          </li>
          <li
            className="topListItem"
            style={{
              borderBottom: check == 4 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/events" onClick={() => setCheck(4)}>
              Events
            </Link>
          </li>
          <li
            className="topListItem"
            style={{
              borderBottom: check == 5 ? "3px  solid crimson" : "none",
            }}>
            <Link className="link" to="/aboutus" onClick={() => setCheck(5)}>
              About Us
            </Link>
          </li>
          <li
            className="topListItem AboutUs"
            style={{
              backgroundColor: check == 6 ? "crimson" : "white",
              color: check == 6 ? "white" : "#384259",
            }}>
            <Link className="link" to="/write" onClick={() => setCheck(6)}>
              Add New Blog
            </Link>
          </li>
          <li
            className="topListItem"
            onClick={handleLogout}
            style={{
              borderBottom: check == 7 ? "3px  solid crimson" : "none",
            }}>
            {user && (
              <Link className="link" to="/">
                Logout
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="topright">
        <i class="toprightNoti fas fa-bell"></i>
        {user ? (
          <Link className="link" to={`/profile/${user.username}`}>
            <img
              className="topImg-t"
              src={user.profilePic}
              alt=""
              style={{
                border: check == 13 ? "3px  solid crimson" : "none",
              }}
              onClick={() => setCheck(13)}
            />
          </Link>
        ) : (
          <ul className="topList">
            <li
              className="topListItem"
              style={{
                borderBottom: check == 10 ? "3px  solid crimson" : "none",
              }}>
              <Link className="link" to="/login" onClick={() => setCheck(10)}>
                Login
              </Link>
            </li>
            <li
              className="topListItem"
              style={{
                borderBottom: check == 11 ? "3px  solid crimson" : "none",
              }}>
              <Link
                className="link"
                to="/register"
                onClick={() => setCheck(11)}>
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
