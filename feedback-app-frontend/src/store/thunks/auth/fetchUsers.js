import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthorizedUser } from "../feedbacks/utils/getUserFromLocalStorage";
const API_URL = "/api/users";
const fetchUsers = createAsyncThunk(
  "users/fetch-all-users",
  async (_, { rejectWithValue }) => {
    const user = getAuthorizedUser();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(API_URL, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchUsers };
