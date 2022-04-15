import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/bugView.css";
import { useDispatch, useSelector } from "react-redux";
import { addComm, fetchBugs } from "../Controllers/Redux/bugSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export const BugView = ({ user }) => {
  // Get state from modal that was clicked
  const location = useLocation();
  const { bug } = location.state;

  // Use navigate to go to homepage
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Used to fetch bugs after a comment is added
  const [clicked, setClicked] = useState(false);

  // Comment accordion
  const [expanded, setExpanded] = useState(false);

  // Makes sure to pick correct bug to view. Might be redundant
  const selectedBug = useSelector((state) =>
    state.bugs.filter((stateBug) => {
      return stateBug._id === bug._id;
    })
  );

  const { auth } = useSelector(state => state);

  if (!auth.loggedIn) {
    navigate('/')
  }

  // Set comment to leave
  const [comment, setComment] = useState("");

  // Destructure bug
  const { name, status, details, steps, assigned, author, comments } =
    selectedBug[0];

  // if (comments.length > 5) {
  //   setExpanded(true)
  // }

  const handleClick = () => {
    navigate("/");
  };

  // Onchange to set comment
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  // Handle submit of comment
  const leaveComment = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      dispatch(addComm(user, comment, bug._id)).then(() =>
        setClicked(!clicked)
      );
    }
  };

  // Fetch bugs after comment is sent for the bug to re-render
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
            <div className="comment-dropdown">
              <h1>Comments</h1>
              {comments.length >= 4 && (
                <div onClick={() => setExpanded(!expanded)}>
                  <p>{expanded ? "Collapse" : "Expand"}</p>
                  <FontAwesomeIcon
                    icon={expanded ? faAngleDown : faAngleLeft}
                    className={expanded ? "arrow-expanded" : "arrow"}
                    size="2x"
                  />
                </div>
              )}
            </div>
            {comments.length > 0 ? (
              <ul
                className={
                  expanded || comments.length < 4
                    ? "comment-list expanded"
                    : "comment-list"
                }
              >
                {comments.map((comm, i) => (
                  <li key={i} className="each-comm-wrapper">
                    <div className="comment-user">Author: {comm[0]}</div>
                    <div className="comment">{comm[1]}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-comments-message">No Comments To Display</div>
            )}
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
