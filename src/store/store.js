import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import { api } from "./baseApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,                     // client-only auth state (tokens, user stub)
    [api.reducerPath]: api.reducer,        // RTKQ cache
  },
  middleware: (gdm) => gdm().concat(api.middleware),
  devTools: true,
});