import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userController from "../userController";
import { toast } from 'react-toastify';

const initialState = {
    usersList: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (user, thunkAPI) => {
    try {
        return await userController.fetchUsers();
    } catch (error) {
        const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

      return thunkAPI.rejectWithValue(message)
    }
})

const slice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.usersList = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                toast.error(state.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
    }
})

export default slice.reducer;

export const { getUser } = slice.actions;