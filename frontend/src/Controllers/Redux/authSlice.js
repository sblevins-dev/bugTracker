import { createSlice } from "@reduxjs/toolkit";
import { loginFunc } from "../authController";

const slice = createSlice({
  name: "auth",
  initialState: {
    admin: false,
    loggedIn: false,
    loading: "idle",
    user: {},
  },
  reducers: {
    getAccountUser: (state, action) => {
      console.log(state.user);
      return state.user;
    },
    signOut: (state) => {
      state.loggedIn = false;
      state.admin = false;
    },
    createUser: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // login builder reducers
      .addCase(loginFunc.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(loginFunc.fulfilled, (state, action) => {
        const { name } = action.meta.arg;
        state.user = action.payload.name;
        if (state.loading === "pending" && state.user === name) {
          state.loading = "idle";
          state.loggedIn = true;
        }

        if (state.user === name && action.payload.role === "admin") {
          state.admin = true;
        }
      });
  },
});

export default slice.reducer;

export const { signOut, getAccountUser, createUser } = slice.actions;
