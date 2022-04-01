import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../Controllers/Redux/authSlice';
import "../css/login.css";

export const Login = () => {
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    name: "",
    password: ""
  })

  const inputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signIn(formInput));
  };

  return (
    <div className="login-wrapper">
      <form className="form">
        <h1>Login</h1>
        <div className="form-group">
          <label className="username">Username:</label>
          <input type="text" name="name" placeholder="Name" onChange={inputChange} value={formInput.name} ></input>
        </div>
        <div className="form-group">
          <label className="password">Password:</label>
          <input type="password" name="password" placeholder="Password" onChange={inputChange} value={formInput.password} ></input>
        </div>
        <button type="submit" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};
