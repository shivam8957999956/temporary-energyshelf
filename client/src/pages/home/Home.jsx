import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { load } from "dotenv";
import Loading from "../../components/loading/Loading";
import { axiosInstance } from "../../config";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [popularAll, setPopularAll] = useState([]);
  const [likeAll, setLikeAll] = useState([]);
  // const [searchVal, setPosts] = useState([]);
  const { search } = useLocation();
  const [searchv, setSearchv] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      setLoading(false);
      const res1 = await axios.get("/popularity/");
      setPopularAll(res1.data);
      console.log(res1.data);
      const res2 = await axios.get("/popularity/likes");
      setLikeAll(res2.data);
    };
    fetchPosts();
  }, [search]);
  const handleClick = async () => {
    const res = await axios.get("/popularity/all");
    setPosts(res.data);

    // window.location.replace("/?title=" + search);
  };
  const handleNew = async () => {
    // window.location.replace("/");
    const res = await axios.get("/posts" + search);
    setPosts(res.data);
  };
  const handleQuiz = async () => {
    // window.location.replace("/");
    const res = await axios.get("/posts/?quiz=true");
    setPosts(res.data);
  };
  const handleSubmit = async (e) => {
    // window.location.replace("/");
    e.preventDefault();
    window.location.replace("/?title=" + searchv);
    // const res = await axios.get("/posts" + search);
    // setPosts(res.data);
  };
  const handleReload = async (e) => {
    window.location.replace("/");
    // e.preventDefault();
    // window.location.replace("/?title=" + searchv);
    // const res = await axios.get("/posts" + search);
    // setPosts(res.data);
  };
  const handleUpdate = async (post) => {
    try {
      const res = await axios.put("/posts/" + post._id, {
        username: post.username,
        views: post.views + 1,
      });

      const res1 = await axios.put("/profile/views/" + post.userId, {});
      // console.log(res1);
    } catch (err) {}
  };
  return (
    <>
      {loading === true ? (
        <div className="loading-bg">
          <Loading />
        </div>
      ) : (
        // <span className="loading">MTP is Loading . . .</span>
        <>
          <Header />
          <div className="main-p-header">
            <form className="main-p-form" onSubmit={handleSubmit}>
              <label htmlFor="i-mp" className="main-p-label">
                <i class="main-p-label-icon fas fa-search"></i>{" "}
                <input
                  id="i-mp"
                  value={searchv}
                  className="main-p-input"
                  type="headerSearchKeyword"
                  placeholder="Search Shelf"
                  onChange={(e) => setSearchv(e.target.value)}
                />
              </label>

              {/* <Link className="link" to={`/?title=${"the"}`}> */}
              <button className="main-p-btn" type="submit">
                Search
              </button>
              {/* </Link> */}
            </form>
            <div className="main-p-new" onClick={handleNew}>
              <i class="main-p-new-icon fas fa-bahai"></i>Newest
            </div>
            <div className="main-p-new" onClick={handleQuiz}>
              <i class="main-p-new-icon fas fa-book-reader"></i>Quiz
            </div>
            <div className="main-p-hot" onClick={handleClick}>
              <i class=" main-p-hot-icon fas fa-meteor"></i>most viewed
            </div>
            {/* <div className="main-p-latest" onClick={handleReload}>
              <i class=" main-p-latest-icon fas fa-redo-alt"></i>Reload
            </div> */}
            {/* <div className="i-title-mp">
              <div className="i-title-wrapper-mp">
                {likeAll.map((p) => (
                  <>
                    <Link className="link" to={`/post/${p._id}`}>
                      <div
                        className="i-title-item-mp"
                        onClick={handleUpdate(p)}>
                        {p.title}
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            </div> */}
          </div>
          <div className="home">
            <Posts posts={posts} popular={popularAll} />
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
}
