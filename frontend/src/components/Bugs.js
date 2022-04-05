import { BugModal } from "./BugModal";
import "../css/bugs.css";

export const Bugs = ({ data }) => {
  return (
    <div className="bugs-wrapper">
      {data[0] !== "nothing" ? (
        data.map((bug) => <BugModal key={bug._id} bug={bug} />)
      ) : (
        <div>No Bugs Found</div>
      )}
    </div>
  );
};
