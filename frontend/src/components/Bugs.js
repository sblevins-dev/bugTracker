import { BugModal } from "./BugModal";
import "../css/bugs.css";

export const Bugs = ({ data }) => {
  return (
    <div className="bugs-wrapper">
      {/* <div className="header">
        <div className="bug-name">Bug</div>
        <div className="bug-created">Created</div>
        <div className="bug-creator">Creator</div>
        <div className="bug-status">Status</div>
      </div>
      {data[0] !== "nothing" ? (
        data.map((bug) => <BugModal key={bug._id} bug={bug} />)
      ) : (
        <div className="no-bugs">No Bugs Found</div>
      )} */}
    </div>
  );
};
