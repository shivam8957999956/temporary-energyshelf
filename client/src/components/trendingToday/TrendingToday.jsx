import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./trendingToday.css";
export default function TrendingToday({ post }) {
  const [print, setPrint] = useState(false);
  useEffect(() => {
    const check = () => {
      var todayYear = new Date().getFullYear();
      var todayMonth = new Date().getMonth() + 1;
      var todayDay = new Date().getDate();
      var ValYear = new Date(post.createdAt).getFullYear();
      var ValMonth = new Date(post.createdAt).getMonth() + 1;
      var ValDay = new Date(post.createdAt).getDate();
      if (
        todayDay === ValDay &&
        todayMonth === ValMonth &&
        todayYear === ValYear
      ) {
        setPrint(true);
      } else setPrint(false);
      // console.log(todayMonth + " " + ValMonth);
      //   console.log(new Date(post.createdAt).getMonth());
    };
    check();
  }, []);
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
  return (
    <>
      {
        <Link className="link" to={`/post/${post._id}`}>
          <div className="tt" onClick={handleUpdate}>
            <div className="tt-img-bg">
              <img src={post.photo} alt="" className="tt-img" />
            </div>
            <div className="tt-t">
              <div className="tt-text">
                <div className="tt-username-">
                  {post.username}
                  <i class="tt-icon far fa-eye"></i>
                  {post.view}
                </div>
                {post.title}
              </div>
              {/* <div className="tt-username">
                {post.username}
                <i class="tt-icon far fa-eye"></i>
                {post.views}
              </div> */}
            </div>
          </div>
        </Link>
      }
    </>
  );
}
