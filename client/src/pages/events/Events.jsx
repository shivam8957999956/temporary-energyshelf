import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import EventSingle from "../../components/eventSingle/EventSingle";
import NewEventSingle from "../../components/newEventSingle/NewEventSingle";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./events.css";
export default function Events() {
  //past 0, today 1, future 2

  const [event, setEvent] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [fetching, setfetching] = useState(false);
  const [check, setCheck] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const myRef = useRef();
  const myRefUp = useRef();

  const [scat, setScat] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const getCats = async () => {
      try {
        const res = await axios.get("/category");
        // console.log(res);
        setScat(res.data);
      } catch (err) {}
    };
    getCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setfetching(true);
    if (user) {
      const newPost = {
        username: user.username,
        title,
        desc,
        link,
        date,
        time,
        photo: file,
      };
      // if (file) {
      //   const data = new FormData();
      //   const filename = Date.now() + file.name;
      //   data.append("name", filename);
      //   data.append("file", file);
      //   newPost.photo = filename;
      //   try {
      //     await axios.post("/upload", data);
      //   } catch (err) {}
      // }
      console.log(file);
      try {
        const res = await axios.post("/event", newPost);
        console.log(res);
        window.location.reload();
        // window.location.replace("/events");
      } catch (err) {}
      setfetching(false);
    } else {
      setfetching(false);
      window.location.replace("/login");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/event");
      // console.log(res.data);

      setEvent(res.data);
    };
    fetchPosts();
  }, []);
  const handleCheck = () => {
    if (check) setCheck(false);
    else setCheck(true);
  };
  return (
    <div className="event">
      <div className="e-header">
        <div className="e-header-left">
          <span className="e-h-new-left-text">
            We Provide You the Best Online Events{" "}
          </span>
          <div className="e-h-new">
            <span
              className="e-h-left-text"
              onClick={() =>
                myRef.current.scrollIntoView({ behavior: "smooth" })
              }>
              Request new Event
            </span>
            {/* <span
              className="e-h-right-text"
              onClick={() =>
                myRefUp.current.scrollIntoView({ behavior: "smooth" })
              }>
              Get Started
            </span> */}
          </div>
        </div>
        <div className="e-header-right">
          <img
            src="https://image.freepik.com/free-vector/design-inspiration-concept-illustration_114360-3992.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="ref" ref={myRefUp}></div>
      <div className="eventBottom">
        <div className="eventWrapperTop">
          <div className="e-top-top">
            <span
              className="e-top-top-text"
              style={{
                color: check == 1 ? "white" : "black",
                backgroundColor: check == 1 ? "#ff5823" : "white",
              }}
              onClick={() => setCheck(1)}>
              Today Events
            </span>
            <span
              className="e-top-top-text"
              style={{
                color: check == 2 ? "white" : "black",
                backgroundColor: check == 2 ? "#ff5823" : "white",
              }}
              onClick={() => setCheck(2)}>
              Upcomming Event
            </span>
            <span
              className="e-top-top-text"
              style={{
                color: check == 0 ? "white" : "black",
                backgroundColor: check == 0 ? "#ff5823" : "white",
              }}
              onClick={() => setCheck(0)}>
              Past Event
            </span>
          </div>
        </div>
        <div className="e-events">
          {event.map((p) => (
            <>
              <NewEventSingle event={p} check={check} />
            </>
          ))}
          {/* <NewEventSingle /> */}
        </div>
        <div className="bottom-event">Create Your Event</div>
        <div className="e-h-left" ref={myRef}>
          <div className="e-h-left-left">
            {file === null && (
              <img
                className="e-h-left-left-img"
                src="https://image.freepik.com/free-vector/flat-design-ui-ux-background-illustrated_23-2149054880.jpg"
                alt=""
              />
            )}
            {file && <img className="e-h-left-left-img" src={file} alt="" />}
          </div>
          <div className="e-h-left-right">
            <form className="e-h-left-form" onSubmit={handleSubmit}>
              {/* <label className="e-h-left-form-heading">
                Create Your Own Events
              </label> */}
              <input
                className="e-input"
                type="text"
                placeholder="Name Of the Event"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="e-input"
                type="text"
                placeholder="Description Of the Event"
                onChange={(e) => setDesc(e.target.value)}
              />
              <input
                className="e-input"
                type="text"
                placeholder="thumbnail Of the Event"
                onChange={(e) => setFile(e.target.value)}
              />
              <input
                className="e-input"
                type="date"
                placeholder="Name Of the Event"
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                className="e-input"
                type="text"
                placeholder="Enter the time"
                onChange={(e) => setTime(e.target.value)}
              />
              {/* <label className="e-input" htmlFor="e-file">
                Select the Image
              </label>
              <input
                type="file"
                id="e-file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              /> */}
              <input
                className="e-input"
                type="text"
                placeholder="Zoom link or G-meet link"
                onChange={(e) => setLink(e.target.value)}
              />
              <button className="e-button" type="submit" disabled={fetching}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
