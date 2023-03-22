import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "api/feedbacks";
const user = JSON.parse(localStorage.getItem("user"));
const createFeedback = createAsyncThunk(
  "feedback/create-new-feedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post(API_URL, feedbackData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { createFeedback };
