import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BookmarkPost from "../../components/bookmarkPost/BookmarkPost";
import FFlist from "../../components/fflist/FFlist";
import Loading from "../../components/loading/Loading";
import Post from "../../components/post/Post";
import PostSingle from "../../components/postSingle/PostSingle";
import RecentComponent from "../../components/recentComponent/RecentComponent";
import SubsidePost from "../../components/subsidePost/SubsidePost";
import { Context } from "../../context/Context";
import "./profile.css";

import { axiosInstance } from "../../config";
export default function Profile() {
  const location = useLocation();
  const { user } = useContext(Context);
  const path = location.pathname.split("/")[2];
  const [profile, setProfile] = useState({});
  const PF = "http://localhost:5000/images/";
  var total = 0;
  const [totalLikes, setTotalLikes] = useState(0);
  const [posts, setPosts] = useState([]);
  const [likesSort, setlikesSort] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [allposts, setAllPosts] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [totalFollowers, settotalFollowers] = useState(0);
  const [loading, setLoading] = useState(true);

  const [check, setCheck] = useState(false);

  const [followCheck, setfollowCheck] = useState("false");
  const { search } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts([]);
      const res = await axios.get("/posts/?user=" + path);
      const res1 = await axios.get("/posts/");
      setPosts(res.data);
      setAllPosts(res1.data);

      setLoading(false);
    };
    fetchPosts();
  }, [search]);
  useEffect(() => {
    if (profile?.admin === true && profile?.faculty === true)
      setDesignation("Faculty & Admin");
    else if (profile?.faculty === true) setDesignation("Faculty");
    else if (profile?.admin === true) setDesignation("Admin");
    else setDesignation("Student");
  }, [profile]);
  useEffect(() => {
    const getPost = async () => {
      // window.location.reload();
      const res = await axios.get("/users/?user=" + path);
      // console.log(res.data[0].username);
      setProfile(res.data[0]);
      settotalFollowers(res.data[0].followers.length);
      if (
        res.data[0].followers &&
        res.data[0].followers.indexOf(user._id) > -1
      ) {
        setfollowCheck("true");
      }
      const res1 = await axios.get("/users");
      // console.log(res1.data);
      setFollowerList(res1.data);
    };
    getPost();
    const fetchPosts = async () => {
      setPosts([]);
      const res = await axios.get("/posts/?user=" + path);
      const res1 = await axios.get("/posts/");
      setPosts(res.data);
      setAllPosts(res1.data);

      setLoading(false);
    };
    fetchPosts();
  }, [path]);
  const handleFollow = async () => {
    const res = await axios.put("/profile/follow", {
      userId: profile._id,
      follower: user._id,
      check: followCheck,
    });
    // console.log(res.data);
    if (res.data.followers && res.data.followers.indexOf(user._id) > -1) {
      setfollowCheck("true");
    } else {
      setfollowCheck("false");
    }
    settotalFollowers(res.data.followers.length);
    //  setProfile(res.data[0]);
  };
  const [searchVal, setSearchVal] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      try {
        const res1 = await axios.get("/profile/search/?user=" + searchVal);
        // console.log(res1.data);
        setFollowerList(res1.data);
        setCheck(true);
      } catch (err) {
        setFollowerList([]);
      }
    } else {
      setCheck(false);
    }
  };
  return (
    <div className="profile">
      {loading ? (
        <div className="loading-bg">
          <Loading />
        </div>
      ) : (
        // <span className="loading">Loading profile . . .</span>
        <>
          <div className="profileTop">
            <div className="profileTop-l">
              {" "}
              <img className="profileImg" src={profile.profilePic} alt="" />
              <div className="profileTopLeft">
                <span className="profileName">{profile.username}</span>
                <span className="profileTagLine">{designation}</span>
                <span className="profileEmail">{profile.email}</span>
                <div className="profileRating">
                  <div className="profileRanking">
                    Energy :{" "}
                    {Number(
                      (profile.totalLikes * 0.8 + profile.views * 0.2).toFixed(
                        1,
                      ),
                    )}
                    <i class="energy fas fa-fire-alt"></i>
                  </div>

                  <div className="profileRanking viewss">
                    <i class="viewssIcon far fa-user"></i>
                    {" " + totalFollowers}
                  </div>

                  {/* <div className="profileStar">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="light fas fa-star"></i>
                  </div> */}
                </div>
                <div className="profileContactsMsg">
                  {/* <div className="profileSendMsg">
                    <i class="profileIconMSG fas fa-comment-alt"></i>
                    <span className="profileSendText">Send message</span>
                  </div>
                  <div className="profileSendMsg">
                    <i class="profileIconMSG fas fa-id-card"></i>
                    <span className="profileSendText">Send Contacts</span>
                  </div>
                  <div className="profileSendMsg">
                    <span className="profileSendText">Report Users</span>
                  </div> */}
                  {user.username !== path && (
                    <div
                      className="profileSendMsg FollowProfile"
                      onClick={handleFollow}>
                      {followCheck === "true" ? (
                        <span className="profileSendText">followed</span>
                      ) : (
                        <span className="profileSendText">follow</span>
                      )}
                    </div>
                  )}
                  {user.username == path && (
                    <>
                      <div className="profileSendMsg editProfile">
                        <i class="profileIconMSG fas fa-pencil-alt"></i>

                        <span className="profileSendText">
                          <Link className="link" to="/settings">
                            Edit Profile
                          </Link>
                        </span>
                      </div>
                      {user.admin == true ? (
                        <div className="profileSendMsg editProfile">
                          <span className="profileSendText">
                            <Link className="link" to="/admin">
                              Admin portal
                            </Link>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="profileTop-r">
              {user.username == path && (
                <div className="profileMiddle-l">
                  <span className="profileTitleMid-l">Bookmark</span>
                  <div className="profileMiddleLeft-l">
                    {allposts.map((p) => (
                      <>
                        {p.bookmark && p.bookmark.indexOf(user._id) > -1 && (
                          <BookmarkPost post={p} />
                        )}
                      </>
                    ))}
                  </div>
                  {/* <div className="profileMiddleRight"></div> */}
                </div>
              )}
            </div>
          </div>
          <div className="profileMid">
            {user.username == path && (
              <div className="fflists-carrd">
                {/*<div className="flists">
                  <span className="flists-title">Followers</span>
                  <form className="f-list-form" onSubmit={handleSearch}>
                <input
                  className="f-list-input"
                  type="text"
                  placeholder="search"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <button className="f-list-button" type="submit">
                  <i class="fas fa-search"></i>
                </button>
              </form>
                  <div className="flist">
                    {user.followers.map((p) => (
                      <FFlist userId={p} />
                    ))}
                  </div>
                </div> */}
                <div className="flists">
                  <span className="flists-title">
                    {profile.username + " "} Follows
                  </span>

                  <div className="flist">
                    {followerList.map((p) => (
                      <>
                        {p.followers && p.followers.indexOf(user._id) > -1 && (
                          <FFlist userId={p._id} />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="profileMiddle">
              <span className="profileTitleMid">Recent Activities</span>
              <div className="profileMiddleLeft">
                {posts.map((p) => (
                  <div className="profileMiddleLeftCard">
                    <SubsidePost post={p} />
                  </div>
                ))}
              </div>
              {/* <div className="profileMiddleRight"></div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
