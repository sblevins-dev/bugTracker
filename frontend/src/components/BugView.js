import { useLocation, useNavigate } from "react-router-dom";
import "../css/bugView.css";

export const BugView = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bug } = location.state;

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="bugview-wrapper" >
      <button className="back-btn" onClick={handleClick}>Back</button>
      <div className="first-sec">
        <h1 className="bug-title">{bug.name}</h1>
        <div className="bug-details">
          <div className="details-title">Details:</div>
          <div className="details">{bug.details}</div>
        </div>
        <div className="steps-wrapper">
          <div className="steps-title">Steps Taken</div>
          <ul className="steps-list">
            {bug.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>

        <div className="comments-wrapper">
          <h1>Comments</h1>
          <ul className="comment-list">
            {bug.comments.map((comm, i) => (
              <li key={i}>{comm}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="second-sec">
        <div className="bug-author">
          <div className="author-title">Creator</div>
          <div className="author">{bug.author}</div>
        </div>
        <div className="bug-assigned">
          <div className="assigned-title">Assigned</div>
          <div className="assigned">{bug.assigned}</div>
        </div>
        <div className="bug-status">
          <div className="status-title">Status</div>
          <div className="status">{bug.status}</div>
        </div>
        <div className="bug-priority">
          <div className="priority-title">Priority</div>
          <div className="priority">{bug.status}</div>
        </div>
      </div>
    </div>
  );
};
