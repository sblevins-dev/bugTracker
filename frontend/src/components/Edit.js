import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/edit.css";

export const Edit = (props) => {
  const { auth } = useSelector((state) => state);
  const location = useLocation();
  const navigate = useNavigate();
  const bug = location.state;
  const [step, setStep] = useState("");

  // I added to be able to make everything unified
  const setSteps = () => {
    let obj = {};
    bug.steps.map((step, i) => (obj[`step ${i + 1}`] = step));

    return obj;
  };

  const initialState = {
    name: bug.name,
    status: bug.status,
    steps: setSteps(),
    details: bug.details,
  }

  // set formData
  const [formData, setFormData] = useState(initialState);

  // necessary right now to map steps and add when necessary
  const renderSteps = () => {
    return Object.keys(formData.steps).length > 0 ? (
      Array.from(
        Object.entries(formData.steps).map((step, i) => (
          <input
            type="text"
            key={i}
            value={step[1]}
            name={step[0]}
            onChange={setForm}
            className="step"
          />
        ))
      )
    ) : (
      <div style={{ fontSize: "1rem" }}>No Steps Taken</div>
    );
  };

  // checked if logged in
  if (!auth.loggedIn) {
    navigate("/");
  }

  // setting form function
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

  // handle for mark complete or re open ticket
  const handleCheck = (e) => {
    let isChecked = e.target.checked;
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

  // add step to form data
  const addStep = (e) => {
    e.preventDefault();
    if (step !== '') {
      let index = Object.keys(formData.steps).length;
      let name = `step ${index + 1}`;

      setFormData({
        ...formData,
        steps: {
          ...formData.steps,
          [name]: step,
        },
      });

      setStep("");
      toast.success("Step added!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error("Please enter valid input", {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  };

  // submit form
  const handleEdit = (e) => {
    e.preventDefault();

    console.log(formData.status);
    console.log("form sent");
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
        {renderSteps()}
        <div className="add-step">
          <input
            type="text"
            value={step}
            onChange={(e) => setStep(e.target.value)}
            placeholder="Add a step"
          />
        </div>
        <button className="add-step-btn" onClick={addStep}>
          Add Step
        </button>
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
