"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://cxjcgcdbhrwtkdqpueto.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4amNnY2RiaHJ3dGtkcXB1ZXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MjMwNjEsImV4cCI6MjA5MDk5OTA2MX0.kyogcBjj5eI90pofLmraBITeI-5AQXF1kVOzrH1sQpc"
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Sign-up successful!");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    else alert("Login successful!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login / Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}