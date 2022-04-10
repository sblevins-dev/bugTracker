import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";
import bugControl from "../bugController";
import axios from "axios";

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    getBugs: (state, { payload }) => {
      state = payload;
      return state;
    },

    createBug: (state, action) => {},
    addComment: (state, action) => {
      // [state] = action.payload
      state.map(bug => {
        if (bug._id === action.payload._id) {
          console.log('found')
          bug = action.payload
        }
        return bug
      })
      return state;
    },
    updateBug: (state, actions) => {},
    markComplete: (state, action) => {},
  },
});

// Set bugs state
export function fetchBugs(data) {
  return async (dispatch) => {
    await axios
      .get("http://localhost:5000/bugs")
      .then((response) => {
        dispatch(getBugs(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// Create a bug
export function postBug(data) {
  console.log(data);
  return axios.post("http://localhost:5000/bugs/createBug", data);
}

// Add a comment
export function addComm(comm, id) {
  return async (dispatch) => {
    console.log(dispatch);
    // try {
    await axios
      .put(
        `http://localhost:5000/bugs/leaveComment/${id}`,
        { comm },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(addComment(response.data));
      })
      .catch((err) => console.log(err));
    // } catch (error) {
    //   console.log(error)
    // }
  };
}
export default slice.reducer;

export const { getBugs, createBug, addComment, updateBug, markComplete } = slice.actions;
