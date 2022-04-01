import { createSlice } from '@reduxjs/toolkit';
import { retrieveBugs } from '../bugController';

const slice = createSlice({
    name: "bug",
    initialState: [],
    reducers: {
        getBugs: state => retrieveBugs(),

        createBug: (state, action) => {

        },
        updateBug: (state, actions) => {

        },
        markComplete: (state, action) => {

        }
    }
})

export default slice.reducer;

export const { getBugs, createBug, updateBug, markComplete } = slice.actions;