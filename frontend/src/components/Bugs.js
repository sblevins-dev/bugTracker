import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getBugs } from '../Controllers/Redux/bugSlice';
import { BugModal } from "./BugModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Edit } from "./Edit";
import "../css/bugs.css";

export const Bugs = ({ data }) => {
  // using redux
  const dispatch = useDispatch();
  const { bugs } = useSelector(state => state);

  // original
  const [editMode, setEditMode] = useState(false);
  const [bugToEdit, setBugToEdit] = useState([]);

  useEffect(() => {
    dispatch(getBugs());
  }, [bugs.length < 1]);

  const handleEdit = (bug) => {
    setEditMode(true);
    setBugToEdit(bug);
  };

  return (
    <div className="bugs-wrapper">
      {bugs.map((bug, key) => (
        <BugModal bug={bug} />
      ))}
      {/* {!editMode && data.length > 0 && !data.includes("nothing") ? (
        data.map((bug) => (
          <div key={bug.id} className="bug-container">
            <Link to="/edit">
              <FontAwesomeIcon
              icon={faPencil}
              className="edit"
            />
            </Link>
            
            <div className="bug-date-wrapper">
              <label>Date: </label>
              <div className="bug-date">{bug.date}</div>
            </div>
            <div className="bug-author-wrapper">
              <label>Author: </label>
              <div className="bug-author">{bug.name}</div>
            </div>
            <div className="bug-status-wrapper">
              <label>Status: </label>
              <div className="bug-status">{bug.status}</div>
            </div>
            <div className="bug-desc-wrapper">
              <label>Description: </label>
              <div className="bug-desc">{bug.description}</div>
            </div>
          </div>
        ))
      ) : (
        <div>Nothing to display</div>
      )} */}
    </div>
  );
};
