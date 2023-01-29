import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";
import parse from "html-react-parser";
import { Context } from "../../context/Context";
export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  const [views, setViews] = useState(0);
  // const [userviews, setUserviews] = useState(user.views);
  const [image, setImage] = useState();
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
  function convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  const handleUpdate = async () => {
    try {
      const res = await axios.put("/posts/" + post._id, {
        username: post.username,
        views: post.views + 1,
      });

      const res1 = await axios.put("/profile/views/" + post.userId, {});
      // console.log(res1);
    } catch (err) {}
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/users/?user=" + post.username);

      setImage(res.data[0].profilePic);
    };
    fetchPosts();
  }, []);
  return (
    <div className="post">
      <div className="upper">
        <div className="watching">
          <i class="watchingIcon far fa-eye"></i>
          <span className="watchingVal">{intToString(post.views)}</span>
        </div>
        {/* <div className="likes">
          <i class="likesIcon far fa-thumbs-up"></i>
          <span className="likeVal">{post.likes}</span>
        </div> */}
      </div>
      <div className="back">
        <Link className="link" to={`/post/${post._id}`}>
          {post.photo && (
            <img className="postImg" src={PF + post.photo} alt="" />
          )}
          {post.photo == null && (
            <img
              className="postImg"
              src="https://source.unsplash.com/random/?petroleum,nature"
              alt=""
            />
          )}
        </Link>
        <div className="postAuthorData">
          <div className="postnameDate">
            <img className="postAuthorImg" src={PF + image} alt="" />
            <span className="postAuthorName">
              <Link className="link" to={`/profile/${post.username}`}>
                {" "}
                {post.username}
              </Link>
            </span>
            <span className="postAuthorName dash">-</span>
            <span className="postDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>

          {/* <i class="postBookmark far fa-bookmark"></i> */}
          <div className=" postBookmark postCats">
            {post.categories.map((c) => (
              <Link className="link" to={`/?cat=${c}`}>
                <span className="postCat">{c}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="postInfo">
          <Link className="link" to={`/post/${post._id}`}>
            <span className="postTitle" onClick={handleUpdate}>
              {post.title}
            </span>
          </Link>
        </div>
        <p className="postDesc">{convertToPlain(post.desc)}</p>
      </div>
    </div>
  );
}
