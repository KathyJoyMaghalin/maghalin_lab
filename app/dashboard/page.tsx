"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email || "");
    };

    getUser();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome!</h1>
      <p>You are logged in as:</p>
      <h3>{email}</h3>
    </div>
  );
}