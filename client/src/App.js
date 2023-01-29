import Header from "./components/header/Header";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Practice from "./pages/practice/Practice";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <Topbar />
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
