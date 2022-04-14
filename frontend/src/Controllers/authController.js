import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// login asyncThunk
export const loginFunc = createAsyncThunk("users/login", async (data) => {
  let response = await axios.post("http://localhost:5000/auth/", data);
  let user = await response.data;
  console.log(user);

  return user;
});
