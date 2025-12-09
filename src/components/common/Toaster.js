"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Toast({ message, type = "success", duration = 3000 }) {
  const [show, setShow] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => setAnimateOut(true), duration);
      const removeTimer = setTimeout(() => {
        setShow(false);
        setAnimateOut(false);
      }, duration + 300);
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
  }, [message, duration]);

  if (!message || !show) return null;

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg z-[10000] 
        transform transition-all duration-300 ease-in-out
        ${
          type === "error"
            ? "bg-pink-300 text-pink-900"
            : "bg-green-200 text-green-900"
        }
        ${animateOut ? "animate-slide-out" : "animate-slide-in"}
      `}
    >
      <span className="flex-1 font-medium">{message}</span>
      <button
        onClick={() => setAnimateOut(true)}
        className="flex items-center justify-center p-1 hover:bg-white/20 rounded-full"
      >
        <X size={16} />
      </button>
    </div>
  );
}
