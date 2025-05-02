// src/shared/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tokenFromStorage = localStorage.getItem("accessToken");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  accessToken: tokenFromStorage || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  isAuthenticated: !!tokenFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export các action creators và reducer
export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
