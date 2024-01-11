"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "../app-session-context";
import { request, Cookies } from "../../services/utilities";
import { btnCls, inputWrapperCls, inputCls, cardBgCls, bCls } from "@/components/tailwindcss-class";
const wrapperCls = `${cardBgCls} ${inputWrapperCls} ${bCls}`;

export default function Signup() {
  const router = useRouter();
  const { setLoading, user, setUser } = useContext(AppSessionContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {};
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    try {
      const { email, password, confirmPassword, firstName, lastName } = data;
      if (password != confirmPassword) throw new Error("Passwords are not matched");
      delete data.confirmPassword;
      window.localStorage.removeItem("accessToken");

      const response = await request("/api/register", "POST", data);

      window.localStorage.setItem("accessToken", response.token);

      setLoading(false);
      router.replace("/signup/welcome");
    } catch (error) {
      setLoading(false);
      console.log("handleResentPassword", error);
      window.alert(error.message);
    }
  };

  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user]);

  if (user) return null;
  return (
    <div className="min-h-screen pt-3 px-4 flex items-center">
      <form onSubmit={handleSignup} className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold">Create a new account</h1>

        <div className="flex space-x-2 shadow-sm">
          <div className={wrapperCls + " flex-1"}>
            <input
              placeholder="First name"
              title="First name"
              aria-label="First name"
              className={inputCls}
              required=""
              min="4"
              max="15"
              autoComplete="given-name"
              type="text"
              name="firstName"
            />
          </div>
          <div className={wrapperCls + " flex-1"}>
            <input
              placeholder="Last name"
              title="Last name"
              aria-label="Last name"
              className={inputCls}
              required=""
              min="4"
              max="15"
              autoComplete="family-name"
              type="text"
              name="lastName"
            />
          </div>
        </div>
        <div className={wrapperCls + " flex-1"}>
          <input
            placeholder="Email address"
            title="Email address"
            aria-label="Email address"
            className={inputCls}
            required=""
            min="10"
            max="30"
            autoComplete="email"
            type="email"
            name="email"
          />
        </div>

        <div className="flex space-x-2 shadow-sm">
          <div className={wrapperCls + " flex-1"}>
            <input
              placeholder="Password"
              title="Password"
              aria-label="Password"
              className={inputCls}
              required=""
              min="9"
              max="50"
              // Commented for testing purposes
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autoComplete="current-password"
              type="password"
              name="password"
            />
          </div>
          <div className={wrapperCls + " flex-1"}>
            <input
              placeholder="Confirm Password"
              title="Confirm Password"
              aria-label="Confirm Password"
              className={inputCls}
              required=""
              min="9"
              max="50"
              // Commented for testing purposes
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autoComplete="new-password"
              type="password"
              name="confirmPassword"
            />
          </div>
        </div>
        <div>
          <button type="submit" className={btnCls + " w-full"}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
