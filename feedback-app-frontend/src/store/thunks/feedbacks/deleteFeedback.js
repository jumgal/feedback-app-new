import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "/api/feedbacks";
const user = JSON.parse(localStorage.getItem("user"));
const deleteFeedback = createAsyncThunk(
  "feedback/delete-feedback",
  async (id, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.delete(`${API_URL}/${id}`, config);
      console.log(response)
      const {deleted} = response.data
      if (deleted) {
        return response.data
      } else {
        throw new Error('something went wrong when deleteing feedback')
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export { deleteFeedback };