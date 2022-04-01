import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user",
    initialState: [{}],
    reducers: {
        getUser: (state) => {
            state.push({
                name: "SB"
            })
            state.push({
                name: "John Doe"
            })
        }
    }
})

export default slice.reducer;

export const { getUser } = slice.actions;