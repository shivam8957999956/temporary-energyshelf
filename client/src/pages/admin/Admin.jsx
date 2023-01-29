import axios from "axios";
import { useState, useEffect } from "react";
import "./admin.css";
import { Link } from "react-router-dom";
export default function Admin() {
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState([]);
  const [check, setCheck] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyThumbNail, setCompanyThumbNail] = useState("");
  const [cat, setCat] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCat = {
      name: searchVal,
    };
    if (true) {
      try {
        const res1 = await axios.post("/category", newCat);
        console.log(res1.data);
      } catch (err) {
        // setCheck(false);
      }
    } else {
      // setCheck(false);
    }
  };
  const handleClick = async (e) => {
    // e.preventDefault();
    // console.log(e);
    //  if (user) {
    try {
      await axios.delete(`/category/${e}`, {});
      window.location.replace("/admin");
    } catch (err) {}
    //  } else {
    //    window.location.replace("/login");
    //  }
  };
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/category");
      // console.log(res);
      setCat(res.data);
    };
    getCats();
  }, []);
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const newCat = {
      name: companyName,
      logo: companyThumbNail,
    };
    if (true) {
      try {
        const res1 = await axios.post("/company", newCat);
        console.log(res1.data);
      } catch (err) {
        // setCheck(false);
      }
    } else {
      // setCheck(false);
    }
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      try {
        const res1 = await axios.get("/profile/search/?user=" + searchVal);
        console.log(res1.data);
        setSearch(res1.data);
        setCheck(true);
      } catch (err) {
        setCheck(false);
      }
    } else {
      setCheck(false);
    }
  };
  return (
    <div className="admin">
      <div className="adminCat">
        <span className="sg-header-left-head">Add new categories</span>
        <form className="sd-form" onSubmit={handleSubmit}>
          <input
            className="sd-input"
            type="text"
            placeholder="type new Catgory"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="sd-button" type="submit">
            add
          </button>
        </form>
      </div>
      <div className="adminCat">
        <span className="sg-header-left-head">Add new company tag</span>
        <form className="sd-form" onSubmit={handleSubmit2}>
          <input
            className="sd-input"
            type="text"
            placeholder="type new company tag"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            className="sd-input"
            type="text"
            placeholder="add image link"
            onChange={(e) => setCompanyThumbNail(e.target.value)}
          />
          <button className="sd-button" type="submit">
            add
          </button>
        </form>
        {/* {check && (
        <div className="sd-search-contents">
        {search.map((p) => (
          <Link className="link" to={`/profile/${p.username}`}>
          <div className="sd-search-content">
          <img className="sd-search-img" src={p.profilePic} alt="" />
          <div className="sd-search-val"> {p.username}</div>
          </div>
          </Link>
          ))}
          </div>
        )} */}
      </div>
      <div className="admin-all-category">
        <span className="sg-header-left-head">All Categories</span>
        {cat.length &&
          cat.map((p) => (
            <>
              <span className="sg-header-left-cat">
                {p.name}
                <i
                  class=" nse-r-delete far fa-trash-alt"
                  onClick={() => handleClick(p._id)}></i>{" "}
              </span>
            </>
          ))}
      </div>
      <div className="admin-all-category">
        <span className="sg-header-left-head">Search Users give authority</span>
        <form className="sd-form" onSubmit={handleSubmit1}>
          <input
            className="sd-input"
            type="text"
            placeholder="Search User by Name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="sd-button" type="submit">
            Search
          </button>
        </form>
        {check && (
          <div className="sd-search-contents">
            {search.map((p) => (
              <Link className="link" to={`/profile/${p.username}`}>
                <div className="sd-search-content">
                  <img className="sd-search-img" src={p.profilePic} alt="" />
                  <div className="sd-search-val"> {p.username}</div>
                  <div className="admin-val"> {p.admin ? "Admin" : ""}</div>
                </div>
              </Link>
            ))}
          </div>
        )}{" "}
      </div>
    </div>
  );
}
