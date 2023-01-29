import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Eventcard from "../../components/eventcard/Eventcard";
import Loading from "../../components/loading/Loading";
import MostLiked from "../../components/mostLiked/MostLiked";
import PostSingle from "../../components/postSingle/PostSingle";
import SubPost from "../../components/subPost/SubPost";
import Header from "../../components/header/Header";
import SubsidePost from "../../components/subsidePost/SubsidePost";
import Today from "../../components/today/Today";
import "./explore.css";

export default function Explore() {
  const [posts, setPost] = useState([]);
  const [today, setToday] = useState([]);
  const [event, setEvent] = useState([]);
  const [cats, setCat] = useState([]);
  const [editor, setEditor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cont, setCont] = useState([]);

  const PF = "http://localhost:5000/images/";
  function intToString(num) {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  }
  useEffect(() => {
    const getPost = async () => {
      const res1 = await axios.get("/popularity");
      setPost(res1.data);
      const res2 = await axios.get("/popularity/?today=interviews");
      console.log(res1);
      setToday(res2.data);
    };
    getPost();
    const getContributers = async () => {
      const res1 = await axios.get("/profile/views");
      // console.log(res1.data);
      setCont(res1.data);
    };
    getContributers();

    const getPost1 = async () => {
      const res1 = await axios.get("/posts/?editor=true");
      // console.log(res1.data);
      setEditor(res1.data);
      setLoading(true);
    };
    getPost1();
    const getCats = async () => {
      const res = await axios.get("/category");
      // console.log(res);
      setCat(res.data);
    };
    getCats();
    const fetchPosts = async () => {
      const res = await axios.get("/event");
      // console.log(res.data);

      setEvent(res.data);
    };
    fetchPosts();
  });

  return (
    <>
      {loading === false ? (
        <div className="loading-bg">
          <Loading />
        </div>
      ) : (
        <div className="ex">
          <div className="ex-top-r">
            <div className="ex-top-r-img"></div>
            <div className="ex-top-text-1-r">Learn</div>
            <div className="ex-top-text-2-r">Without Limit</div>
            <div className="ex-top-text-3-r">
              Lorem ipsum dolor sit amet consectetur,
            </div>
            <div className="ex-top-button-r">
              <Link className="link" to="/">
                <span className="ex-top-button-1-r">Open Shelf</span>
              </Link>
              <span className="ex-top-button-2-r">Open Shelf</span>
            </div>
          </div>
          {/* <div className="ex-top">
            <div className="ex-top-left">
              <img
                className="ex-top-left-img"
                src="https://i.ibb.co/1nKsmhc/Golden-Pumpjack-And-Spilled-Oil-On-Bolivars-Venezuela3-Dsculptors.webp"
                alt=""
              />
              <div className="ex-top-left-text">
                <span className="ex-top-left-title">
                  WelCome to EnergyShelf This is descriptive post About How to
                  spread your Knowledge
                </span>
                <div className="ex-top-left-subtext">
                  <span className="ex-top-left-name">Shivam The Traitor</span>
                  <span className="ex-top-left-date">2 hrs ago</span>
                </div>
              </div>
            </div>
              
            <div className="ex-top-left-r"></div>
            <div className="ex-top-right">
              <span className="ex-top-right-title">
                Top Contributors of MTP
              </span>
              {cont.map((p) => (
                <div className="ex-top-right-card">
                  <div className="ex-top-right-card-left">
                    <img
                      className="ex-top-right-card-img"
                      src={p.profilePic}></img>
                  </div>
                  <div className="ex-top-right-card-left">
                    <span className="ex-top-right-card-title">
                      <Link className="link" to={`/profile/${p.username}`}>
                        {" "}
                        {p.username}
                      </Link>
                    </span>
                    <span className="ex-top-right-card-time">
                      {p.designation}
                    </span>
                    <span className="ex-top-right-card-rating">
                      {intToString(p.views)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div className="ex-bottom">
            <div className="ex-bottom-left">
              <span className="ex-b-sec-o-t">Most Liked </span>

              <MostLiked />
              <div className="ex-b-sec-o">
                <span className="ex-b-sec-o-t">Editor's Choices</span>
                <div className="ex-b-l-sec-o-o">
                  <div className="ex-b-sec-o-l">
                    {/* <SubPost post={editor[0]} /> */}
                    <PostSingle post={editor[0]} />
                  </div>
                  <div className="ex-b-sec-o-l">
                    {/* <SubPost post={editor[0]} /> */}
                    <PostSingle post={editor[1]} />
                  </div>
                  <div className="ex-b-sec-o-l">
                    {/* <SubPost post={editor[0]} /> */}
                    <PostSingle post={editor[2]} />
                  </div>
                  <div className="ex-b-sec-o-l">
                    {/* <SubPost post={editor[0]} /> */}
                    <PostSingle post={editor[3]} />
                  </div>
                  {/* <div className="ex-b-sec-o-r">
                    <SubsidePost post={editor[1]} />
                    <SubsidePost post={editor[2]} />
                    <SubsidePost post={editor[3]} />
                  </div> */}
                </div>
              </div>
              <div className="ex-b-b-trend">
                <span className="ex-b-b-t-heading">Trending</span>

                <div className="ex-b-b">
                  {posts[0] && (
                    <PostSingle post={posts[0]} className="ex-b-b-temp" />
                  )}
                  {posts[1] && (
                    <PostSingle post={posts[1]} className="ex-b-b-temp" />
                  )}
                  {/* <SubPost post={posts[1]} className="ex-b-b-temp" /> */}
                </div>
                <div className="ex-b-b-t">
                  {/* {posts.map((p) => ( */}
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[2]} />
                  </div>
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[3]} />
                  </div>
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[4]} />
                  </div>
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[5]} />
                  </div>
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[6]} />
                  </div>
                  <div className="ex-b-b-t-card">
                    <SubsidePost post={posts[7]} />
                  </div>

                  {/* ))} */}
                </div>
                <Link className="link" to={`/`}>
                  <span className="viewMoreBlogs">
                    View More Blogs <i class="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="ex-bottom-right">
              <div className="ex-top-right">
                <span className="ex-top-right-title">
                  Top Contributors of MTP
                </span>
                {cont.map((p) => (
                  <div className="ex-top-right-card">
                    <div className="ex-top-right-card-left">
                      <img
                        className="ex-top-right-card-img"
                        src={p.profilePic}></img>
                    </div>
                    <div className="ex-top-right-card-left">
                      <span className="ex-top-right-card-title">
                        <Link className="link" to={`/profile/${p.username}`}>
                          {" "}
                          {p.username}
                        </Link>
                      </span>
                      <span className="ex-top-right-card-time">
                        <span className="desgin-bg"># {p.designation}</span>
                        <i class="ex-top-right-card-rating-icon far fa-eye"></i>
                        <span className="ex-top-right-card-rating">
                          {intToString(p.views)}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ex-bottom-right-t1">
                <span className="t1-title">What is MTP?</span>
                <span className="t1-desc">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Iusto illum cum corrupti mollitia tempore ducimus aperiam,
                  consequatur enim sequi nostrum sed, perferendis repudiandae?
                </span>
                <div className="t1-icons">
                  <i class="t1-icon fab fa-twitter"></i>
                  <i class="t1-icon fab fa-instagram"></i>
                  <i class="t1-icon fab fa-facebook"></i>
                  <i class="t1-icon fab fa-linkedin"></i>
                </div>
                <div className="explore-events">
                  <div className="explore-events-heading">Upcomming Events</div>
                  {event[0] && <Eventcard e={event[0]} />}
                  {event[1] && <Eventcard e={event[1]} />}
                  {event[2] && <Eventcard e={event[2]} />}
                  <Link className="link" to="/events">
                    <div className="explore-view-more">View More Events</div>
                  </Link>
                </div>
                <div className="explore-categories">
                  <span className="explore-cat-head">Popular categories</span>

                  {cats.map((p) => (
                    <Link className="link" to={`/?cat=${p.name}`}>
                      <div className="explore-cat">
                        {p.name}{" "}
                        <i className="explore-cat-icon fas fa-chevron-right"></i>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="todayShelf">
                  <div className="todayShelf-Head">Popular Interviews</div>
                  {today.map((p) => (
                    <Today t={p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
