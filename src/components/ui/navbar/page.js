"use client";

import { useUserStore } from "@/store/userStore";
import { BusFront } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currentY, setCurrentY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      setCurrentY(window.scrollY);
    };
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const { user, logout } = useUserStore();

  return (
    <>
      <nav className="navbar flex px-10 py-2 items-center justify-between shadow bg-white">
        <div className="navbar-left">
          <div className="logo flex items-center gap-2 text-(--color-primary)">
            <BusFront size={30} />
            <span className="text-xl font-bold tracking-tighter uppercase">
              Bus Pass
            </span>
          </div>
        </div>
        <div
          className={`navbar-mid transition-all duration-300 z-100 w-auto ${
            currentY > 200
              ? "fixed top-2 left-1/2 -translate-x-1/2 opacity-100 pointer-events-auto"
              : ""
          }`}
        >
          <div
            className={`rounded-full px-10 py-5 bg-white ${
              currentY > 200 && " shadow shadow-[#c9c9c9]"
            } `}
          >
            <ul className="flex items-center gap-20">
              <li
                className={`font-semibold ${
                  pathname === "/" &&
                  "rounded-full text-black bg-(--color-accent) px-4 py-1"
                }`}
              >
                <Link href="/" className="cursor-pointer">
                  Home
                </Link>
              </li>
              <li
                className={`font-semibold ${
                  pathname === "/about" &&
                  "rounded-full text-black bg-(--color-accent) px-4 py-1"
                }`}
              >
                <Link href="/" className="cursor-pointer">
                  About
                </Link>
              </li>
              <li
                className={`font-semibold ${
                  pathname === "/service" &&
                  "rounded-full text-black bg-(--color-accent) px-4 py-1"
                }`}
              >
                <Link href="/" className="cursor-pointer">
                  Service
                </Link>
              </li>
              <li
                className={`font-semibold whitespace-nowrap ${
                  pathname === "/apply-pass" &&
                  "rounded-full text-black bg-(--color-accent) px-4 py-1"
                }`}
              >
                <Link href="/" className="cursor-pointer">
                  Apply for Pass
                </Link>
              </li>
              <li
                className={`font-semibold ${
                  pathname === "/contact" &&
                  "rounded-full text-black bg-(--color-accent) px-4 py-1"
                }`}
              >
                <Link href="/" className="cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-right">
          <div className="flex items-center gap-5">
            {!user ? (
              <>
                <button
                  className="rounded-lg px-6 py-2 bg-(--color-accent) text-(--color-primary) cursor-pointer font-semibold"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
                <button
                  className="rounded-lg px-6 py-2 bg-(--color-primary) text-white cursor-pointer"
                  onClick={() => router.push("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                className="rounded-lg px-6 py-2 bg-(--color-accent) text-(--color-primary) cursor-pointer font-semibold"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
