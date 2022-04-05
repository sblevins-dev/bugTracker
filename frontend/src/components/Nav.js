import { useState } from 'react';
import { NavLink } from "react-router-dom"
import '../css/nav.css';

export const Nav = ({navShown}) => {
  

  return (
    <div className={navShown ? "nav-wrapper active" : "nav-wrapper"}>
        <div className="logo">Logo</div>
        <div className="nav-links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/viewBugs">View Bugs</NavLink>
            <NavLink to="/createBug">Create bug</NavLink>
        </div>
    </div>
  )
}
