import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
import { signOut } from "../Controllers/Redux/authSlice";
import { useRef, useState } from "react";

export const Nav = ({ navShown }) => {
  const [clickOutside, setClickOutside] = useState(false)
  const navRef = useRef();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleRefClick = (e) => {
    console.log(e.target)
    console.log(navRef.current)
    if (!navRef.current.contains(e.target)) {
      console.log('clicked outside')
      setClickOutside(true)
    }
  }
  return (
    <div className={navShown && !clickOutside ? "nav-wrapper active" : "nav-wrapper"} ref={navRef} onClick={handleRefClick}>
      <FontAwesomeIcon className="logo" icon={faBug} size="1x" />
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/createBug">Create bug</NavLink>
        <NavLink to="/" onClick={handleLogout}>
          Sign Out
        </NavLink>
      </div>
    </div>
  );
};
