"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "@/app/app-session-context";
// import { request, Cookies } from "@/service/utilities";
import { bCls, btnCls, cardBgCls, inputCls, inputWrapperCls } from "@/components/tailwindcss-class";
const apiHost = process.env.NEXT_PUBLIC_API_HOST;
const wrapperCls = `${cardBgCls} ${inputWrapperCls} ${bCls}`;

export default function SignIn() {
  const router = useRouter();
  const { setLoading, user, setUser } = useContext(AppSessionContext);

  const handleResentPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { action: "login" };
    new FormData(e.target).forEach((value, key) => (data[key] = value));

    try {
      const { email, password, confirmPassword, firstName, lastName } = data;
      if (password != confirmPassword) throw new Error("Passwords are not matched");
      delete data.confirmPassword;
      window.localStorage.removeItem("accessToken");

      const response = await request("/signup", "POST", data);

      window.localStorage.setItem("accessToken", response.token);
    } catch (error) {
      console.log("handleResentPassword", error);
      window.alert(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user]);

  if (user) return null;
  return (
    <div className="min-h-screen pt-12 px-4 flex items-center">
      <form className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold">Reset your password</h1>
        <p className="text-center ">Please enter you Email Address to reset your password</p>
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
        </div>

        <div>
          <button type="submit" className={btnCls + " w-full"}>
            Send
          </button>
        </div>

        <div className="text-sm text-left">
          <Link
            className="inline-block font-medium underline underline-offset-4 hover:text-link"
            href="/signin"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
