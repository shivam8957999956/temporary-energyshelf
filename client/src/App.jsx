// import Header from "./components/header/Header";
import Topbar from "./components/topbar/Topbar";
// import Sidebar from "./components/sidebar/Sidebar";
// import SinglePost from "./components/singlePost/SinglePost";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
// import Practice from "./pages/practice/Practice";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import AboutUs from "./pages/aboutUs/AboutUs";
import Events from "./pages/events/Events";
import StudyGuide from "./pages/studyGuide/StudyGuide";
import InterExp from "./pages/interExp/InterExp";
import { useContext } from "react";
import { Context } from "./context/Context";
import Explore from "./pages/explore/Explore";
import Footer from "./components/footer/Footer";
import ExploreNew from "./pages/exploreNew/ExploreNew";
import Admin from "./pages/admin/Admin";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/explore">
            <ExploreNew />
          </Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>
          <Route path="/login">{user ? <Home /> : <Login />}</Route>
          <Route path="/write/:ID">{user ? <Write /> : <Register />}</Route>
          <Route path="/write/">{user ? <Write /> : <Register />}</Route>
          <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
          <Route path="/events">{user ? <Events /> : <Register />}</Route>
          <Route path="/admin">
            {user?.admin == true ? <Admin /> : <Register />}
          </Route>
          <Route path="/profile/">{user ? <Profile /> : <Register />}</Route>
          {/* <Route path="/profile/"></Route> */}

          <Route path="/aboutus">
            <AboutUs />
          </Route>
          <Route path="/interExp">
            <InterExp />
          </Route>
          <Route path="/studyguide">
            <StudyGuide />
          </Route>
          <Route path="/post/:postId">
            <Single />
          </Route>
        </Switch>
        <Footer />
      </Router>

      {/* <Home /> */}
      {/* <Single /> */}
      {/* <Practice /> */}
      {/* <Write /> */}
      {/* <Settings /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Profile /> */}
      {/* <Router>
        <Switch></Switch>
      </Router> */}
    </div>
  );
}

export default App;
