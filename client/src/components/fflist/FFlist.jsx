import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import "./fflist.css";

export default function FFlist({ userId }) {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      // console.log(userId);
      const res = await axios.get("/users/" + userId);
      setProfile(res.data);
      // console.log(res.data);
    };
    getPost();
  }, []);
  return (
    <div>
      <Link className="link" to={`/profile/${profile.username}`}>
        <div className="f-search-content">
          <img className="f-search-img" src={profile.profilePic} alt="" />
          <div className="f-search-val">
            {" "}
            {profile.username}
            <span className="f-design">{"# " + profile.designation}</span>
          </div>
        </div>{" "}
      </Link>
    </div>
  );
}
