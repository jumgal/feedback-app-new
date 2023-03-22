import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
const API_URL = "/api/comments";
const user = JSON.parse(localStorage.getItem("user"));
const createComment = createAsyncThunk('comment/create-new-comment', async (commentData, {rejectWithValue}) => {
    console.log('commentData ', commentData)
    try {
        const {newComment, feedbackId} = commentData
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.post(`${API_URL}/${feedbackId}`, {content: newComment}, config);
        console.log('new feedback response ', response)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
})

export {createComment}