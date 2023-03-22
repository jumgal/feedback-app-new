import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthorizedUser } from "../feedbacks/utils/getUserFromLocalStorage";

const fetchCommentreplies = createAsyncThunk(
  "comments/fetch-comment-replies",
  async (commentId, { rejectWithValue }) => {
   const user = getAuthorizedUser()
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        const response = await axios.get(`/api/replies/${commentId}`, config)
        return response.data
    } catch (error) {
        rejectWithValue(error.response.data)
    }

  }
);

export {fetchCommentreplies}
