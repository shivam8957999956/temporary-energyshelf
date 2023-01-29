import "./subsidepost.css";
import { Link } from "react-router-dom";
export default function SubsidePost({ post }) {
  const PF = "http://localhost:5000/images/";
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
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
    </div>
  );
}
