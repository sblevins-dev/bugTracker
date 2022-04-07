import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";
import bugControl from "../bugController";
import axios from "axios";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    getBugs: (state, { payload }) => {
      state = payload
      console.log(state)
    },

    createBug: (state, action) => {},
    updateBug: (state, actions) => {},
    markComplete: (state, action) => {},
  },
});

export function fetchBugs() {
  return async (dispatch) => {
    axios
      .get("http://localhost:5000/bugs")
      .then((response) => {
        dispatch(getBugs(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default slice.reducer;

export const { getBugs, createBug, updateBug, markComplete } = slice.actions;
