import { createSlice } from "@reduxjs/toolkit";
import { createComment } from "../../thunks/comment/createComment";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isLoading: false,
    data: {},
    errors: null,
  },
  extraReducers(builder) {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error;
      });
  },
});

export const commentReducer = commentSlice.reducer;
