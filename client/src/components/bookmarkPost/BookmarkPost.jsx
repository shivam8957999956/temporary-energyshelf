import { Link } from "react-router-dom";
import "./bookmarkPost.css";

export default function BookmarkPost({ post }) {
  // console.log(post);
  return (
    <>
      {post && (
        <div className="bp">
          <img src={post.photo} alt="" className="bp-img" />
          <div className="bp-t">
            <Link className="link" to={`/post/${post._id}`}>
              <div className="bp-text">{post.title}</div>
            </Link>
            <div className="bp-name">
              {post.username} - {new Date(post.createdAt).toDateString()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
