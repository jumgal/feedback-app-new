import {createSlice} from '@reduxjs/toolkit'
import { createReply } from '../../thunks/replies/createReply'

const replySlice = createSlice({
    name: 'reply',
    initialState: {
       isLoading: false,
       data: {},
       errors: null
    },
    extraReducers(builder){
        builder
        .addCase(createReply.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(createReply.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(createReply.rejected, (state, action) => {
          state.isLoading = false;
          state.errors = action.payload;
        });
    }
})

export const replyReducer = replySlice.reducer