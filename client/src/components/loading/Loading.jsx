import "./loading.css";

export default function Loading() {
  return (
    <div className="btn-bg">
      <button className="btn">
        <span className="spinner"></span>
        <span className="btn__text">Knowledge is loading...</span>
      </button>
    </div>
  );
}
