import Post from "../post/Post";
import PostSingle from "../postSingle/PostSingle";
import SubsidePost from "../subsidePost/SubsidePost";
import TrendingToday from "../trendingToday/TrendingToday";
import "./posts.css";

export default function Posts({ posts, popular }) {
  return (
    <div className="main-p">
      <div className="trending">
        <div className="trendingText">Trending</div>
        <div className="trendingCard">
          {popular.map((p) => (
            <>
              <TrendingToday post={p} />
            </>
          ))}
        </div>
      </div>
      <div className="posts">
        {posts.map((p) => (
          <>
            {/* <Post post={p} /> */}
            <PostSingle post={p} />
          </>
        ))}
      </div>
    </div>
  );
}
