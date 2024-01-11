"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppSessionContext } from "@/app/app-session-context";

export default function SignIn() {
  const router = useRouter();
  const { user } = useContext(AppSessionContext);

  useEffect(() => {
    if (!user) router.replace("/signin");
  }, [user]);

  if (!user) return null;
  return (
    <div className="min-h-screen pt-12 px-4 flex items-center">
      <form className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold">Admin page</h1>
        <p className="">This is a private page and only the admin can access.</p>
        <p>
          If you want to logout, please click{" "}
          <Link href="/signout" className="text-pc font-semibold">
            here
          </Link>
        </p>

        <p>Hello User you are logged as ({user.name})</p>
      </form>
    </div>
  );
}
