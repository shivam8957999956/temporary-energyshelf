import { useContext, useEffect, useState } from "react";
import "./write.css";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Context } from "../../context/Context";
import Compressor from "compressorjs";
import RichTextEditor from "../../components/richTextEditor/RichTextEditor";

import parse from "html-react-parser";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
export default function Write() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editor, setEditor] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [cat, setCat] = useState("MT blogs");
  const [photo, setPhoto] = useState("");
  const [publish, setPublish] = useState("Publish");
  const [id, setId] = useState("");
  const [file, setFile] = useState(
    "https://m.foolcdn.com/media/dubs/images/GettyImages-1299972938.width-880.jpg",
  );
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [userPost, setUserPost] = useState(user.username);

  const [scat, setScat] = useState([]);
  const [value, setValue] = useState("");
  const getValue = (value) => {
    setValue(value);
  };
  const handleEditor = () => {
    if (editor) {
      setEditor(false);
    } else {
      setEditor(true);
    }
  };
  const handleQuiz = () => {
    if (quiz) {
      setQuiz(false);
    } else {
      setQuiz(true);
    }
  };

  useEffect(() => {
    if (path !== undefined) console.log(path);
    const getCats = async () => {
      try {
        const res = await axios.get("/category");
        // console.log(res);
        setScat(res.data);
      } catch (err) {}
    };
    getCats();
  }, []);

  useEffect(() => {
    const getPost = async () => {
      if (path !== undefined) {
        try {
          const res = await axios.get("/posts/" + path);
          // setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
          setId(res.data._id);
          setCat(res.data.categories);
          setPhoto(res.data.photo);
          setUserPost(res.data.username);
          setEditor(res.data.editor);
          setQuiz(res.data.quiz);
          setFile(res.data.photo);
          // console.log(res.data);
        } catch (err) {
          // setLoading(true);
        }
      }
    };
    getPost();
  }, [path]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (cat == "") setCat("general");
    setPublish("Publishing Please Wait...");
    const newPost = {
      username: userPost,
      title,
      desc: value,
      categories: cat,
      userId: user._id,
      editor,
      quiz,
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
    // } else {
    //   if (path !== undefined) {
    //     newPost.photo = photo;
    //   }
    // }
    try {
      let res;
      if (path === undefined) {
        res = await axios.post("/posts", newPost);
      } else {
        res = await axios.put("/posts/" + path, newPost);
      }
      window.location.replace("/post/" + res.data._id);
      console.log(res);
      setPublish("published");
    } catch (err) {
      setPublish("Retry to Publish");
    }
  };
  const handleCompressedUpload = (e) => {
    const image = e;
    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        setFile(compressedResult);
      },
    });
  };

  //editor
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="write">
      {file === null ? (
        path !== undefined && <img className="writeImg" src={photo} alt="" />
      ) : (
        <img className="writeImg" src={file} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          {/* <label htmlFor="fileInput" className="thumnail">
            Thumbnail <i className="fas fa-plus"></i>
          </label> */}
          {/* <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => handleCompressedUpload(e.target.files[0])}
          /> */}
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <input
          className="thumnailval"
          type="text"
          placeholder="Add Thumnail link"
          value={file}
          onChange={(e) => setFile(e.target.value)}
        />
        <div
          className="selectCatergoryGroup"
          style={{ backgroundColor: "ff997a" }}>
          {user.admin === true && (
            <>
              <span
                className="selectCategory -w"
                onClick={handleEditor}
                style={{
                  backgroundColor: editor ? "#ff5823" : "#ffffff",
                  color: editor === false ? "#ff5823" : "#ffffff",
                }}>
                <i class="singlePostEditorCoiceIcon far fa-user"></i>Editor
                Choice
              </span>
              <span
                className="selectCategory -w"
                onClick={handleQuiz}
                style={{
                  backgroundColor: quiz ? "#ff5823" : "#ffffff",
                  color: quiz === false ? "#ff5823" : "#ffffff",
                }}>
                <i class="singlePostEditorCoiceIcon fas fa-file-alt"></i>Quiz
              </span>
            </>
          )}
          {scat.map((c) => (
            <span className="selectCategory" onClick={() => setCat(c.name)}>
              {c.name}
            </span>
          ))}
          {cat !== "" && (
            <span className="selectedCategory">
              Selected : {cat}
              <i
                class="deleteCat far fa-times-circle"
                onClick={() => setCat("")}></i>
            </span>
          )}
        </div>

        <div className="writeTextEditor">
          {/* <pre>{stateToHTML(editorState.getCurrentContent(), options)}</pre> */}
          <div className="editor">
            <RichTextEditor initialValue={desc} getValue={getValue} />
          </div>
          {/* <div className="display">{parse(value)}</div> */}
        </div>
        <button className="writeSubmit" type="submit">
          {publish}
        </button>
      </form>
    </div>
  );
}
