import "./commentcard.css";

export default function CommentCard({ com }) {
  return (
    <div className="cc">
      <div className="cc-userInfo">
        <span className="cc-username">{com.username}</span>
        <span className="cc-date">
          at {new Date(com.createdAt).toDateString()}
        </span>
        <span className="cc-report">
          Reply <i class="fas fa-reply"></i>
        </span>
        <span className="cc-report">
          Report <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <div className="cc-desc">
        {com.replyTo !== "" && (
          <span className="cc-reply-text">
            <span className="cc-reply-desc">
              <span className="cc-reply-user">@{com.replyUser}</span>
              {com.replyText}
            </span>
          </span>
        )}
        <span>{com.desc}</span>
      </div>
      <div className="cc-bottom">
        {/* <span>
          Replies <i class="far fa-comment"></i>
        </span> */}
      </div>
    </div>
  );
}
