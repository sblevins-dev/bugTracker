import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";
import bugController from "../bugController";
import axios from "axios";

// create bug
export const postBug = createAsyncThunk(
  "/bugs/createBug",
  async (bug, thunkAPI) => {
    try {
      return await bugController.addBug();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// call getBugs from bugController
export const fetchBugs = createAsyncThunk('/bugs/fetch', async (bug, thunkAPI) => {
  try {
    return await bugController.getBugs();
  } catch (error) {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
  }
})

// set intitial state in slice
const initialState = {
  bugsList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch bugs on home load
      .addCase(fetchBugs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        state.isLoading = true
        state.isSuccess = true
        state.bugsList = action.payload
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        console.log(action.payload)
      })
      // call create bug
      .addCase(postBug.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postBug.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        // state.bugsList.concat(action.payload)
      })
      .addCase(postBug.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
});

// Set bugs state
// export function fetchBugs(data) {
//   return async (dispatch) => {
//     await axios
//       .get("http://localhost:5000/bugs")
//       .then((response) => {
//         dispatch(getBugs(response.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }

// // Create a bug
// export function postBug(data) {
//   console.log(data);
//   return axios.post("http://localhost:5000/bugs/createBug", data);
// }

// Add a comment
export function addComm(user, comm, id) {
  return async (dispatch) => {
    console.log(dispatch);
    // try {
    await axios
      .put(
        `http://localhost:5000/bugs/leaveComment/${id}`,
        { user, comm },
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

export const { getBugs, createBug, addComment, updateBug, markComplete } =
  slice.actions;
