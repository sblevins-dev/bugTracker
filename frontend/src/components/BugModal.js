import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faComment } from "@fortawesome/free-solid-svg-icons";

export const BugModal = ({ bug, dateFunction }) => {
  const { name, author, createdAt, priority, status, comments } = bug;
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {}, [bug]);

  // // Date format
  // const formatDate = () => {
  //   let tempDate = createdAt.split('T')
  //   let tempDate2 = tempDate[0].split('-')
  //   let newDate = tempDate2[1] + '-' + tempDate2[2] + '-' + tempDate2[0]

  //   return newDate
  // }

  // Present bug view on click
  const handleClick = (e) => {
    e.preventDefault();
    if (!ref.current.contains(e.target)) {
      navigate("/bugView", {
        state: {
          bug: bug,
        },
      });
    }
  };

  return (
    <div className="bug-container" onClick={handleClick}>
      <Link to="/edit" ref={ref} state={bug}>
        <FontAwesomeIcon icon={faPencil} className="edit" />
      </Link>
      <div className="bug-container-name-wrapper">
        <h1>{name}</h1>
        <div className="comments">
          <FontAwesomeIcon icon={faComment} className="comment-icon" />
          <div>{comments.length}</div>
        </div>
      </div>
      <div className="bug-container-date-wrapper">
        <div className="bug-date">{dateFunction(createdAt)}</div>
      </div>
      <div className="bug-container-author-wrapper">
        <div className="bug-author">{author}</div>
      </div>
      <div className="bug-container-status-wrapper">
        <div
          style={
            status === "open"
              ? { backgroundColor: "green" }
              : { backgroundColor: "red" }
          }
        >
          {status}
        </div>
      </div>
    </div>
  );
};
