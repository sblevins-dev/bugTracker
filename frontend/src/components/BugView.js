import { useLocation, useNavigate } from "react-router-dom"
import '../css/bugView.css';

export const BugView = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const {bug} = location.state;

    const handleClick = () => {
        navigate('/')
    }
  return (
    <div className="bugview-wrapper" onClick={handleClick}>
      <h1>{bug.name}</h1>
      <div>{bug.author}</div>
      <div>{bug.assigned}</div>
      <div>{bug.status}</div>
      <p>{bug.details}</p>
      <div>{bug.steps}</div>
      <div>{bug.comments}</div>
      {console.log(bug)}
    </div>
  )
}
