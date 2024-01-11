"use client";
import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AppSessionContext } from "@/app/app-session-context";
import { request } from "@/services/utilities";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const { setLoading, setUser } = useContext(AppSessionContext);

  const fetchWelcome = async (token) => {
    setLoading(true);
    try {
      const response = await request("/api/welcome", "GET", { token });
      setUser({ name: "testUser" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("handleResentPassword", error);
      window.alert(error.message);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) fetchWelcome(token);
    else router.replace("/");
  }, []);

  return (
    <div className="min-h-[80vh] pt-3 px-4 flex justify-center items-center flex-col ">
      <h1 className="font-semibold text-center leading-10 text-4xl text-pc2">
        Thanks! Your account has been created
      </h1>
      <p>
        <Link href="/signout" className="text-pc font-semibold">
          Go to private page
        </Link>
      </p>
    </div>
  );
}
