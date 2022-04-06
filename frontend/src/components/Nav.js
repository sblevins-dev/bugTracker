import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom"
import '../css/nav.css';

export const Nav = ({navShown}) => {
  

  return (
    <div className={navShown ? "nav-wrapper active" : "nav-wrapper"}>
        <FontAwesomeIcon className='logo' icon={faBug} size='2x' />
        <div className="nav-links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/createBug">Create bug</NavLink>
        </div>
    </div>
  )
}
