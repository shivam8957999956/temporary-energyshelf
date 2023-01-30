import "./studyguide.css";

import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";
import StudyGuidePost from "../../components/studyGuidePost/StudyGuidePost";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import SubsidePost from "../../components/subsidePost/SubsidePost";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

export default function StudyGuide() {
  let editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(convertFromHTML("")),
  );
  const [description, setDescription] = useState(editorState);
  const [cats, setCats] = useState("");
  const [loading, setLoading] = useState(true);

  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const [posts, setPosts] = useState([]);
  const [cat, setCat] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const res = await axios.get("/posts/?user=MTP");
        const res = await axios.get("/posts/?admin=true");
        setPosts(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(true);
      }
    };
    fetchPosts();
    const getCats = async () => {
      const res = await axios.get("/category");
      // console.log(res);
      setCat(res.data);
    };
    getCats();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-bg">
          <Loading />
        </div>
      ) : (
        // <span className="loading">Loading Please wait . . .</span>
        <div className="sg">
          <div className="sg-header">
            <div className="sg-header-left">
              <span className="sg-header-left-head">Topics</span>
              {cat.map((p) => (
                <span
                  className="sg-header-left-cat"
                  onClick={() => setCats(p.name)}>
                  {p.name}
                </span>
              ))}
            </div>
            <div className="sg-header-middle">
              {/* <div className="sg-header-m-search">
                <div className="interExp-search"></div>
              </div> */}
              {posts.map((p) => (
                <>
                  {cats === "" ? (
                    <StudyGuidePost post={p} />
                  ) : (
                    p.categories == cats && <StudyGuidePost post={p} />
                  )}
                </>
              ))}
            </div>
            <div className="sg-header-right">
              <div className="sg-header-right-top">
                <span className="sg-header-right-top-head">Quizzes:</span>
                <span className="sg-header-right-top-view">View More</span>
              </div>
              <div className="sg-header-right-imgs">
                {posts.map((p) => (
                  <>
                    {cats === "" && p.quiz ? (
                      <SubsidePost post={p} />
                    ) : (
                      p.categories == cats && p.quiz && <SubsidePost post={p} />
                    )}
                  </>
                ))}
              </div>
              <div className="sg-header-right-bottom"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
