import React from "react";
import { Link } from 'react-router-dom';
import "../css/edit.css";

export const Edit = (props, { bug }) => {
  let tempDate;
  const reOrderDate = () => {
      if (bug) {
        let temp = bug.date.split("-");
    let newDate = temp[2] + "-" + temp[0] + "-" + temp[1];
    tempDate = newDate.toString();
    return tempDate;  
      }
    
  };
  reOrderDate();

  const handleBack = () => {
      props.setBugToEdit(false)
  }

  return (
    <div className="edit-page-wrapper">
        {/* <Link to="/edit" />
      <div className="edit-bug-wrapper">
        <input type="date" defaultValue={tempDate} />
        <input type="text" defaultValue={bug.name} />
        <div className="status">
          {bug.status === "open" ? (
            <div className="open">open</div>
          ) : (
            <div className="closed">closed</div>
          )}
        </div>

        <textarea type="text" defaultValue={bug.description} />
      </div> */}
    </div>
  );
};
