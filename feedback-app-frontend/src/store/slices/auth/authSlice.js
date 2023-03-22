import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "../../thunks/auth/createUser";
import { loginUser } from "../../thunks/auth/loginUser";
const user = JSON.parse(localStorage.getItem("user"));
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    data: user ? user : {},
    errors: null,
  },
  reducers: {
    clearError(state, action) {
      state.errors = null
    },
    logout(state, action) {
      localStorage.removeItem('user')
      state.isLoading = false
      state.data = {}
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
    
      builder.addCase(loginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
  },
});

export const authReducer = authSlice.reducer;
export const {clearError, logout} = authSlice.actions
