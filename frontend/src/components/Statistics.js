import "../css/statistics.css";

export const Statistics = ({ bugs }) => {
  const openBugs = bugs.filter((bug) => bug.status === "open");
  const closedBugs = bugs.filter((bug) => bug.status === "closed");

  return (
    <div className="statistics-wrapper">
      <div className="open-bug-card card">
        <h1>{openBugs.length}</h1>
        <div>Open Bugs</div>
      </div>
      <div className="closed-bug-card card">
        <h1>{closedBugs.length}</h1>
        <div>Closed Bugs</div>
      </div>
    </div>
  );
};
