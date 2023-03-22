import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
const API_URL = "/api/replies";
const user = JSON.parse(localStorage.getItem("user"));

const createReply = createAsyncThunk('replies/create', async (replyData, {rejectWithValue}) => {
    const {content, commentId} = replyData
    try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.post(`${API_URL}/${commentId}`, {content}, config);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
})

export {createReply}