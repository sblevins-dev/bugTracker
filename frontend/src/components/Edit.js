import React from "react";
import { useLocation } from 'react-router-dom';
import "../css/edit.css";

export const Edit = (props) => {

  const location = useLocation();
  const bug = location.state;
  console.log(bug)

  // let tempDate;
  // const reOrderDate = () => {
  //     if (bug) {
  //       let temp = bug.date.split("-");
  //   let newDate = temp[2] + "-" + temp[0] + "-" + temp[1];
  //   tempDate = newDate.toString();
  //   return tempDate;  
  //     }
    
  // };
  // reOrderDate();

  const handleBack = () => {
      props.setBugToEdit(false)
  }

  return (
    <div className="edit-page-wrapper">
      <div className="edit-bug-wrapper">
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
        <input type="text" defaultValue={bug.steps}/>
        <label>Details:</label>
        <textarea type="text" defaultValue={bug.details} />
      </div>
    </div>
  );
};
