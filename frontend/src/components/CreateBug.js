import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendRequest } from "../Controllers/Redux/bugSlice";
import "../css/createbug.css";
import { toast } from "react-toastify";

export const CreateBug = ({ user }) => {
  const users = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set state to be able to reset form
  const formInitialState = {
    name: "",
    reason: "create",
    assigned: "",
    status: "open",
    steps: {},
    details: "",
    author: user,
  };

  // set form to initial state
  const [formData, setFormData] = useState(formInitialState);

  // used for adding steps
  const [counter, setCounter] = useState(0);

  // set state of form
  const setForm = (e) => {
    if (e.target.type === "text" && e.target.name !== "name") {
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

  // submit bug
  const handleCreate = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Oops, Something went wrong", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (
      formData.name === "" ||
      (counter > 0 && Object.keys(formData.steps).length === 0) ||
      formData.details === ""
    ) {
      toast.error("Please fill out form", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      dispatch(sendRequest(formData));
      setCounter(0);
      setFormData(formInitialState);
    }
  };

  // decrement counter
  const removeStep = (e) => {
    e.preventDefault();
    setCounter(counter - 1);
  };

  // used to add steps per amount counted
  const renderSteps = (index) => {
    return (
      <input
        key={index}
        type="text"
        name={`steps${index + 1}`}
        value={formData.steps[0]}
        onChange={setForm}
      />
    );
  };

  // calls counter to renderSteps
  const addStep = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
  };

  // back button
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="create-page-wrapper">
      <form className="create-bug-wrapper">
        <button className="back-btn" onClick={handleBack}>
          Back
        </button>
        <label>Bug Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={setForm}
        />
        <label>Assign To:</label>
        <select
          className="dropdown-content"
          name="assigned"
          value={formData.assigned}
          onChange={setForm}
        >
          <option defaultValue>--Select a User--</option>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <option className="users" key={user._id} value={user.name}>
                {user.name}
              </option>
            ))}
        </select>
        <label>Steps:</label>
        {Array.from(Array(counter)).map((c, i) => {
          return renderSteps(i);
        })}
        <div className="step-btns">
          <button className="add-btn" onClick={addStep}>
            Add Step
          </button>
          {counter > 0 && (
            <button className="remove-btn" onClick={removeStep}>
              Remove Step
            </button>
          )}
        </div>

        <label>Details:</label>
        <textarea
          type="text"
          name="details"
          value={formData.details}
          onChange={setForm}
        />
        <div className="btns-wrapper">
          <button type="submit" className="save-btn" onClick={handleCreate}>
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
