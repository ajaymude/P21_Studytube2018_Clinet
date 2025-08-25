import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetMeQuery,
} from "../store/slice/auth/authApiSlice";
import { selectAuth } from "../store/slice/auth/authSlice";


export default function AuthPanel() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector(selectAuth);

  const [mode, setMode] = useState("signin"); // or "signup"
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [name, setName] = useState("New User");

  const {
    data: me,
    isFetching: isMeLoading,
    refetch: refetchMe,
  } = useGetMeQuery(undefined, {
    // Skip if no token (avoid unnecessary calls)
    skip: !accessToken,
  });

  const [signIn, { isLoading: isSigningIn, error: signInErr }] =
    useSignInMutation();
  const [signUp, { isLoading: isSigningUp, error: signUpErr }] =
    useSignUpMutation();
  const [signOut, { isLoading: isSigningOut }] = useSignOutMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signin") {
        await signIn({ email, password }).unwrap();
      } else {
        await signUp({ name, email, password }).unwrap();
      }
      // get fresh /auth/me
      await refetchMe();
    } catch {}
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 12 }}>
      <h2>Auth (RTK Query)</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <button onClick={() => setMode("signin")} disabled={mode === "signin"}>
          Sign in
        </button>
        <button onClick={() => setMode("signup")} disabled={mode === "signup"}>
          Sign up
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        {mode === "signup" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button disabled={isSigningIn || isSigningUp}>
          {mode === "signin"
            ? isSigningIn
              ? "…"
              : "Sign in"
            : isSigningUp
            ? "…"
            : "Sign up"}
        </button>
      </form>

      {(signInErr || signUpErr) && (
        <p style={{ color: "#c1121f" }}>
          Error:{" "}
          {"status" in (signInErr || signUpErr)
            ? (signInErr || signUpErr).status
            : "Unknown"}
        </p>
      )}

      <hr style={{ margin: "16px 0" }} />

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={() => signOut()}
          disabled={isSigningOut || !accessToken}
        >
          {isSigningOut ? "…" : "Sign out"}
        </button>
        <button
          onClick={() => refetchMe()}
          disabled={!accessToken || isMeLoading}
        >
          {isMeLoading ? "…" : "Refresh /me"}
        </button>
      </div>

      <div style={{ marginTop: 8 }}>
        <b>Access Token:</b>
        <div style={{ wordBreak: "break-all", opacity: 0.8, fontSize: 12 }}>
          {accessToken || "—"}
        </div>
      </div>

      <div style={{ marginTop: 8 }}>
        <b>Current User (from /auth/me):</b>
        <pre
          style={{
            background: "#f6f6f6",
            padding: 8,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
          {me ? JSON.stringify(me, null, 2) : "—"}
        </pre>
      </div>

      <div style={{ marginTop: 8 }}>
        <b>User (from slice):</b>
        <pre
          style={{
            background: "#f6f6f6",
            padding: 8,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
          {user ? JSON.stringify(user, null, 2) : "—"}
        </pre>
      </div>
    </div>
  );
}
