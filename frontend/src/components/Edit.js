import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../css/edit.css";

export const Edit = (props) => {
  const { auth } = useSelector(state => state);
  const location = useLocation();
  const navigate = useNavigate();
  const bug = location.state;
  console.log(bug);

  if (!auth.loggedIn) {
    navigate('/')
  }


  const handleEdit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="edit-page-wrapper">
      <form className="edit-bug-wrapper">
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
        {bug.steps.length > 0 ? (
          bug.steps.map((step) => <input type="text" defaultValue={step} />)
        ) : (
          <div style={{fontSize: '1rem'}}>No Steps Taken</div>
        )}

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
