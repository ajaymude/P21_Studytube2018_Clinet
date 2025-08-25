import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import { api } from "./baseApi";


export const store = configureStore({
  reducer: {
    auth: authReducer,                     
    [api.reducerPath]: api.reducer,  
  },
  middleware: (gdm) => gdm().concat(api.middleware),
  devTools: true,
});