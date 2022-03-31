import "../css/bugs.css";

export const Bugs = ({ data }) => {
  return (
    <div className="bugs-wrapper">
      {console.log(data)}
      {data.map((bug) => (
        <div id={bug.id} className="bug-container">
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
      ))}
    </div>
  );
};
