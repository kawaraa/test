"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "@/app/app-session-context";
import { request } from "@/services/utilities";
import { bCls, btnCls, cardBgCls, inputCls, inputWrapperCls } from "@/components/tailwindcss-class";
const wrapperCls = `${cardBgCls} ${inputWrapperCls} ${bCls}`;

// aa@aa.com >>> 123
export default function SignIn() {
  const router = useRouter();
  const { setLoading, user, setUser } = useContext(AppSessionContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { action: "login" };
    new FormData(e.target).forEach((value, key) => (data[key] = value));
    try {
      const response = await request("/api/welcome", "GET", data);
      window.localStorage.setItem("accessToken", response.token);
      window.location.href = "/admin";
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
    <div className="min-h-screen pt-12 px-4 flex items-center">
      <form onSubmit={handleSignIn} className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold">Sign in to your account</h1>

        <div className="space-y-5 rounded-md shadow-sm">
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
          <div className={wrapperCls + " flex-1"}>
            <input
              placeholder="Password"
              title="Password"
              aria-label="Password"
              className={inputCls}
              required=""
              min="9"
              max="50"
              // Commented for testing
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autoComplete="current-password"
              type="password"
              name="password"
            />
          </div>
        </div>
        <div className="text-sm text-right">
          <Link
            className="inline-block font-medium underline underline-offset-4 hover:text-link"
            href="/signin/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
        <div>
          <button type="submit" className={btnCls + " w-full"}>
            Sign in
          </button>
        </div>
        <p className="max-w-md mx-auto text-center text-xl my-8 leading-[0px] border-b-[0.5px] border-b-bf select-none">
          <span className="bg-bg dark:bg-dbg px-3">or</span>
        </p>

        <div className="text-sm text-left">
          <Link
            className="inline-block font-medium underline underline-offset-4 hover:text-link"
            href="/signup"
          >
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
