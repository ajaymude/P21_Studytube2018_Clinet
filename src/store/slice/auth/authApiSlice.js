import { api } from "../../baseApi";
import { setUserData, clearUserData } from "./authSlice";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData({ user: data }));
        } catch (err) {
          console.error("SignUp failed:", err);
        }
      },
    }),

    signIn: builder.mutation({
      query: (payload) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setUserData({
              user: data,
            })
          );
        } catch (err) {
          console.error("SignUp failed:", err);
        }
      },
    }),

    signOut: builder.mutation({
      query: () => ({ url: "/auth/sign-out", method: "POST" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {}
        dispatch(clearUserData());
      },
    }),

    getMe: builder.query({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Me"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData({ user: data })); // store user shape in slice (optional)
        } catch (err) {
          console.error("SignUp failed:", err);
        }
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
