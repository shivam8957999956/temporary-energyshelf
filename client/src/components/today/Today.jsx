import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./today.css";
export default function Today({ t }) {
  const [val, setValue] = useState(true);
  useEffect(() => {
    const check = () => {
      let todayY = new Date().getFullYear();
      let todayD = new Date().getDate();
      let todayM = new Date().getMonth();
      let postY = new Date(t.createdAt).getFullYear();
      let postM = new Date(t.createdAt).getMonth();
      let postD = new Date(t.createdAt).getDay();
    };
    check();
  }, []);

  return (
    <>
      {val ? (
        <Link className="link" to={`/post/${t._id}`}>
          <div className="td"> {t.title}</div>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
