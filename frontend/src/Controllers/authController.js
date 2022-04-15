import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// login asyncThunk
export const loginFunc = createAsyncThunk("users/login", async (data, thunkAPI) => {
  try {
    let response = await axios.post("http://localhost:5000/auth/", data);
    let user = await response.data;
    
    return user;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      console.log(message)
      return thunkAPI.rejectWithValue(message)
  }
});
