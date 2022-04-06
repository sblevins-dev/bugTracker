import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faComment } from "@fortawesome/free-solid-svg-icons";

export const BugModal = ({bug}) => {
  const { name, author, details, time, priority, status, comments } = bug;
  console.log(bug)

  useEffect(() => {

  }, [bug])


  return (
    <div className="bug-container">
      <Link to="/edit" state={bug}>
        <FontAwesomeIcon icon={faPencil} className="edit" />
      </Link>
      <div className="bug-name-wrapper">
        <h1>{name}</h1>
        <div className="comments">
          <FontAwesomeIcon icon={faComment} className="comment-icon" />
          <div>{comments.length}</div>
        </div>
      </div>
      <div className="bug-date-wrapper">
        <div className="bug-date">{time}</div>
      </div>
      <div className="bug-author-wrapper">
        <div className="bug-author">{author}</div>
      </div>
      <div className="bug-status-wrapper">
        <div style={status === "open" ? {backgroundColor: "green"} : {backgroundColor: "red"}} >{status}</div>
      </div>
    </div>
  );
};
