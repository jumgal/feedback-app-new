import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "/api/feedbacks";
const user = JSON.parse(localStorage.getItem("user"));
const updateFeedback = createAsyncThunk(
  "feedback/update-feedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(`${API_URL}/${feedbackData.id}`, feedbackData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { updateFeedback };