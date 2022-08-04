import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./Controllers/Redux/userSlice";
import { MuiDrawer } from "./components/nav/MuiDrawer";
import { Login } from "./components/pages/login/Login";
import { Home } from "./components/pages/home/Home";
import { BugView } from "./components/pages/bugView/BugView";
import { CreateBug } from "./components/pages/create/CreateBug";
import { Requests } from "./components/pages/requests/Requests";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const useStyles = makeStyles({
    app: {
      display: "flex",
      maxWidth: "100vw",
      overflow: "hidden",
      background: "var(--primary-color)",
      position: "relative",
    },
  });

  const classes = useStyles();

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
    <div className={classes.app}>
      <Router>
        {auth.loggedIn ? (
          <>
            <MuiDrawer />
            <Routes>
              <Route path="/" element={<Home />} />
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
