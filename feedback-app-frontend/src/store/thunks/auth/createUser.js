
import { createAsyncThunk} from "@reduxjs/toolkit";
import axiosBaseURL from "../../../common/httpCommon";

const API_URL = "/api/users";

const createUser = createAsyncThunk("users/register", async (userData, {rejectWithValue}) => {
try {
  const response = await axiosBaseURL.post(API_URL, userData);
  await pause(2000)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
} catch (error) {
   return rejectWithValue(error.response.data)
}
});

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { createUser };
