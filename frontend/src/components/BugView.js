import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/bugView.css";
import { useDispatch, useSelector } from "react-redux";
import { addComm, fetchBugs } from "../Controllers/Redux/bugSlice";

export const BugView = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const { bug } = location.state;
  const selectedBug = useSelector((state) =>
    state.bugs.filter((stateBug) => {
      return stateBug._id === bug._id;
    })
  );
  const [comment, setComment] = useState("");

  const { name, status, details, steps, assigned, author, comments } =
    selectedBug[0];

  const handleClick = () => {
    navigate("/");
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const leaveComment = async (e) => {
    e.preventDefault();
    if (comment != "") {
      dispatch(addComm(comment, bug._id)).then(() => setClicked(!clicked));
    }
  };

  useEffect(() => {
    dispatch(fetchBugs());
  }, [clicked]);

  return (
    <div className="bugview-page-wrapper">
      <div className="bugview-wrapper">
        <button className="back-btn" onClick={handleClick}>
          Back
        </button>
        <div className="first-sec">
          <h1 className="bug-title">{name}</h1>
          <div className="bug-details">
            <div className="details-title">Details:</div>
            <div className="details">{details}</div>
          </div>
          <div className="steps-wrapper">
            <div className="steps-title">Steps Taken</div>
            <ul className="steps-list">
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>

          <div className="comments-wrapper">
            <h1>Comments</h1>
            <ul className="comment-list">
              {comments.map((comm, i) => (
                <li key={i}>{comm}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="second-sec">
          <div className="bug-author">
            <div className="author-title">Creator</div>
            <div className="author">{author}</div>
          </div>
          <div className="bug-assigned">
            <div className="assigned-title">Assigned</div>
            <div className="assigned">{assigned}</div>
          </div>
          <div className="bug-status">
            <div className="status-title">Status</div>
            <div className="status">{status}</div>
          </div>
          <div className="bug-priority">
            <div className="priority-title">Priority</div>
            <div className="priority">{status}</div>
          </div>
        </div>
      </div>
      <div className="comment-wrapper">
        <form>
          <label>Leave a Comment:</label>
          <textarea className="comment-box" onChange={handleComment}></textarea>
          <button
            type="submit"
            className="comment-submit-btn"
            onClick={leaveComment}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
