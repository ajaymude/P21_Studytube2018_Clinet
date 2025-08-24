
import { api } from "../../baseApi";
import { clearAuth, setAuth } from "../features/auth/authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (b) => ({
    signUp: b.mutation({
      query: (payload) => ({ url: "/auth/register", method: "POST", body: payload }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Save tokens + user
          dispatch(setAuth({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }));
          // Prime the /auth/me cache
          dispatch(authApi.util.updateQueryData("getMe", undefined, () => data.user));
        } catch {}
      },
    }),

    signIn: b.mutation({
      query: (payload) => ({ url: "/auth/login", method: "POST", body: payload }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }));
          dispatch(authApi.util.updateQueryData("getMe", undefined, () => data.user));
        } catch {}
      },
    }),

    signOut: b.mutation({
      // If your backend doesn't have /auth/logout, keep it but ignore network errors.
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try { await queryFulfilled; } catch {}
        // Always clear local auth state
        dispatch(clearAuth());
        // Invalidate user cache
        dispatch(authApi.util.invalidateTags(["Me"]));
      },
    }),

    getMe: b.query({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Me"],
      // If you also want to keep user in slice for easy access:
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth({ user: data })); // store user shape in slice (optional)
        } catch {}
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;