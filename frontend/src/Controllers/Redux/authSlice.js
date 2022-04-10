import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: "auth",
    initialState: {
        admin: false,
        loggedIn: false,
        name: ''
    },
    reducers: {
        signIn: (state, action) => {
            const { name, password } = action.payload;
            console.log(action.payload.name)
            state.loggedIn = true;
            state.admin = true;
            state.name = name
        },
        getAccountUser: (state, action) => {
            return state.name
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