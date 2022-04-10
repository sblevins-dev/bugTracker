import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "auth",
    initialState: {
        admin: false,
        loggedIn: false,
        user: {}
    },
    reducers: {
        signIn: (state, action) => {
            const { name, password } = action.payload;
            console.log(name)
            state.loggedIn = true;
            state.admin = true;
            state.user = name
        },
        getAccountUser: (state, action) => {
            console.log(state.user)
            return state.user
        },
        signOut: (state) => {
            state.loggedIn = false;
            state.admin = false;
        },
        createUser: (state) => {

        }
    }
})

export default slice.reducer;

export const { signIn, signOut, getAccountUser, createUser } = slice.actions;