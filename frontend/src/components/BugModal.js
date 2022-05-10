import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delBug } from "../Controllers/Redux/bugSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faComment, faX } from "@fortawesome/free-solid-svg-icons";

export const BugModal = ({ bug, dateFunction }) => {
  const { name, author, createdAt, priority, status, comments } = bug;
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const deleteRef = useRef();

  useEffect(() => {}, [bug]);

  // Present bug view on click
  const handleClick = (e) => {
    e.preventDefault();
    if (!ref.current.contains(e.target) && !deleteRef.current.contains(e.target)) {
      navigate("/bugView", {
        state: {
          bug: bug,
        },
      });
    }
  };

  const handleDelete = () => {
    dispatch(delBug(bug))
  }

  return (
    <div className="bug-container" onClick={handleClick}>
      <Link to="/edit" ref={ref} state={bug}>
        <FontAwesomeIcon icon={faPencil} className="edit" />
      </Link>
      {admin && <div ref={deleteRef} className="delete"><FontAwesomeIcon icon={faX} className="delete" onClick={handleDelete}/></div>}
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
              ? { backgroundColor: "#3B817D" }
              : { backgroundColor: "#D34E4B" }
          }
        >
          {status}
        </div>
      </div>
    </div>
  );
};
