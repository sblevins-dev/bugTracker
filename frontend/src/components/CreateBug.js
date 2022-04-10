import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createBug, postBug } from "../Controllers/Redux/bugSlice";
import "../css/createbug.css";

export const CreateBug = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    status: "open",
    steps: "",
    details: "",
    author: 'user'
  })

  const setForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCreate = (e) => {
    e.preventDefault();
    try {
      axios.post('http://localhost:5000/bugs/createBug', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    } catch (error) {
      console.log(error)
    }
    
    
  };

  return (
    <div className="create-page-wrapper">
      <form className="create-bug-wrapper">
        <label>Name:</label>
        <input type="text" name="name" onChange={setForm}/>
        <label>Steps Taken:</label>
        <input type="text" name="steps" onChange={setForm}/>
        <label>Details:</label>
        <textarea type="text" name="details" onChange={setForm}/>
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
