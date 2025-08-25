import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, clearUserData } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
