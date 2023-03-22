import {createSlice} from '@reduxjs/toolkit'
import { createFeedback } from '../../thunks/feedbacks/createFeedback';
import { deleteFeedback } from '../../thunks/feedbacks/deleteFeedback';
import { fetchFeedbackWithComments } from '../../thunks/feedbacks/fetchFeedbackWithComments';
import { updateFeedback } from '../../thunks/feedbacks/updateFeedback';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        isLoading: false,
        data: {},
        errors: null,
    },
    extraReducers(builder){
        builder
        .addCase(fetchFeedbackWithComments.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchFeedbackWithComments.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchFeedbackWithComments.rejected, (state, action) => {
          state.isLoading = false;
          state.errors = action.payload;
        });
        builder
        .addCase(createFeedback.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(createFeedback.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload
        })
        .addCase(createFeedback.rejected, (state, action) => {
          state.isLoading = false;
          state.errors = action.payload;
        });
        builder
        .addCase(updateFeedback.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(updateFeedback.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(updateFeedback.rejected, (state, action) => {
          console.log(action, state)
          state.isLoading = false;
          state.errors = action.payload;
        });
        builder
        .addCase(deleteFeedback.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(deleteFeedback.fulfilled, (state, action) => {
          console.log('aaaa ', state, action)
          state.isLoading = false;
          state.data = {}
        })
        .addCase(deleteFeedback.rejected, (state, action) => {
          state.isLoading = false;
          state.errors = action.payload;
        });
    }
})


export const feedbackReducer = feedbackSlice.reducer