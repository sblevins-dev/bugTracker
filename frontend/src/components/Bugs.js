import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { Edit } from "./Edit";
import "../css/bugs.css";

export const Bugs = ({ data }) => {
  const [editMode, setEditMode] = useState(false);
  const [bugToEdit, setBugToEdit] = useState([]);

  useEffect(() => {}, [data, bugToEdit]);

  const handleEdit = (bug) => {
    setEditMode(true);
    setBugToEdit(bug);
  };

  return (
    <div className="bugs-wrapper">
      {!editMode && data.length > 0 && !data.includes("nothing") ? (
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
      )}
    </div>
  );
};
