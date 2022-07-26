import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./Controllers/Redux/userSlice";
import { MuiDrawer } from "./components/MuiDrawer";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import BugView2 from "./components/BugView2"
import { BugView } from "./components/BugView";
import { CreateBug } from "./components/CreateBug";
import { Edit } from "./components/Edit";
import { Requests } from "./components/Requests";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  // define whether logged in
  const { auth } = useSelector((state) => state);

  // dispatch for fetch users
  const dispatch = useDispatch();

  // pull current user
  const user = useSelector((state) => state.auth.user);

  // fetch users when login takes place
  useEffect(() => {
    if (auth.loggedIn) {
      dispatch(fetchUsers());
    }
  }, [auth.loggedIn]);

  return (
    <div className="app" >
      <Router>
        
        {auth.loggedIn ? (
          <>
          <MuiDrawer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edit" element={<Edit user={user} />} />
              <Route path="/createBug" element={<CreateBug user={user} />} />
              <Route path="/bugView" element={<BugView2 user={user} />} />
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
