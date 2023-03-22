import { createSlice } from "@reduxjs/toolkit";

const sortOptionSlice = createSlice({
  name: "productSort",
  initialState: {
    option: "most-votes",
  },
  reducers: {
    optionChange(state, action) {
      state.option = action.payload;
    },
  },
});

export const sortOptionReducer = sortOptionSlice.reducer;
export const { optionChange } = sortOptionSlice.actions;
