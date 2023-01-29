import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import FollowerSide from "../followerSide/FollowerSide";
import SidebarCreator from "../sidebarCreator/SidebarCreator";
import SubsidePost from "../subsidePost/SubsidePost";
import "./sidebar.css";

export default function Sidebar() {
  const [cat, setCat] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState([]);
  const [posts, setPost] = useState([]);
  const [postsAll, setPostAll] = useState([]);
  const [check, setCheck] = useState(false);
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/category");
      // console.log(res);
      setCat(res.data);
    };
    getCats();
    const getPost = async () => {
      const res1 = await axios.get("/popularity");

      setPost(res1.data);
    };
    getPost();
    const getPostAll = async () => {
      const res1 = await axios.get("/posts");

      setPostAll(res1.data);
    };
    getPostAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      try {
        const res1 = await axios.get("/profile/search/?user=" + searchVal);
        console.log(res1.data);
        setSearch(res1.data);
        setCheck(true);
      } catch (err) {
        setCheck(false);
      }
    } else {
      setCheck(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="ff-bg">
        {/* <div className="sidebarTopFollow">
          <div className="followTitle">
            Connect us On Social Media Platfroms
          </div>
          <div className="followIcons">
            <i class="followIcon fab fa-twitter"></i>
            <i class="followIcon fab fa-instagram"></i>
            <i class="followIcon fab fa-facebook"></i>
            <i class="followIcon fab fa-linkedin"></i>
          </div>
        </div>
        <hr /> */}
        <span className="sidebarItemHd">Recommended Categories</span>
        <div className="sidebarItems">
          {cat.map((c) => (
            <div className="sidebarItemDiv">
              <Link className="link" to={`/?cat=${c.name}`}>
                <span className="sidebarItem">{c.name}</span>
              </Link>
            </div>
          ))}
        </div>

        <form className="sd-form" onSubmit={handleSubmit}>
          <input
            className="sd-input"
            type="text"
            placeholder="Search User by Name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="sd-button" type="submit">
            Search
          </button>
        </form>
        {check && (
          <div className="sd-search-contents">
            {search.map((p) => (
              <Link className="link" to={`/profile/${p.username}`}>
                <div className="sd-search-content">
                  <img className="sd-search-img" src={p.profilePic} alt="" />
                  <div className="sd-search-val"> {p.username}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="ff-bg">
        <span className="sidebarItemHd">
          Liked Posts<i class="liked-icon fas fa-thumbs-up"></i>
        </span>
        <div className="sd-creators f">
          {posts.map((p) => (
            <>
              <FollowerSide post={p} />
            </>
          ))}
        </div>
      </div>
      <div className="ff-bg">
        <span className="sidebarItemHd">Popular Posts</span>
        <div className="sd-creators">
          {posts.map((p) => (
            <SubsidePost post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
