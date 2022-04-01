import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export const BugModal = ({bug}) => {
  const { name, details, time, priority } = bug;

  console.log(bug)

  return (
    <div className="bug-container">
      <FontAwesomeIcon icon={faPencil} className="edit" />
      <div className="bug-date-wrapper">
        <label>Date: </label>
        <div className="bug-date">{time}</div>
      </div>
      <div className="bug-author-wrapper">
        <label>Author: </label>
        <div className="bug-author">{name}</div>
      </div>
      <div className="bug-status-wrapper">
        <label>Status: </label>
        <div className="bug-status"></div>
      </div>
      <div className="bug-desc-wrapper">
        <label>Description: </label>
        <div className="bug-desc">{details}</div>
      </div>
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
