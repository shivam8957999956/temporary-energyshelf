import "./eventcard.css";

export default function Eventcard({ e }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="ec">
      <img className="ec-image" src={e.photo} alt="" />
      <div className="ec-text">
        <span className="ec-title">{e.title}</span>
        <span className="ec-date">{e.date}</span>
      </div>
    </div>
  );
}
