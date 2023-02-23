import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import SubsidePost from "../subsidePost/SubsidePost";
import "./recommend.css";
export default function Recommend({ p, userId }) {
  const [recommmed, setRecommend] = useState([]);
  const [profile, setProfile] = useState([]);
  const [likes, setLikes] = useState(0);
  const [designation, setDesignation] = useState([]);
  const [f, setf] = useState(0);
  //   console.log(p);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    // if (p !== "") {
    const fetchPosts = async () => {
      console.log(p);
      const res1 = await axios.get("/posts/?user=" + p);
      setRecommend(res1.data);
      // const res = await axios.put("/profile/views/" + userId, {});
      // console.log(res);
    };
    fetchPosts();
    const getPost = async () => {
      const res = await axios.get("/users/" + userId);
      // console.log(res.data[0].username);
      setProfile(res.data);
      setLikes(res.data.totalLikes);
      setf(res.data.followers.length);
      // console.log(res);
    };
    getPost();
    // }
  }, []);
  useEffect(() => {
    if (profile?.admin === true && profile?.faculty === true)
      setDesignation("Faculty & Admin");
    else if (profile?.faculty === true) setDesignation("Faculty");
    else if (profile?.admin === true) setDesignation("Admin");
    else setDesignation("Student");
  }, [profile]);
  const fetchPosts = async () => {
    console.log(p);
    const res1 = await axios.get("/posts/?cat=" + "general");
    setRecommend(res1.data);
    //   console.log(res1);
  };

  return (
    <div>
      <div className="singlePostRecommend">
        <div className="topRecommendProfile">
          <img
            className="topRecommendProfile-img"
            src={profile.profilePic}
            alt=""
          />
          <Link className="link" to={`/profile/${profile.username}`}>
            <div className="topRecommendProfile-title">{profile.username}</div>
          </Link>
          <div className="topRecommendProfile-design">
            <span className="design_title">{designation}</span>
            <div className="likesd">
              <i class="design_icon far fa-heart"></i>
              {" " + likes}
            </div>
            <div className="likesd">
              <i class="design_icon  far fa-user"></i>
              {" " + f}
            </div>
          </div>

          <span className="singlePostRecommend-H">Recent Posts</span>
        </div>

        {recommmed.map((p1) => (
          <>{p1._id == path ? <></> : <SubsidePost post={p1} />}</>
        ))}
        {/* <SubsidePost /> */}
      </div>
    </div>
  );
}
