"use client";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

export const AuthChecker = ({ children }) => {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
};
