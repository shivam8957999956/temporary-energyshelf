import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "../../components/post/Post";
import SinglePost from "../../components/singlePost/SinglePost";
import StudyGuidePost from "../../components/studyGuidePost/StudyGuidePost";
import { axiosInstance } from "../../config";
import "./interExp.css";

export default function InterExp() {
  const [posts, setPosts] = useState([]);
  const [comps, setComps] = useState([]);
  const [editor, setEditor] = useState([]);
  const [search, setSearch] = useState("");
  function convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/?cat=interviews");
      setPosts(res.data);
    };
    fetchPosts();
    const fetchComps = async () => {
      const res = await axios.get("/company");
      setComps(res.data);
    };
    fetchComps();
    const getPost1 = async () => {
      const res1 = await axios.get("/popularity/?today=interviews");
      console.log(res1.data);
      setEditor(res1.data);
    };
    getPost1();
  }, []);
  const handleClick = async (e) => {
    const res = await axios.get("/posts/?title=" + e);
    setPosts(res.data);
  };
  const handleViews = async (post) => {
    try {
      const res = await axios.put("/posts/" + post._id, {
        username: post.username,
        views: post.views + 1,
      });
      const res1 = await axios.put("/profile/views/" + post.userId, {});
    } catch (err) {}
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get("/posts/?title=" + search, {
      type: "interviews",
    });
    setPosts(res.data);
    console.log(res);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="interExp">
      <div className="interExp-l">
        <div className="interExpTagCard">
          <div className="interExpTags">Company Tags</div>
          <div className="interExpTag">
            {comps.map((p) => (
              // <span
              //   className="interExpTagVal"
              //   onClick={() => handleClick(p.name)}>
              //   {p.name}
              // </span>
              <img
                src={p.logo}
                alt={p.name}
                onClick={() => handleClick(p.name)}
                className="interExpTagImg"
              />
            ))}
          </div>
        </div>
        <div className="sdf">
          <sdf className="ttitle">Popular</sdf>
          {editor.map((p) => (
            <div className="spanndiv">
              <img className="spannImg" src={p.photo} alt="" />
              <Link className="link" to={`/post/${p._id}`}>
                <div className="spann">{p.title}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="interExp-m">
        <div className="interExp-m-tagline">
          <span style={{ color: "black", fontSize: "18px" }}>
            Interview Experience
          </span>
          {"  "}
          Share details about the interview processes you have been through
        </div>
        <div className="interExp-search">
          <form action="" onSubmit={handleSearch}>
            <input
              className="ie-search"
              type="text"
              placeholder="Search Company By Name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ie-btn" type="submit">
              Search
            </button>
            <Link className="link" to="/write">
              <button className="ie-btn addNew">New +</button>
            </Link>
          </form>
        </div>
        {posts.map((p) => (
          <div className="interExp-card">
            <Link className="link" to={`/post/${p._id}`}>
              <span className="interExp-title" onClick={() => handleViews(p)}>
                {p.title}
              </span>
            </Link>
            <span className="interExp-desc">{convertToPlain(p.desc)}</span>
            <div className="interExp-userDetails">
              <span className="interExp-username">{p.username}</span>
              <span className="interExp-date">
                Created at: {new Date(p.createdAt).toDateString()}
              </span>
              <span className="interExp-views">
                {" "}
                views : {intToString(p.views)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="interExp-r"></div>
    </div>
  );
}
