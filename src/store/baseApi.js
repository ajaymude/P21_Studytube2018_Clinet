import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8000/api/v1"; // Change to your API base URL

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState()?.auth?.accessToken;
    //   if (token) headers.set("authorization", `Bearer ${token}`);
    //   return headers;
    // },
  }),
  tagTypes: ["Me"],
  endpoints: () => ({}),
});
