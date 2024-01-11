"use client";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    window.localStorage.removeItem("accessToken");
    window.location.href = "/";
  }, []);

  return;
}
