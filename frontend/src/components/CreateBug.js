import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../Controllers/Redux/userSlice";
import "../css/createbug.css";

export const CreateBug = ({ user }) => {
  const users = useSelector((state) => state.users.usersList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    status: "open",
    steps: {},
    details: "",
    author: user,
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [users && users.length < 1]);

  // used for adding steps
  const [counter, setCounter] = useState(1);

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
    try {
      axios.post("http://localhost:5000/bugs/createBug", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // used to add steps per amount counted
  const renderSteps = (index) => {
    return (
      <input
        key={index}
        type="text"
        name={`steps${index + 1}`}
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
        <input type="text" name="name" onChange={setForm} />
        <label>Assign To:</label>
        <select className="dropdown-content">
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
        <button className="add-btn" onClick={addStep}>
          Add Step
        </button>
        <label>Details:</label>
        <textarea type="text" name="details" onChange={setForm} />
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
