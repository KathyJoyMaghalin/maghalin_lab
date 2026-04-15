"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import DashboardUI from "../components/DashboardUI";

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email || "");
    };

    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "login";
  };

  return <DashboardUI email={email} handleLogout={handleLogout} />;
}