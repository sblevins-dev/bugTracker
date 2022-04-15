import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import "./index.css";
import App from "./App";

// Reducers
import authReducer from "./Controllers/Redux/authSlice";
import bugReducer from "./Controllers/Redux/bugSlice";
import userReducer from "./Controllers/Redux/userSlice";

const reducer = combineReducers({
  auth: authReducer,
  bugs: bugReducer,
  users: userReducer,
});

const store = configureStore({
  reducer,
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);
