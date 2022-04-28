import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFunc } from "../Controllers/authController";
import { toast } from "react-toastify";
import bug from "../images/favicon.png";
import "../css/login.css";

export const Login = () => {
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    name: "",
    password: "",
  });

  // handle input to form
  const inputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  // dispatch to auth controller
  const handleLogin = (e) => {
    e.preventDefault();
    if (formInput.name !== "" || formInput.password !== "") {
      dispatch(loginFunc(formInput));
    } else {
      toast.error("Please enter valid information", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="login-wrapper">
      <form className="form">
        <div className="header">
          <img src={bug} className="bug-img"></img>
          <h2>Bug Tracker</h2>
        </div>
        <h1>Login</h1>
        <div className="form-group">
          <label className="username">Username:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={inputChange}
            value={formInput.name}
          ></input>
        </div>
        <div className="form-group">
          <label className="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={inputChange}
            value={formInput.password}
          ></input>
        </div>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
