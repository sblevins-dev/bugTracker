import "../css/statistics.css";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export const Statistics = ({ bugs, all, open, close }) => {
  let openBugs, closedBugs;
  if (bugs && bugs.length > 0) {
    openBugs = bugs.filter((bug) => bug.status === "open");
    closedBugs = bugs.filter((bug) => bug.status === "closed");
  }

  let data = [
    { name: "High", value: 0, fill: "red" },
    { name: "Medium", value: 0, fill: "orange" },
    { name: "Low", value: 0, fill: "yellow" },
  ];

  const countPriority = () => {
    bugs.forEach((bug) => {
      if (bug.priority === "high") {
        data[0].value += 1;
      } else if (bug.priority === "med") {
        data[1].value += 1;
      } else if (bug.priority === "low") {
        data[2].value += 1;
      }
    });

    return data;
  };

  return (
    <div className="statistics-wrapper">
      <div className="all-bug-card card" onClick={all}>
        <h1>{bugs ? bugs.length : 0}</h1>
        <div>All Bugs</div>
      </div>
      <div className="open-bug-card card" onClick={open}>
        <h1>{bugs ? openBugs.length : 0}</h1>
        <div>Open Bugs</div>
      </div>
      <div className="closed-bug-card card" onClick={close}>
        <h1>{bugs ? closedBugs.length : 0}</h1>
        <div>Closed Bugs</div>
      </div>
      <div className="priority-card">
        <h2>Priority</h2>
        <ResponsiveContainer
          className="priority-bug-card"
          width="100%"
          height="100%"
        >
          <PieChart width={200} height={200} className="pie-chart">
            <Pie
              className="pie"
              dataKey="value"
              isAnimationActive={false}
              data={countPriority()}
              cx="50%"
              cy="50%"
              outerRadius={40}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
