import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../css/edit.css";

export const Edit = (props) => {
  const location = useLocation();
  const bug = location.state;
  console.log(bug);

  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="edit-page-wrapper">
      <form className="edit-bug-wrapper">
        <label>Date Created:</label>
        <input type="date" name="date" defaultValue="1979-06-04" />
        <label>Name:</label>
        <input type="text" name="name" defaultValue={bug.name} />
        <label>Status:</label>
        <div className="status">
          {bug.status === "open" ? (
            <div className="open">open</div>
          ) : (
            <div className="closed">closed</div>
          )}
        </div>
        <label>Steps Taken:</label>
        <input type="text" defaultValue={bug.steps} />
        <label>Details:</label>
        <textarea type="text" defaultValue={bug.details} />
        <div className="btns-wrapper">
          <button type="submit" className="save-btn" onClick={handleEdit}>
            Save
          </button>
          <Link to="/">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};