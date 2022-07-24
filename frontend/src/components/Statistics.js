import "../css/statistics.css";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export const Statistics = ({ bugs, all, open, close, priority }) => {
  let openBugs, closedBugs;

  if (bugs && bugs.length > 0) {
    openBugs = bugs.filter((bug) => bug.status === "open");
    closedBugs = bugs.filter((bug) => bug.status === "closed");
  }

  let data = [
    { name: "High", value: 0, fill: "#D34E4B" },
    { name: "Medium", value: 0, fill: "#F9B780" },
    { name: "Low", value: 0, fill: "#FEFAE5" },
  ];

  const countPriority = () => {
    bugs && bugs.forEach((bug) => {
      if (bug.priority === "high") {
        data[0].value += 1;
      } else if (bug.priority === "medium") {
        data[1].value += 1;
      } else if (bug.priority === "low") {
        data[2].value += 1;
      }
    });

    return data;
  };

  const handleClick = (e) => {
    priority(e.name)
  }

  return (
    <div className="statistics-wrapper">
      <div className="all-bug-card card" onClick={all}>
        <h1>{bugs ? bugs.length : 0}</h1>
        <div>All</div>
      </div>
      <div className="open-bug-card card" onClick={open}>
        <h1>{bugs ? openBugs.length : 0}</h1>
        <div>Open</div>
      </div>
      <div className="closed-bug-card card" onClick={close}>
        <h1>{bugs ? closedBugs.length : 0}</h1>
        <div>Closed</div>
      </div>
      <div className="priority-card">
        <ResponsiveContainer
          className="priority-bug-card"
          width="70%"
          height="70%"
        >
          <PieChart width={200} height={200} className="pie-chart">
            <Pie
              className="pie"
              dataKey="value"
              isAnimationActive={false}
              data={countPriority()}
              cx="50%"
              cy="50%"
              outerRadius={30}
              label
              onClick={handleClick}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <h2>Priority</h2>
      </div>
    </div>
  );
};
