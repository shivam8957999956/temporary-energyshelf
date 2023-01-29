import { useState } from "react";
import "./studyGuidePost.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../config";
export default function StudyGuidePost({ post }) {
  const [posts, setPosts] = useState([]);
  const search = "/?user=MTP";
  const PF = "http://localhost:5000/images/";
  function convertToPlain(html) {
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
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
  );
}
