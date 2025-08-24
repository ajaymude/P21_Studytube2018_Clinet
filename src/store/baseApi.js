import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuth, setAuth } from "./slice/auth/authSlice";

const BASE_URL = "http://localhost:8000/api/v1"; // Change to your API base URL

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  // If your backend uses httpOnly cookies, skip this header and rely on cookies.
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
  credentials: "include", // keeps cookies if your server uses them (safe to leave on)
});

const baseQueryWithReauth = async (args, api, extra) => {
  let result = await rawBaseQuery(args, api, extra);

  if (result?.error?.status === 401) {
    // Try refresh (works for both cookie or token-style backends)
    const refreshToken = api.getState().auth.refreshToken;
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        // If your backend uses cookies for refresh don’t send the token body.
        body: refreshToken ? { refreshToken } : undefined,
      },
      api,
      extra
    );

    if (refreshResult?.data?.accessToken) {
      // Save new tokens then retry original request
      api.dispatch(setAuth(refreshResult.data));
      result = await rawBaseQuery(args, api, extra);
    } else {
      api.dispatch(clearAuth());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me"],
  endpoints: () => ({}),
});
