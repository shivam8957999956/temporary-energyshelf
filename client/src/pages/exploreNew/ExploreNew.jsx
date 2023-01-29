import "./exploreNew.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../config";

export default function ExploreNew() {
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, []);
  const [likeAll, setLikeAll] = useState([]);
  const [editor, setEditor] = useState([]);
  const [event, setEvent] = useState([]);
  const [cont, setCont] = useState([]);
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res2 = await axios.get("/popularity/likes");
      setLikeAll(res2.data);

      // console.log(res2.data);
      const res1 = await axios.get("/profile/views");
      // console.log(res1.data);
      setCont(res1.data);
      const res3 = await axios.get("/posts/?editor=true");
      // console.log(res1.data);
      setEditor(res3.data);
      const res4 = await axios.get("/event");
      // console.log(res.data);

      setEvent(res4.data);
      const res5 = await axios.get("/category");
      // console.log(res);
      setCat(res5.data);
    };
    get();
  }, []);
  function convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
  }

  return (
    <div className="en">
      <div className="en-header">
        <img
          className="en-header-img"
          src="https://images.pexels.com/photos/45072/pexels-photo-45072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <div className="en-header-text-lg">ENERGY SHELF</div>
        <div className="en-header-text-sm">
          Ever Green Knowledge Of Technology.
        </div>
        <div className="en-header-buttons">
          <div className="en-header-button-1">Start Shelf</div>{" "}
          <div className="en-header-button-2">
            New Blog
            <i class="en-header-button-2-icon fas fa-plus-circle"></i>
          </div>
        </div>
      </div>
      <div className="en-middle">
        <div className="en-middle-1">
          <div className="en-middle-1-head">
            What You Can Get At Energy Shelf?
          </div>
          <div className="en-middle-1-cards">
            <div className="en-middle-1-card">
              Daily
              <Link className="link" to="/">
                <span style={{ color: "rgb(255, 36, 91)" }}>{" Blogs "}</span>
              </Link>
              of Energy Geeks all over the globe{" "}
            </div>
            <div
              className="en-middle-1-card"
              style={{ borderTop: "2px solid rgb(72, 157, 255)" }}>
              Complete
              <Link className="link" to="/studyguide">
                <span style={{ color: "rgb(72, 157, 255)" }}>
                  {" Study Material "}
                </span>
              </Link>
              for Beginner and Make You Competition Ready
            </div>
            <div
              className="en-middle-1-card "
              style={{ borderTop: "2px solid rgb(0, 199, 66)" }}>
              Best Live Educational and Social
              <Link className="link" to="/events">
                <span style={{ color: " rgb(0, 199, 66)" }}>{" Events "}</span>
              </Link>
              can be Shared Through Energy Shelf
            </div>
            <div
              className="en-middle-1-card"
              style={{ borderTop: "2px solid orange" }}>
              A platform To test Skills Through
              <Link className="link">
                <span style={{ color: "orange" }}>{" Quizzes "}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="en-middle-2">
          <div className="en-middle-2-head">Most Liked Blogs</div>
          <div className="en-middle-2-cards">
            <div className="en-middle-2-card-1">
              <div class="en-image">
                <img
                  class="en-image__img"
                  src={likeAll[0] && likeAll[0].photo}
                  alt="Bricks"></img>

                <div class="en-image__overlay image__overlay">
                  <div className="en-liked-card">
                    <div className="en-liked-card-text">
                      {likeAll[0] && likeAll[0].title}
                    </div>
                    <div className="en-liked-card-date">
                      {likeAll[0] && likeAll[0].username}
                      <i
                        class="far fa-clock"
                        style={{
                          fontSize: "12px",
                          marginLeft: "15px",
                          marginRight: "4px",
                        }}></i>{" "}
                      {likeAll[0] &&
                        new Date(likeAll[0].createdAt).toDateString()}
                    </div>
                    <div className="en-liked-card-desc">
                      {likeAll[0] && convertToPlain(likeAll[0].desc)}
                    </div>
                    {likeAll[0] && (
                      <div className="en-liked-card-veiw">
                        <Link className="link" to={"/post/" + likeAll[0]._id}>
                          View More
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="en-middle-2-card-2">
              <div className="en-middle-2-card-2-card">
                <div class="en-image">
                  <img
                    class="en-image__img"
                    src={likeAll[1] && likeAll[1].photo}
                    alt="Bricks"></img>

                  <div class="en-image__overlay image__overlay">
                    <div className="en-liked-card">
                      <div className="en-liked-card-text-1">
                        {likeAll[1] && likeAll[1].title}
                      </div>
                      <div className="en-liked-card-date-1">
                        {likeAll[1] && likeAll[1].username}
                        <i
                          class="far fa-clock"
                          style={{
                            fontSize: "12px",
                            marginLeft: "15px",
                            marginRight: "4px",
                          }}></i>{" "}
                        {likeAll[1] &&
                          new Date(likeAll[1].createdAt).toDateString()}
                      </div>
                      {likeAll[1] && (
                        <div className="en-liked-card-veiw-1">
                          <Link className="link" to={"/post/" + likeAll[1]._id}>
                            View More
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="en-middle-2-card-2-card">
                <div class="en-image">
                  <img
                    class="en-image__img"
                    src={likeAll[3] && likeAll[3].photo}
                    alt="Bricks"></img>

                  <div class="en-image__overlay image__overlay">
                    <div className="en-liked-card">
                      <div className="en-liked-card-text-1">
                        {likeAll[3] && likeAll[3].title}
                      </div>
                      <div className="en-liked-card-date-1">
                        {likeAll[3] && likeAll[3].username}
                        <i
                          class="far fa-clock"
                          style={{
                            fontSize: "12px",
                            marginLeft: "15px",
                            marginRight: "4px",
                          }}></i>{" "}
                        {likeAll[3] &&
                          new Date(likeAll[3].createdAt).toDateString()}
                      </div>
                      {likeAll[3] && (
                        <div className="en-liked-card-veiw-1">
                          <Link className="link" to={"/post/" + likeAll[3]._id}>
                            View More
                          </Link>
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="en-middle-2-card-2">
              <div className="en-middle-2-card-2-card">
                <div class="en-image">
                  <img
                    class="en-image__img"
                    src={likeAll[4] && likeAll[4].photo}
                    alt="Bricks"></img>

                  <div class="en-image__overlay image__overlay">
                    <div className="en-liked-card">
                      <div className="en-liked-card-text-1">
                        {likeAll[4] && likeAll[4].title}
                      </div>
                      <div className="en-liked-card-date-1">
                        {likeAll[4] && likeAll[4].username}
                        <i
                          class="far fa-clock"
                          style={{
                            fontSize: "12px",
                            marginLeft: "15px",
                            marginRight: "4px",
                          }}></i>{" "}
                        {likeAll[4] &&
                          new Date(likeAll[4].createdAt).toDateString()}
                      </div>
                      {likeAll[4] && (
                        <div className="en-liked-card-veiw-1">
                          <Link className="link" to={"/post/" + likeAll[4]._id}>
                            View More
                          </Link>
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="en-middle-2-card-2-card">
                <div class="en-image">
                  <img
                    class="en-image__img"
                    src={likeAll[5] && likeAll[5].photo}
                    alt="Bricks"></img>

                  <div class="en-image__overlay image__overlay">
                    <div className="en-liked-card">
                      <div className="en-liked-card-text-1">
                        {likeAll[5] && likeAll[5].title}
                      </div>
                      <div className="en-liked-card-date-1">
                        {likeAll[5] && likeAll[5].username}
                        <i
                          class="far fa-clock"
                          style={{
                            fontSize: "12px",
                            marginLeft: "15px",
                            marginRight: "4px",
                          }}></i>{" "}
                        {likeAll[5] &&
                          new Date(likeAll[5].createdAt).toDateString()}
                      </div>
                      {likeAll[5] && (
                        <div className="en-liked-card-veiw-1">
                          <Link className="link" to={"/post/" + likeAll[5]._id}>
                            View More
                          </Link>
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="en-middle-3">
          <div className="en-middle-3-left">
            <div className="en-middle-3-left-head">
              Popular Contributors{" "}
              <i class="en-middle-3-left-head-icon fas fa-trophy"></i>
            </div>
            <div className="en-middle-3-left-cards">
              {cont.map((p) => (
                <div className="en-middle-3-left-card">
                  <img
                    className="en-middle-3-left-card-img"
                    src={p.profilePic}
                    alt=""
                  />
                  <div className="en-middle-3-left-card-r">
                    <Link className="link" to={"/profile/" + p.username}>
                      <div className="en-middle-3-left-card-r-title">
                        {p.username}
                      </div>
                    </Link>
                    <div className="en-middle-3-left-card-r-desgination">
                      {"#" + p.designation}
                    </div>
                    <div className="en-middle-3-left-card-r-date">
                      <i
                        class="en-middle-3-left-card-r-date-icon far fa-eye"
                        style={{ color: "orange" }}></i>
                      {p.views}
                      <i
                        class=" en-middle-3-left-card-r-date-icon far fa-thumbs-up"
                        style={{ color: "blue" }}></i>
                      {p.totalLikes}
                      <i
                        class=" en-middle-3-left-card-r-date-icon far fa-user"
                        style={{ color: "red" }}></i>
                      {p.followers.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="en-middle-3-right"></div>
        </div>
        <div className="en-middle-4">
          <div className="en-middle-4-left-head">
            Editors Choices{" "}
            <i class="en-middle-4-left-head-icon fas fa-crown"></i>
          </div>
          <div className="en-middle-4-cards">
            <div class="en-4-image">
              <img
                class="en-4-image__img"
                src={editor[1] && editor[1].photo}
                alt="Bricks"></img>

              <div class="en-4-image__overlay image__overlay--blur">
                <div className="en-4-liked-card">
                  <div className="en-4-liked-card-text-1">
                    {editor[1] && editor[1].title}
                  </div>

                  <div className="en-4-liked-card-date-1">
                    {editor[1] && editor[1].username}
                    <i
                      class="far fa-clock"
                      style={{
                        fontSize: "10px",
                        marginLeft: "15px",
                        marginRight: "4px",
                      }}></i>{" "}
                    {editor[1] && new Date(editor[1].createdAt).toDateString()}
                  </div>
                  <div className="en-4-liked-card-desc-1">
                    {editor[1] && convertToPlain(editor[1].desc)}
                  </div>
                  {editor[1] && (
                    <div className="en-4-liked-card-veiw-1">
                      <Link className="link" to={"/post/" + editor[1]._id}>
                        View More
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="en-4-image">
              <img
                class="en-4-image__img"
                src={editor[0] && editor[0].photo}
                alt="Bricks"></img>

              <div class="en-4-image__overlay image__overlay--blur">
                <div className="en-4-liked-card">
                  <div className="en-4-liked-card-text-1">
                    {editor[0] && editor[0].title}
                  </div>

                  <div className="en-4-liked-card-date-1">
                    {editor[0] && editor[0].username}
                    <i
                      class="far fa-clock"
                      style={{
                        fontSize: "10px",
                        marginLeft: "15px",
                        marginRight: "4px",
                      }}></i>{" "}
                    {editor[0] && new Date(editor[0].createdAt).toDateString()}
                  </div>
                  <div className="en-4-liked-card-desc-1">
                    {editor[0] && convertToPlain(editor[0].desc)}
                  </div>
                  {editor[0] && (
                    <div className="en-4-liked-card-veiw-1">
                      <Link className="link" to={"/post/" + editor[0]._id}>
                        View More
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="en-4-image">
              <img
                class="en-4-image__img"
                src={editor[3] && editor[3].photo}
                alt="Bricks"></img>

              <div class="en-4-image__overlay image__overlay--blur">
                <div className="en-4-liked-card">
                  <div className="en-4-liked-card-text-1">
                    {editor[3] && editor[3].title}
                  </div>
                  <div className="en-4-liked-card-date-1">
                    {editor[3] && editor[3].username}
                    <i
                      class="far fa-clock"
                      style={{
                        fontSize: "10px",
                        marginLeft: "15px",
                        marginRight: "4px",
                      }}></i>{" "}
                    {editor[3] && new Date(editor[3].createdAt).toDateString()}
                  </div>
                  <div className="en-4-liked-card-desc-1">
                    {editor[3] && convertToPlain(editor[3].desc)}
                  </div>
                  {editor[3] && (
                    <div className="en-4-liked-card-veiw-1">
                      <Link className="link" to={"/post/" + editor[3]._id}>
                        View More
                      </Link>
                    </div>
                  )}{" "}
                </div>
              </div>
            </div>

            <div class="en-4-image">
              <img
                class="en-4-image__img"
                src={editor[4] && editor[4].photo}
                alt="Bricks"></img>

              <div class="en-4-image__overlay image__overlay--blur">
                <div className="en-4-liked-card">
                  <div className="en-4-liked-card-text-1">
                    {editor[4] && editor[4].title}
                  </div>

                  <div className="en-4-liked-card-date-1">
                    {editor[4] && editor[4].username}
                    <i
                      class="far fa-clock"
                      style={{
                        fontSize: "10px",
                        marginLeft: "15px",
                        marginRight: "4px",
                      }}></i>{" "}
                    {editor[4] && new Date(editor[4].createdAt).toDateString()}
                  </div>
                  <div className="en-4-liked-card-desc-1">
                    {editor[4] && convertToPlain(editor[4].desc)}
                  </div>
                  {editor[4] && (
                    <div className="en-4-liked-card-veiw-1">
                      <Link className="link" to={"/post/" + editor[4]._id}>
                        View More
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="en-middle-5">
          <div className="en-middle-5-head">Events to Explores</div>

          <div className="en-middle-5-cards">
            {event.slice(0, 4).map((p) => (
              <Link className="link" to={p.link}>
                <div className="en-middle-5-card">
                  <div className="en-middle-5-card-date">
                    {p.date.split("-")[2]}
                  </div>
                  <div className="en-middle-5-card-month">
                    {p.date.split("-")[1] + "' " + p.date.split("-")[0]}
                  </div>
                  <div className="en-middle-5-card-title">{p.title}</div>
                  <div className="en-middle-5-card-time">{p.time}</div>
                  <div className="en-middle-5-card-desc">{p.desc}</div>
                </div>
              </Link>
            ))}
            <Link className="link" to="/events">
              <div className="en-middle-5-card more">
                <div className="en-middle-5-more">View more</div>{" "}
                <div className="en-middle-5-more-icon">
                  <i class="fas fa-angle-right"></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="en-middle-6">
          <div className="en-middle-6-l">
            <div className="en-middle-6-l-head">Categories You May like</div>
            <div className="en-middle-6-l-cards">
              {cat.slice(0, 18).map((p) => (
                <Link className="link" to={"/?cat=" + p.name}>
                  <div className="en-middle-6-l-card">{p.name}</div>
                </Link>
              ))}
            </div>
          </div>
          <div className="en-middle-6-r">
            <img
              src="https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="en-middle-7">
          <div className="en-middle-7-1">We Have Lot More Content</div>
          <div className="en-middle-7-2">So, Explore the Shelf</div>
        </div>
      </div>
    </div>
  );
}
