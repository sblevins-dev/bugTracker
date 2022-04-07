import "../css/statistics.css";

export const Statistics = ({ bugs, all, open, close }) => {
  // const openBugs = bugs.filter((bug) => bug.status === "open");
  // const closedBugs = bugs.filter((bug) => bug.status === "closed");

  return (
    <div className="statistics-wrapper">
      {/* <div className="all-bug-card card" onClick={all}>
        <h1>{bugs.length}</h1>
        <div>All Bugs</div>
      </div>
      <div className="open-bug-card card" onClick={open}>
        <h1>{openBugs.length}</h1>
        <div>Open Bugs</div>
      </div>
      <div className="closed-bug-card card" onClick={close}>
        <h1>{closedBugs.length}</h1>
        <div>Closed Bugs</div>
      </div> */}
    </div>
  );
};
