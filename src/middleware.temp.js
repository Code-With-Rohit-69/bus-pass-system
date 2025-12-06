import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/login" || pathname === "/register" || pathname === "/") {
    return NextResponse.next();
  }

  // Protected routes rules
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "auth");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/apply-pass/:path*"],
};
