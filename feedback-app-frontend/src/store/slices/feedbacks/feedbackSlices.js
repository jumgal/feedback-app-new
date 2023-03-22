import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeedbacks,
  createFeedback,
} from "../../index";

const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState: {
    isLoading: false,
    data: [],
    errors: null,
  },
  reducers: {
    tellMyName(state, action) {
      return state;
    },
    clearFeedbackError(state, action) {
      state.errors = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.error;
      });
  },
});

export const feedbacksReducer = feedbacksSlice.reducer;
export const { tellMyName, clearFeedbackError } = feedbacksSlice.actions;
