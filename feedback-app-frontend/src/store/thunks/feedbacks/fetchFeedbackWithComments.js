import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthorizedUser } from "./utils/getUserFromLocalStorage";

const fetchFeedbackWithComments = createAsyncThunk(
  "feedback/fetch-with-comments",
  async (feedbackId, { rejectWithValue }) => {
    const user = getAuthorizedUser();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`/api/comments/${feedbackId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchFeedbackWithComments };
