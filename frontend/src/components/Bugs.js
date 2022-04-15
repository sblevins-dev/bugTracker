import { BugModal } from "./BugModal";
import "../css/bugs.css";

export const Bugs = ({ bugs }) => {
  return (
    <div className="bugs-wrapper">
      <div className="header">
        <div className="bug-header-name">Bug</div>
        <div className="bug-header-created">Created</div>
        <div className="bug-header-creator">Creator</div>
        <div className="bug-header-status">Status</div>
      </div>
      {bugs && bugs[0] !== "nothing" ? (
        bugs.map((bug) => <BugModal key={bug._id} bug={bug} />)
      ) : (
        <div className="no-bugs">No Bugs Found</div>
      )}
    </div>
  );
};
