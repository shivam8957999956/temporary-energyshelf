import { useState, useEffect } from "react";
import "./studyGuidePost.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";
export default function StudyGuidePost({ post }) {
  const [profile, setProfile] = useState([]);
  const [load, setLoad] = useState(false);
  const search = "/?user=MTP";
  const PF = "http://localhost:5000/images/";
  function convertToPlain(html) {
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  useEffect(() => {
    // console.log(post.userId);
    const getPost = async () => {
      // window.location.reload();
      const res = await axios.get("/users/?user=" + post.username);
      // console.log();
      setProfile(res.data[0]);
      // console.log(res.data[0]);
    };
    getPost();
  }, []);
  useEffect(() => {
    setLoad(profile);
    console.log(profile);
  }, [profile]);
  const handleViews = async () => {
    try {
      const res = await axios.put("/posts/" + post._id, {
        username: post.username,
        views: post.views + 1,
      });
      const res1 = await axios.put("/profile/views/" + post.userId, {});
    } catch (err) {}
  };

  return (
    profile.faculty === true && (
      <div className="sgp">
        <div className="sgp-right">
          <img className="sgp-img" src={post.photo} alt="" />
        </div>
        <div className="sgp-left">
          <Link className="link" to={`/post/${post._id}`}>
            <span className="sgp-title" onClick={handleViews}>
              {post.title}
            </span>
          </Link>
          <span className="sgp-desc">{convertToPlain(post.desc)}</span>
          <span></span>
        </div>
      </div>
    )
  );
}
