"use client";
// import { request } from "@/services/utilities";
import React, { createContext, useState, useEffect } from "react";

export const AppSessionContext = createContext();

export default function AppSessionContextProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("accessToken")) {
      // request(""); Todo: Fetch the user data//
      setUser({ name: "TestUser" });
    }
    setLoading(false);
  }, []);

  const state = {
    setLoading,
    setUser,
    user,
  };

  return (
    <AppSessionContext.Provider value={state}>
      {children}
      {loading && (
        <div id="global-screen-loader" className="z-10 fixed inset-0 flex justify-center items-center">
          <div className="w-20 h-20 border-[6px] border-t-[transparent] border-dbg dark:border-bg dark:border-t-[transparent] rounded-full animate-spin"></div>
        </div>
      )}
    </AppSessionContext.Provider>
  );
}
