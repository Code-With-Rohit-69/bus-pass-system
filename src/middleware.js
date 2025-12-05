import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth.js";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log(token);

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    return NextResponse.json();

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}
