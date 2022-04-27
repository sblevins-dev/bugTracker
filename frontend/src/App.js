import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Nav } from "./components/Nav";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { BugView } from "./components/BugView";
import { CreateBug } from "./components/CreateBug";
import { Edit } from "./components/Edit";
import { Requests } from "./components/Requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navRef = useRef();
  // define whether logged in
  const { auth } = useSelector((state) => state);
  const user = useSelector((state) => state.auth.user);

  const [navShown, setNavShown] = useState(false);

  // show navigation
  const handleClick = () => {
    setNavShown(!navShown);
  };

  // check for click outside menu
  const handleRefClick = (e) => {
    let str = e.target.className;
    if (
      (navShown &&
      str &&
      !str.includes("active") &&
      !str.includes("hamburger")) || (navShown && str === '')
    ) {
      setNavShown(!navShown);
    }
  };

  return (
    <div className="app" ref={navRef} onClick={handleRefClick}>
      <Router>
        {auth.loggedIn ? (
          <>
            <Nav navShown={navShown} />
            <div className="hamburger" onClick={handleClick}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit user={user} />} />
              <Route path="/createBug" element={<CreateBug user={user} />} />
              <Route path="/bugView" element={<BugView user={user} />} />
              {auth.admin && <Route path="/requests" element={<Requests />} />}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </Router>
      <ToastContainer
        className="toast-container"
        theme="colored"
      ></ToastContainer>
    </div>
  );
}

export default App;
