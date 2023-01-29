import "./subpost.css";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
export default function SubPost({ post }) {
  function convertToPlain(html) {
    // Create a new div element
    // console.log(post);
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }
  const PF = "http://localhost:5000/images/";
  return (
    <div>
      <div className="ex-b-sec-o-l">
        {post ? (
          <Link className="link" to={`/post/${post._id}`}>
            <div className="ex-b-sec-o-l-img">
              <img
                className="ex-b-sec-o-l-img2"
                src={post && post.photo}
                alt=""
              />
            </div>
          </Link>
        ) : (
          <div className="ex-b-sec-o-l-img">
            <img
              className="ex-b-sec-o-l-img2"
              src={post && post.photo}
              alt=""
            />
          </div>
        )}

        <span className="ex-b-sec-o-l-author">
          {post
            ? post.username +
              " . " +
              new Date(post.createdAt).toLocaleDateString()
            : "Robin . 12/12/2021"}
        </span>

        <span className="ex-b-sec-o-l-title">
          {post ? (
            <Link className="link" to={`/post/${post._id}`}>
              {post ? post.title : "title"}
            </Link>
          ) : (
            "this is tile of editor choices"
          )}
        </span>
        <span className="ex-b-sec-o-l-desc">
          {post
            ? convertToPlain(post.desc)
            : " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolori"}
        </span>
      </div>
    </div>
  );
}
