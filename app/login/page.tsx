"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import LoginUI from "../components/LoginUI";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Logged in");

    setTimeout(() => {
      if (email === "kjmaghalin@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }, 500);
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const user = data.user;
    if (!user) return;

    await supabase.from("profiles").insert([
      {
        id: user.id,
        username: username || email.split("@")[0],
        role: "user",
      },
    ]);

    setMessage("Account created!");
  };

  return (
    <LoginUI
      mode={mode}
      setMode={setMode}
      email={email}
      password={password}
      username={username}
      message={message}
      setEmail={setEmail}
      setPassword={setPassword}
      setUsername={setUsername}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
    />
  );
}