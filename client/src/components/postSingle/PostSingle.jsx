import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./postSingle.css";
export default function PostSingle({ post }) {
  const PF = "http://localhost:5000/images/";
  // const { user } = useContext(Context);
  const { user, dispatch } = useContext(Context);

  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState();
  const [userName, setuserName] = useState("");
  const [book, setBook] = useState("false");
  const [like, setLike] = useState("false");
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
    // try {
    //   const res = await axios.put("/posts/" + post._id, {
    //     username: post.username,
    //     views: post.views + 1,
    //   });
    //   const res1 = await axios.put("/profile/views/" + post.userId, {});
    //   // console.log(res1);
    // } catch (err) {}
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/users/?user=" + post.username);

      setImage(res.data[0].profilePic);
      setuserName(res.data[0].username);
    };
    const checkBook = () => {
      if (user && post.bookmark) {
        if (post.bookmark.indexOf(user._id) > -1) {
          setBook("true");
        } else {
          setBook("false");
        }
      }
      // console.log(book);
    };
    checkBook();
    const checkLike = () => {
      if (user && post.liked) {
        if (post.liked.indexOf(user._id) > -1) {
          setLike("true");
        } else {
          setLike("false");
        }
        setLikes(post.liked.length);
      }
      // console.log(book);
    };
    checkLike();
    fetchPosts();
  }, []);
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
          userId: post.userId,
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

  return (
    <div>
      <div className="ps">
        <div className="ps__img">
          {post.quiz && (
            <div className="ps__img_bg">
              <i class="ps__img_icon fas fa-book-reader"></i>
            </div>
          )}

          {post && <img className="ps-img" src={post.photo} alt="Bricks"></img>}
          <div className="ps-cat">
            <img className="ps-cat-img" src={image} alt="" />
            <div className="ps-title-name">
              <span className="ps-cat-name">{userName} </span>
            </div>

            {post.categories.map((c) => (
              <Link className="link" to={`/?cat=${c}`}>
                <span className="ps-cat-catVal">{"#" + c}</span>
              </Link>
            ))}
            <span className="ps-cat-date">
              {new Date(post.createdAt).toDateString()}
            </span>
            <span className="ps-cat-view">
              <i class="ps-cat-view-icon far fa-eye"></i>
              {intToString(post.view)}
            </span>
          </div>
          <div className="ps-title">{post.title}</div>
        </div>
        <div className="ps__overlay ps__overlay--primary">
          {/* <div className="ps__title">Bricks</div>
          <p className="ps__description">Here we have a brick wall.</p> */}
          <div className="ps__img">
            <div className="ps-cat">
              <Link className="link" to={`/profile/${post.username}`}>
                <img className="_ps-cat-img" src={image} alt="" />
              </Link>
              {/* <Link className="link" to={`/profile/${post.username}`}> */}
              <span className="_ps-cat-name">{userName}</span>
              {/* </Link> */}
              <span className="_ps-cat-date">
                {" "}
                {new Date(post.createdAt).toDateString()}
              </span>
              <span className="_ps-cat-catVal">
                {post.categories.map((c) => (
                  <Link className="link" to={`/?cat=${c}`}>
                    <span className="_ps--catVal">{"# " + c}</span>
                  </Link>
                ))}
              </span>
              <span className="_ps-cat-view">
                <i class="_ps-cat-view-icon far fa-eye"></i>{" "}
                <span
                  className="_ps-cat-view"
                  style={{
                    fontSize: "12px",
                    color: "#1f1f35",
                  }}>
                  {intToString(post.view)}
                </span>
              </span>
            </div>
            <Link className="link" to={`/post/${post._id}`}>
              <div className="_ps-title" onClick={handleUpdate}>
                {post.title}
              </div>
            </Link>
            <div className="_ps-desc">{convertToPlain(post.desc)}</div>
            <div className="view_more">
              <Link className="link" to={`/post/${post._id}`}>
                <div className="_ps-more" onClick={handleUpdate}>
                  view more
                </div>
              </Link>
              {book === "true" ? (
                <i
                  className="bookmark fas fa-bookmark"
                  onClick={handleBook}></i>
              ) : (
                <i
                  className="bookmark far fa-bookmark"
                  onClick={handleBook}></i>
              )}
              <div className="likes-com">
                {like === "false" ? (
                  <i className="like far fa-thumbs-up" onClick={handleLike}></i>
                ) : (
                  <i className="like fas fa-thumbs-up" onClick={handleLike}></i>
                )}
                <span style={{ color: "green" }} className="like-text">
                  {likes}
                </span>
              </div>
              {/* <i class="far fa-bookmark"></i> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
