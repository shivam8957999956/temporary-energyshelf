import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import emailjs from "emailjs-com";
// import CommentCard from "../commentCard/CommentCard";
import "./sidecoment.css";
import { axiosInstance } from "../../config";

export default function Sidecoment() {
  const [desc, setDesc] = useState("");
  const [initial, setInitial] = useState("");
  const [check, setCheck] = useState([]);
  const ref = useRef([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [toSend, setToSend] = useState({
    user_name: "",
    post_id: "",
    message: "",
    post_link: "http://localhost:3000/post" + path,
  });
  // console.log(location);
  const fetchPosts = async () => {
    try {
      const res = await axios.get("/comment/?postId=" + path);
      setPosts(res.data);
      setLoading(false);
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(check);
    if (user) {
      const newPost = {
        username: user.username,
        desc,
        postId: path,
      };
      if (check) {
        newPost.replyText = check.desc;
        newPost.replyTo = check._id;
        newPost.replyUser = check.username;
      }
      try {
        const res = await axios.post("/comment", newPost);
        console.log(res);
        setCheck([]);
        fetchPosts();
        setDesc("");
        // window.location.replace("/post/" + path);
      } catch (err) {}
    } else {
      window.location.replace("/login");
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/comment/?postId=" + path);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {}
    };
    fetchPosts();
  }, []);

  const formRef = useRef();
  const [done, setDone] = useState(false);
  const handleReport = async (com) => {
    if (com.totalReport.length >= 0) {
      console.log(com.totalReport.length);
      emailjs
        .sendForm(
          "service_72i4wmb",
          "template_lmkw3os",
          formRef.current,
          "user_sP5i0padsT1ONdbiGYy9j",
        )
        .then(
          (result) => {
            console.log(result.text);
            setDone(true);
          },
          (error) => {
            console.log(error.text);
          },
        );
    } else {
      const res = await axios.put("/comment/" + com._id, {
        reportUser: user._id,
      });
    }
    // console.log(res);
    //   setToSend({
    //     post_id: path,
    //     user_name: com.username,
    //     message: com.desc,
    //     post_link: "http://localhost:3000/post" + path,
    //   });
    //   setCheck([]);
    //   fetchPosts();
    // } else {
    //   const res = await axios.put("/comment/" + com._id);
    //   // console.log(res);
    //   fetchPosts();
    // }
  };
  const handleDelete = async (com) => {
    // console.log(com);

    const res = await axios.delete("/comment/" + com._id);
    fetchPosts();
  };
  return (
    <>
      {loading === false && (
        <div className="sc">
          {/* <span className="sc-heading">
            Read comments
            <i class=" commmentIcon far fa-comment"></i> 
          </span>*/}
          <div className="commentTitle">
            <i class="commentTitleIcon far fa-comment-alt"></i>Comments :{" "}
            {posts.length}
          </div>

          <form className="sc-form" onSubmit={handleSubmit}>
            {check.username && (
              <label className="sc-reply-user">
                Replying to @{check.username}
              </label>
            )}
            <textarea
              className="sc-textarea"
              type="text"
              value={desc}
              placeholder="Add new comment"
              onChange={(e) => setDesc(e.target.value)}
            />
            <button className="sc-button" type="submit">
              Add
            </button>
          </form>
          <div className="sc-all-comment">
            {posts.length != 0 ? (
              <span className="sc-all-comment-head"></span>
            ) : (
              <span className="sc-all-comment-head">
                Be First to add your Comment
              </span>
            )}
            {posts.map((com) => (
              // <CommentCard com={p} />

              <div className="cc">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={{ display: "none" }}>
                  <input
                    type="text"
                    value={com.username}
                    placeholder="Name"
                    name="user_name"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    name="user_subject"
                  />
                  <input
                    value={com._id}
                    type="text"
                    placeholder="Subject"
                    name="post_id"
                  />
                  <input
                    type="text"
                    value={"https://energy-shelf.herokuapp.com/post/" + path}
                    placeholder="Email"
                    name="post_link"
                  />
                  <textarea
                    value={com.desc}
                    name="message"
                    id=""
                    rows="5"></textarea>
                  <button>Submit</button>
                  {done && <div className="c-t">Thanks for messaging.</div>}
                </form>
                <div className="cc-userInfo">
                  <span className="cc-username">{com.username}</span>
                  <span className="cc-date">
                    at
                    {" " +
                      new Date(com.createdAt).getHours() +
                      ":" +
                      new Date(com.createdAt).getMinutes() +
                      ":" +
                      new Date(com.createdAt).getSeconds()}
                    {" on " +
                      new Date(com.createdAt).getDate() +
                      "/" +
                      (new Date(com.createdAt).getMonth() + 1) +
                      "/" +
                      new Date(com.createdAt).getFullYear()}
                  </span>
                  <span className="cc-report" onClick={() => setCheck(com)}>
                    Reply <i class="fas fa-reply"></i>
                  </span>
                  <span className="cc-report" onClick={() => handleReport(com)}>
                    Report <i class="fas fa-exclamation-triangle"></i>
                  </span>
                  {("MTP" === user?.username ||
                    com.username === user?.username) && (
                    <span
                      className="cc-report delete"
                      onClick={() => handleDelete(com)}>
                      <i className=" fas fa-trash-alt"></i>
                    </span>
                  )}
                </div>
                <div className="cc-desc">
                  {com.replyTo !== "" && (
                    <span className="cc-reply-text">
                      <span className="cc-reply-desc">
                        <span className="cc-reply-user">@{com.replyUser}</span>
                        {com.replyText}
                      </span>
                    </span>
                  )}
                  <span className="cc-desc-main">{com.desc}</span>
                </div>
                <div className="cc-bottom"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
