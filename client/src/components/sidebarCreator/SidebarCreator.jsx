import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubsidePost from "../subsidePost/SubsidePost";
import "./sidebarCreator.css";

export default function SidebarCreator() {
  const [post, setPost] = useState([]);

  //   useEffect(() => {

  //   });
  return (
    <div className="sd">
      <SubsidePost />
      {/* <div className="sd-img">
                <img className="sd-image" src="https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1" alt="" />
            </div>
            <div className="sd-main">
                <div className="sd-title">
                    <Link className="link"to="/profile/:UID">Alina Jonsom</Link>
                </div>
                <div className="sd-desc">I am Professional Writer of Petroleum Oil and Gas Field So Be Aware</div>
            </div>
            <div className="sd-follow">
                <span className="sd-follow-text">Follow</span>
            </div> */}
    </div>
  );
}
