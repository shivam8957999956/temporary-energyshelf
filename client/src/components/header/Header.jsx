import { useEffect, useRef, useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const delay = 2500;

  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    window.location.replace("/?title=" + search);
  };
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1,
        ),
      delay,
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitlesLg o">Learn </span>
        <span className="headerTitlesLg t">Without Limits</span>
        <div className="headerTitlesSm">
          <div className="">Aim to Make You Alrounder </div>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Student</div>
              <div className="i-title-item">Petroleum Engineer</div>
              <div className="i-title-item">Engineer</div>
              {/* <div className="i-title-item">999090</div> */}
            </div>
          </div>
        </div>

        {/* <div className="headerSearch">
          <form className="input" onSubmit={handleSubmit}>
            <input
              className="headerSearchKeyword"
              type="headerSearchKeyword"
              placeholder="What Do You what to Search?"
              onChange={(e) => setSearch(e.target.value)}
            />
             <Link className="link" to={`/?title=${"the"}`}> 
            <button className="headerSearchBtn" type="submit">
              Search
            </button> */}
        {/* </Link> */}
        {/* </form> */}
        {/* </div> */}
        <div className="left">
          <div className="notiTitle">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla.
          </div>
          <div className="notiDesc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, nulla.
          </div>
          <div className="notiTime">1 hrs ago</div>
          <img
            src="https://source.unsplash.com/random/?education,technology,petroleum"
            alt=""
            className="notiImg"
          />
        </div>
      </div>
      <div
        className="headerImg"
        src="https://ese224.seas.upenn.edu/wp-content/uploads/2018/11/background-website-light-blue-wallpapers-background-2.jpg"
        alt=""></div>
    </div>
  );
}
