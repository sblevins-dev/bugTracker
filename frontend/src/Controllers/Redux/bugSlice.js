import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bugController from "../bugController";
import { toast } from "react-toastify";

// send request
export const sendRequest = createAsyncThunk(
  "/bugs/sendRequest",
  async (bug, thunkAPI) => {
    try {
      return await bugController.sendBug(bug);
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

// create bug
export const postBug = createAsyncThunk(
  "/bugs/createBug",
  async (bug, thunkAPI) => {
    try {
      return await bugController.addBug(bug);
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

// edit page calls updateBug
export const editBug = createAsyncThunk(
  "/bugs/update",
  async (bug, thunkAPI) => {
    try {
      return await bugController.updateBug(bug);
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
export const fetchBugs = createAsyncThunk(
  "/bugs/fetch",
  async (bug, thunkAPI) => {
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
  }
);

// send comment to backend
export const leaveComment = createAsyncThunk(
  "/bugs/comments",
  async (bug, thunkAPI) => {
    try {
      return await bugController.leaveComm(bug);
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

// set intitial state in slice
const initialState = {
  bugsList: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  requests: {}
};

const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch bugs on home load
      .addCase(fetchBugs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBugs.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = true;
        state.bugsList = action.payload;
      })
      .addCase(fetchBugs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log(action.payload);
      })
      // call create bug
      .addCase(postBug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Bug Created!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(postBug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // edit bug
      .addCase(editBug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBug.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Updated bug successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(editBug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //leave a comment
      .addCase(leaveComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(leaveComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Comment Submitted", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(leaveComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .addCase(sendRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        toast.success("Sent bug request!", {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.isError = true
        state.isLoading = false
        state.message = action.payload
        toast.error(state.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
  },
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
// export function addComm(user, comm, id) {
//   return async (dispatch) => {
//     console.log(dispatch);
//     // try {
//     await axios
//       .put(
//         `http://localhost:5000/bugs/leaveComment/${id}`,
//         { user, comm },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         dispatch(addComment(response.data));
//       })
//       .catch((err) => console.log(err));
//     // } catch (error) {
//     //   console.log(error)
//     // }
//   };
// }

export default slice.reducer;

export const { getBugs, createBug, addComment, updateBug, markComplete } =
  slice.actions;
