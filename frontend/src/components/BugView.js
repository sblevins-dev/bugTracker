import { useLocation, useNavigate } from "react-router-dom"
import '../css/bugView.css';

export const BugView = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)

    const handleClick = () => {
        navigate('/')
    }
  return (
    <div className="bugview-wrapper" onClick={handleClick}>BugView</div>
  )
}
