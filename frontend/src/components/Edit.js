import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../css/edit.css";

export const Edit = (props) => {
  const { auth } = useSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const bug = location.state;

  const setSteps = () => {
    let obj = {};
    bug.steps.map((step, i) => {
      obj[`step ${i + 1}`] = step;
    });

    return obj;
  };

  const [formData, setFormData] = useState({
    name: bug.name,
    status: bug.status,
    steps: setSteps(),
    details: bug.details,
  });

  if (!auth.loggedIn) {
    navigate("/");
  }

  const setForm = (e) => {
    if (e.target.name.split(" ").includes("step")) {
      setFormData({
        ...formData,
        steps: {
          ...formData.steps,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCheck = (e) => {
    let isChecked = e.target.checked
    let open = "open";
    let closed = "closed";
    let tempStatus = bug.status;

    const checkStatus = () => {
      tempStatus === open && isChecked
        ? (tempStatus = closed)
        : tempStatus === open && !isChecked
        ? (tempStatus = open)
        : tempStatus === closed && isChecked
        ? (tempStatus = open)
        : (tempStatus = closed);

      return tempStatus;
    };

    setFormData({
      ...formData,
      status: checkStatus(),
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    console.log(formData.status)
    console.log('form sent')
  };

  return (
    <div className="edit-page-wrapper">
      <form className="edit-bug-wrapper">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={bug.name}
          onChange={setForm}
        />
        <label>Status:</label>
        <div className="status">
          {bug.status === "open" ? (
            <div className="open">open</div>
          ) : (
            <div className="closed">closed</div>
          )}
          <div className="marks">
            {bug.status === "open" ? (
              <div>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handleCheck}
                />
                Mark Complete
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={handleCheck}
                />
                Re-Open Ticket
              </div>
            )}
          </div>
        </div>
        <label>Steps Taken:</label>
        {bug.steps.length > 0 ? (
          bug.steps.map((step, i) => (
            <input
              type="text"
              key={i}
              defaultValue={step}
              name={`step ${i + 1}`}
              onChange={setForm}
            />
          ))
        ) : (
          <div style={{ fontSize: "1rem" }}>No Steps Taken</div>
        )}

        <label>Details:</label>
        <textarea
          type="text"
          defaultValue={bug.details}
          name="details"
          onChange={setForm}
        />
        <div className="btns-wrapper">
          <button type="submit" className="save-btn" onClick={handleEdit}>
            Save
          </button>
          <Link to="/">
            <button className="cancel-btn">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
