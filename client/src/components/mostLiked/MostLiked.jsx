import axios from "axios";
import { useEffect, useState } from "react";
import "./mostLiked.css";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
export default function MostLiked() {
  const [likeAll, setLikeAll] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res2 = await axios.get("/popularity/likes");
      setLikeAll(res2.data);
    };
    get();
  });

  return (
    <div className="ml">
      <div className="ml-top">
        {likeAll.map((p) => (
          <Link className="link" to={`/post/${p._id}`}>
            <div className="ml-top-1">
              <img className="ml-top-1-img" src={p.photo} alt="" />
              <div className="ml-top-1-text">{p.title}</div>
              <div className="ml-top-1-like">
                {" "}
                <i class=" ml-top-1-icon far fa-thumbs-up"></i>
                {p.liked.length}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
