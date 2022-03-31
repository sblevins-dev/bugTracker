import { NavLink } from "react-router-dom"
import '../css/nav.css';

export const Nav = () => {
  return (
    <div className="nav-wrapper">
        <div className="logo">Logo</div>
        <div className="nav-links">
            <NavLink to='/'>Home</NavLink>
        </div>
    </div>
  )
}
