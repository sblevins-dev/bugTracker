import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom"
import '../css/nav.css';
import { signOut } from '../Controllers/Redux/authSlice';

export const Nav = ({navShown}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  }
  
  return (
    <div className={navShown ? "nav-wrapper active" : "nav-wrapper"}>
        <FontAwesomeIcon className='logo' icon={faBug} size='2x' />
        <div className="nav-links">
            <NavLink to='/'>Home</NavLink>
            <NavLink to="/createBug">Create bug</NavLink>
            <NavLink to='/' onClick={handleLogout}>Sign Out</NavLink>
        </div>
    </div>
  )
}
