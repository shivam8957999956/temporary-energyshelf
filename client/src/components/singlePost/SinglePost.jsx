import { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import emailjs from "emailjs-com";
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

  const [designation, setDesignation] = useState([]);
  const [id, setID] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommmed, setRecommend] = useState("");
  const [book, setBook] = useState("false");
  const [like, setLike] = useState("false");
  const [report, setReport] = useState("false");
  const [likes, setLikes] = useState(0);
  const [reports, setReports] = useState(0);
  const formRef = useRef();
  const [toSend, setToSend] = useState({
    user_name: "",
    post_id: "",
    message: "",
    post_link: "http://localhost:3000/post" + path,
  });
  const myRef = useRef();
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/posts/" + path);
        setPost(res.data);
        console.log(res.data);
        setRecommend(res.data.username);
        setID(res.data.userId);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setLoading(false);
        setToSend({ user_name: post.username });
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
        const checkReport = () => {
          if (user && res.data.report) {
            if (res.data.report.indexOf(user._id) > -1) {
              setReport("true");
              // console.log(res.data.report);
              // console.log("truesdfs");
            } else {
              setReport("false");
              // console.log("false sdfi ");
            }
          }
          // console.log(report);

          // console.log(book);
        };

        checkReport();
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

  const handleReportSMS = async (com) => {
    if (com.report.length >= 1) {
      console.log(com);
      emailjs
        .sendForm(
          "kamaneeya14",
          "template_5asq7ai",
          formRef.current,
          "user_sP5i0padsT1ONdbiGYy9j",
        )
        .then(
          (result) => {
            console.log(result.text);
            // console.log("result.text");
            // setDone(true);
          },
          (error) => {
            console.log(error.text);
          },
        );
    } else {
      // const res = await axios.put("/comment/" + com._id, {
      //   reportUser: user._id,
      // });
    }
  };
  const handleReport = async () => {
    if (user) {
      const res = await axios.put("/posts/report/" + post._id, {
        username: post.username,
        report: user._id,
        check: report,
      });
      // console.log(res.data);
      if (res.data.report) {
        if (res.data.report.indexOf(user._id) > -1) {
          setReport("true");
          // console.log(res.data);
        } else {
          setReport("false");
        }
      }
      if (res.data.report.length >= 1) {
        handleReportSMS(res.data);
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
          <form ref={formRef} style={{ display: "none" }}>
            <input
              type="text"
              value={post.username}
              placeholder="Name"
              name="user_name"
            />
            <input type="text" placeholder="Subject" name="user_subject" />
            <input
              value={post._id}
              type="text"
              placeholder="Subject"
              name="post_id"
            />
            <input
              type="text"
              value={"http://localhost:3000/post/" + path}
              placeholder="Email"
              name="post_link"
            />
            <textarea
              value={post.title}
              name="message"
              id=""
              rows="5"></textarea>
            <button>Submit</button>
            {/* {done && <div className="c-t">Thanks for messaging.</div>} */}
          </form>
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
              {report === "true" ? (
                <i
                  className="options s44 fa-solid fa-flag"
                  onClick={handleReport}></i>
              ) : (
                <i
                  className="options s44 fa-regular fa-flag"
                  onClick={handleReport}></i>
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
