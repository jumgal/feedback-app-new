import { createSlice } from "@reduxjs/toolkit";
import { fetchCommentreplies } from "../../thunks/comments/fetchCommentReplies";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    data: [],
    errors: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentreplies.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentreplies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCommentreplies.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
