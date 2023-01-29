import Sidebar from "../../components/sidebar/Sidebar";
import Sidecoment from "../../components/sideComent/Sidecoment";
import SinglePost from "../../components/singlePost/SinglePost";
import SubsidePost from "../../components/subsidePost/SubsidePost";
import "./single.css";
export default function Single() {
  return (
    <div className="single">
      <SinglePost />
      {/* <Sidebar/> */}

      <Sidecoment />
    </div>
  );
}
