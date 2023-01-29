import "./followerSide.css";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
export default function FollowerSide({ post }) {
  const PF = "http://localhost:5000/images/";
  const refreshPage = () => {
    window.location.reload();
  };
  const { user } = useContext(Context);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const getPostAll = async () => {
      // const res = await axios.get("/users/?user=" + post.username);
      // // setPostAll(res1.data);
      // // console.log(res.data.followers && res.data.followers.indexOf(user._id));
      // console.log(res.data[0].followers);
      // if (
      //   res.data[0].followers &&
      //   res.data[0].followers.indexOf(user._id) > -1
      // ) {
      //   // console.log("object");
      //   setCheck(true);
      // } else setCheck(false);
      if (user && post.liked && post.liked.indexOf(user._id) > -1) {
        setCheck(true);
      } else setCheck(false);
    };
    getPostAll();
  }, []);
  return (
    <div>
      {check && (
        <div className="ex-bottom-right-card">
          {post ? (
            <Link className="link" to={`/post/${post._id}`}>
              <div className="ex-bottom-right-card-left">
                <img
                  className="ex-bottom-right-card-img"
                  src={
                    post
                      ? post.photo
                      : "https://source.unsplash.com/random/900×700/?technology"
                  }></img>
              </div>
            </Link>
          ) : (
            <div className="ex-bottom-right-card-left">
              <img
                className="ex-bottom-right-card-img"
                src={
                  post
                    ? post.photo
                    : "https://source.unsplash.com/random/900×700/?technology"
                }></img>
            </div>
          )}

          <div className="ex-bottom-right-card-left">
            <span className="ex-bottom-right-card-title" onClick={refreshPage}>
              {post ? (
                <Link className="link" to={`/post/${post._id}`}>
                  {post ? post.title : "title"}
                </Link>
              ) : (
                "title"
              )}
            </span>

            <span className=""> </span>
            <span className="ex-bottom-right-card-time">
              {post ? new Date(post.createdAt).toDateString() : "date"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
