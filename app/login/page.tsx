"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import LoginUI from "../components/LoginUI";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) setMessage("❌ " + error.message);
    else setMessage("✅ Sign-up successful!");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("❌ Log in failed" + error.message);
    } else {
      setMessage("✅ Successfully logged in");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  };

  return (
    <LoginUI
      email={email}
      password={password}
      message={message}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
    />
  );
}