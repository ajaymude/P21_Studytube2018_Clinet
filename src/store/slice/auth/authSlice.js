import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (s, { payload }) => {
      // payload can be { user?, accessToken, refreshToken? }
      if (payload.user !== undefined) s.user = payload.user;
      if (payload.accessToken !== undefined) {
        s.accessToken = payload.accessToken;
        payload.accessToken
          ? localStorage.setItem("accessToken", payload.accessToken)
          : localStorage.removeItem("accessToken");
      }
      if (payload.refreshToken !== undefined) {
        s.refreshToken = payload.refreshToken;
        payload.refreshToken
          ? localStorage.setItem("refreshToken", payload.refreshToken)
          : localStorage.removeItem("refreshToken");
      }
    },
    clearAuth: (s) => {
      s.user = null;
      s.accessToken = null;
      s.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const selectAuth = (s) => s.auth;
export default authSlice.reducer;
