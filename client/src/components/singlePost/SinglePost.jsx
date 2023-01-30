import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";

import parse from "html-react-parser";
import { Context } from "../../context/Context";
import axios from "axios";
import Recommend from "../recommend/Recommend";
import Loading from "../loading/Loading";
import { axiosInstance } from "../../config";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommmed, setRecommend] = useState("");
  const [book, setBook] = useState("false");
  const [like, setLike] = useState("false");
  const [likes, setLikes] = useState(0);
  const myRef = useRef();
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        setRecommend(res.data.username);
        setID(res.data.userId);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setLoading(false);

        const checkBook = () => {
          if (user && res.data.bookmark) {
            if (res.data.bookmark.indexOf(user._id) > -1) {
              setBook("true");
            } else {
              setBook("false");
            }
          }
          // console.log(book);
        };

        checkBook();
        const checkLike = () => {
          if (user && res.data.liked) {
            if (res.data.liked.indexOf(user._id) > -1) {
              setLike("true");
            } else {
              setLike("false");
            }
            setLikes(res.data.liked.length);
          }
          // console.log(book);
        };
        checkLike();

        // console.log(res.data);
      } catch (err) {
        setLoading(true);
      }
    };
    getPost();
  }, [path]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const handleUpdate = async () => {
      try {
        const res = await axios.put("/posts/" + post._id, {
          username: post.username,
          view: post.view + 1,
        });
        const res1 = await axios.put("/profile/views/" + post.userId, {});
        // console.log(res1);
      } catch (err) {}
    };
    handleUpdate();
  }, [post]);
  const handleBook = async () => {
    if (user) {
      const res = await axios.put("/posts/bookmark/" + post._id, {
        username: post.username,
        bookmark: user._id,
        check: book,
      });
      if (res.data.bookmark) {
        if (res.data.bookmark.indexOf(user._id) > -1) {
          setBook("true");
        } else {
          setBook("false");
        }
      }
    } else {
      window.location.replace(`/login`);
    }
  };
  const handleLike = async () => {
    if (user) {
      try {
        const res = await axios.put("/posts/like/" + post._id, {
          username: post.username,
          likes: user._id,
          check: like,
        });
        // const res1 = await axios.put("/profile/like/" + post.userId, {
        //   check: like,
        // });
        // console.log(res1);
        // console.log(like);
        if (res.data.liked) {
          if (res.data.liked.indexOf(user._id) > -1) {
            setLike("true");
            // c
          } else {
            setLike("false");
          }
          setLikes(res.data.liked.length);
        }

        // console.log(like);
      } catch (err) {}
    } else {
      window.location.replace(`/login`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username, admin: user.admin },
      });
      window.location.replace("/");
    } catch (err) {}
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  // fetching recommmed post

  return (
    <>
      {loading === false ? (
        <div className="singlePost-main">
          <div className="singlePost">
            <div className="side-options">
              {(true === user?.admin || post.username === user?.username) && (
                <div className="optionsEdit">
                  <Link className="link" to={`/write/${post._id}`}>
                    <i className="options s11 fas fa-edit"></i>
                  </Link>
                  <i
                    className="options  s22 fas fa-trash-alt"
                    onClick={handleDelete}></i>
                </div>
              )}
              <div className="optionsEdit likes-com">
                <span className="optionsText">{likes}</span>
                {like === "false" ? (
                  <i
                    className="options s33 far fa-thumbs-up"
                    onClick={handleLike}></i>
                ) : (
                  <i
                    className=" options s33 fas fa-thumbs-up"
                    onClick={handleLike}></i>
                )}
              </div>
              {book === "true" ? (
                <i
                  className="options s44 fas fa-bookmark"
                  onClick={handleBook}></i>
              ) : (
                <i
                  className="options s44 far fa-bookmark"
                  onClick={handleBook}></i>
              )}
              <i
                class="options s55 far fa-comment"
                onClick={() =>
                  myRef.current.scrollIntoView({ behavior: "smooth" })
                }></i>
            </div>
            <div className="singlePostWrapper">
              <h1 className="singlePostTitle-e">
                {title}
                {/* {("MTP" === user?.username ||
                  post.username === user?.username) && (
                  <div className="singlePostEdit">
                    <Link className="link" to={`/write/${post._id}`}>
                      <i className="singlePostIcon singlePostIconE fas fa-edit"></i>
                    </Link>
                    <i
                      className="singlePostIcon singlePostIconD fas fa-trash-alt"
                      onClick={handleDelete}></i>
                  </div>
                )}  <div className="likes-com">
                  {like === "false" ? (
                    <i
                      className="like far fa-thumbs-up"
                      onClick={handleLike}></i>
                  ) : (
                    <i
                      className="like fas fa-thumbs-up"
                      onClick={handleLike}></i>
                  )}

                  <span style={{ color: "green" }} className="like-text">
                    {likes}
                </div> */}
              </h1>
              <div className="singlePostInfo">
                <span
                  className="singlePostAuthor"
                  onChange={() => console.log("d")}>
                  Author :
                  <Link className="link" to={`/?user=${post.username}`}>
                    <b> {post.username}</b>
                  </Link>
                  {post.categories &&
                    post.categories.map((c) => (
                      <Link className="link" to={`/?cat=${c}`}>
                        <span className="singlePostCat">{"#" + c}</span>
                      </Link>
                    ))}
                  <span className="singlePostViews">
                    <i class="singlePostViewsIcon far fa-eye"></i>
                    {post.view + " "}
                  </span>
                  <span className="singlePostDate">
                    {" "}
                    <i class="singlePostDateIcon far fa-clock"></i>
                    {"   " + new Date(post.createdAt).toDateString()}
                  </span>
                  <span className="singlePostDate">
                    {" "}
                    <i className="singlePostDateIcon far fa-thumbs-up"></i>
                    {likes}
                  </span>
                  {post.editor && (
                    <Link className="link" to={`/?editor=true`}>
                      <span className="singlePostEditorCoice">
                        <i class="singlePostEditorCoiceIcon far fa-user"></i>
                        Editor Choice
                      </span>
                    </Link>
                  )}
                  {post.quiz && (
                    <Link className="link" to={`/?quiz=true`}>
                      <span className="singlePostEditorCoice">
                        <i class="singlePostEditorCoiceIcon fas fa-file-alt"></i>
                        quiz
                      </span>
                    </Link>
                  )}
                  {/* {book === "true" ? (
                    <i
                      className="bookmark fas fa-bookmark"
                      onClick={handleBook}></i>
                  ) : (
                    <i
                      className="bookmark far fa-bookmark"
                      onClick={handleBook}></i>
                  )} */}
                </span>
              </div>
              {/* {post.photo && (
              // <img className="singlePostImg" src={PF + post.photo} alt="" />
            )} */}
              <p className="singlePostDesc">{parse(post.desc)}</p>
            </div>

            <div className="singlePostRecommend">
              <Recommend p={recommmed} userId={id} />
            </div>
          </div>
          <div className="singlePostCommentRef" ref={myRef}></div>
        </div>
      ) : (
        <div className="loading-bg">
          <Loading />
        </div>
        // <span className="loading">Loading Page . . . </span>
      )}
    </>
  );
}
