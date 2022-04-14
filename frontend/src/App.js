import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Nav } from "./components/Nav";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { BugView } from "./components/BugView";
import { CreateBug } from "./components/CreateBug";
import { Edit } from "./components/Edit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  // define whether logged in
  const { auth } = useSelector((state) => state);
  const user = useSelector((state) => state.auth.user);

  const [navShown, setNavShown] = useState(false);

  const handleClick = () => {
    setNavShown(!navShown);
  };

  return (
    <div className="app">
      <Router>
        {auth.loggedIn ? (
          <>
            <Nav navShown={navShown} />
            <div className="hamburger" onClick={handleClick}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/createBug" element={<CreateBug user={user} />} />
              <Route path="/bugView" element={<BugView user={user} />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
