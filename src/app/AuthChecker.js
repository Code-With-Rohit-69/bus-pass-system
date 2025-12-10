"use client"

import { useUserStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthChecker = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      if (pathname === "/login" || pathname === "/register") {
        router.push("/dashboard");
      }
    }
  }, [user, pathname, router]);

  return <>{children}</>;
};
