import React, { useState } from "react";
import { useSignUpMutation } from "../store/slice/auth/authApiSlice";

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [signUp, { isLoading, isError, error, isSuccess }] = useSignUpMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form).unwrap(); // unwrap throws if error
      alert("Signup successful ✅");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto" }}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>

      {isError && <p style={{ color: "red" }}>{error?.data?.message || "Signup failed"}</p>}
      {isSuccess && <p style={{ color: "green" }}>Signed up successfully!</p>}
    </form>
  );
}
