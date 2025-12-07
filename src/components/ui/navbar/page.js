"use client";

import { BusFront } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      setCurrentY(window.scrollY);
    };
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className="navbar flex px-10 py-2 items-center justify-between">
        <div className="navbar-left">
          <div className="logo flex items-center gap-2 text-(--color-primary)">
            <BusFront size={30} />
            <span className="text-xl font-bold tracking-tighter uppercase">
              Bus Pass
            </span>
          </div>
        </div>
        <div
          className="navbar-mid fixed top-2 left-1/2 -translate-x-1/2"
        >
          <div className="rounded-full px-10 py-5 shadow shadow-[#c9c9c9] bg-white">
            <ul className="flex items-center gap-20">
              <li className="font-semibold hover:underline">
                <Link href="/" className="cursor-pointer">
                  Home
                </Link>
              </li>
              <li className="font-semibold hover:underline">
                <Link href="/" className="cursor-pointer">
                  About
                </Link>
              </li>
              <li className="font-semibold hover:underline">
                <Link href="/" className="cursor-pointer">
                  Service
                </Link>
              </li>
              <li className="font-semibold hover:underline">
                <Link href="/" className="cursor-pointer">
                  Apply for Pass
                </Link>
              </li>
              <li className="font-semibold hover:underline">
                <Link href="/" className="cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-right">
          <div className="flex items-center gap-5">
            <button className="rounded-lg px-6 py-2 bg-(--color-accent) text-(--color-primary) cursor-pointer font-semibold">
              Login
            </button>
            <button className="rounded-lg px-6 py-2 bg-(--color-primary) text-white cursor-pointer">
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
